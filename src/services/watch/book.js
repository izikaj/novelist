import { database, auth } from '../firebase';
import { ref, onValue, off } from 'firebase/database';
import { setBook } from '../../signal/user/book';

const NS = ' -- WATCH:BOOK -- ';
const BLANK = { state: 0, rate: 0, $blank: true };

function $build() {
  console.log('<<<<< WATCH:BOOK : BUILD');
  let lastRef;

  function $unsubscribe() {
    if (!lastRef) return;
    off(lastRef);
    lastRef = undefined;
  }

  function $subscribe(id) {
    if (lastRef) $unsubscribe();
    if (!(auth.currentUser && id)) return setBook(null);

    const uid = auth.currentUser.uid;
    lastRef = ref(database, `${uid}/books/${id}`);
    onValue(lastRef, (snap) => {
      console.log('<<<<< WATCH:BOOK : ON VALUE', id, ':', snap.val());
      setBook(snap.val() || BLANK);
    });
  }

  return $subscribe;
}

const $watch = window[NS] || (window[NS] = $build());

export default $watch;
