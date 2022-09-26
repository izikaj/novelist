import { combineLatest } from 'rxjs';
import { database, auth } from '../firebase';
import { ref, onValue, off } from 'firebase/database';
import { book$ } from '../../signal/book';
import { user$ } from '../../signal/user';
import { setBook } from '../../signal/user/book';

const NS = ' -- WATCH:BOOK -- ';
const BLANK = { state: 0, rate: 0, $blank: true };

function $build() {
  // console.log('<<<<< WATCH:BOOK : BUILD');
  let lastRef, $sub;

  function $unsubscribe() {
    if (!lastRef) return;
    off(lastRef);
    lastRef = undefined;
  }

  function $subscribe(book) {
    if (lastRef) $unsubscribe();
    if (!(auth.currentUser && book)) return setBook(null);
    const common = {
      id: book.id,
    };

    lastRef = ref(database, `${auth.currentUser.uid}/books/${book.id}`);
    onValue(lastRef, (snap) => {
      if (snap.exists()) return setBook({ ...common, ...snap.val() });

      setBook({
        ...BLANK,
        ...common,
        title: book.title
      });
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
