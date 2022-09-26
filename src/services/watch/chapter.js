import { chapter$ } from '../../signal/chapter';
import { user$ } from '../../signal/user';
import { combineLatest } from 'rxjs';
import { database, auth } from '../firebase';
import { ref, onValue, off } from 'firebase/database';
import { setChapter } from '../../signal/user/chapter';

const NS = ' -- WATCH:CHAPTER -- ';
const BLANK = { progress: 0, $blank: true };

function $build() {
  // console.log('<<<<< WATCH:CHAPTER : BUILD');
  let lastRef, $sub;

  function $unsubscribe() {
    if (!lastRef) return;
    off(lastRef);
    lastRef = undefined;
  }

  function $subscribe(chapter) {
    if (lastRef) $unsubscribe();
    if (!(auth.currentUser && chapter)) return setChapter(null);
    const common = {
      id: chapter.id,
      bookId: chapter.bookId || chapter.book.id,
    };

    lastRef = ref(database, `${auth.currentUser.uid}/chapters/${chapter.book.id}/${chapter.id}`);
    onValue(lastRef, (snap) => {
      // console.log('<<<<< WATCH:CHAPTER : ON VALUE', chapter.book.id, chapter.id, ':', snap.val(), chapter);
      if (snap.exists()) return setChapter({ ...common, ...snap.val() });

      setChapter({
        ...BLANK,
        ...common,
        title: chapter.title,
        digest: chapter.digest,
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

    $sub = combineLatest({ user$, chapter$ }).subscribe(({ chapter$: chapter, user$: user }) => {
      $subscribe(user ? chapter : null);
    });
  }

  return $start;
}

const $watch = window[NS] || (window[NS] = $build());

export default $watch;
