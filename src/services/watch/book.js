import { combineLatest } from 'rxjs';
import { database, auth } from '../firebase';
import {
  ref, off, onValue,
  onChildAdded, onChildChanged, onChildRemoved
} from 'firebase/database';
import { book$ } from '../../signal/book';
import { user$ } from '../../signal/user';
import { setBook } from '../../signal/user/book';
import { setData as setChaptersData } from '../../signal/user/chapters';

const NS = ' -- WATCH:BOOK -- ';
const BLANK = { state: 0, rate: 0, $blank: true };

function $build() {
  // console.log('<<<<< WATCH:BOOK : BUILD');
  let bookRef, chaptersRef, $sub;

  function $unsubscribe() {
    if (bookRef) off(bookRef);
    if (chaptersRef) off(chaptersRef);
    bookRef = undefined;
    chaptersRef = undefined;
  }

  function $subscribe(book) {
    if (bookRef) $unsubscribe();
    if (!(auth.currentUser && book)) {
      setChaptersData('clear!');
      return setBook(null);
    }
    const common = {
      id: book.id,
    };

    bookRef = ref(database, `${auth.currentUser.uid}/books/${book.id}`);
    chaptersRef = ref(database, `${auth.currentUser.uid}/chapters/${book.id}`);

    onValue(bookRef, (snap) => {
      if (snap.exists()) return setBook({ ...common, ...snap.val() });

      setBook({
        ...BLANK,
        ...common,
        title: book.title
      });
    });

    onChildAdded(chaptersRef, (data) => {
      setChaptersData({ [data.key]: data.val() });
    });

    onChildChanged(chaptersRef, (data) => {
      setChaptersData({ [data.key]: data.val() });
    });

    onChildRemoved(chaptersRef, (data) => {
      setChaptersData({ [data.key]: { progress: 0 } });
    });
  }

  function $stop() {
    if ($sub) $sub.unsubscribe();
    $subscribe(null);
    $sub = undefined;
  }

  function $start(enable = true) {
    $stop();
    if (!enable) return;

    $sub = combineLatest({ user$, book$ }).subscribe(({ book$: book, user$: user }) => {
      $subscribe(user ? book : null);
    });
  }

  return $start;
}

const $watch = window[NS] || (window[NS] = $build());

export default $watch;
