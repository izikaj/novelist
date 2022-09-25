import { database, auth } from '../firebase';
import { ref, onValue, off } from 'firebase/database';
import { setChapter } from '../../signal/user/chapter';

const NS = ' -- WATCH:CHAPTER -- ';

function $build() {
  console.log('<<<<< WATCH:CHAPTER : BUILD');
  let lastRef;

  function $unsubscribe() {
    if (!lastRef) return;
    off(lastRef);
    lastRef = undefined;
  }

  function $subscribe(bookId, id) {
    if (lastRef) $unsubscribe();
    if (!(auth.currentUser && bookId && id)) return setChapter(null);

    const uid = auth.currentUser.uid;
    lastRef = ref(database, `${uid}/books/${bookId}/${id}`);
    onValue(lastRef, (snap) => {
      console.log('<<<<< WATCH:CHAPTER : ON VALUE', bookId, id, ':', snap.val());
      setChapter(snap.val());
    });
  }

  return $subscribe;
}

const $watch = window[NS] || (window[NS] = $build());

export default $watch;
