import { auditTime, distinctUntilChanged } from 'rxjs';
import { chapter$ } from '../../signal/user/chapter';
import { update as updateBook } from '../../api/user/books';

const NS = ' -- WATCH:LAST_CHAPTER -- ';
const TIMEOUT = 1000;

const $commit = (saved) => {
  updateBook(saved.bookId, {
    lastChapterId: saved.id,
    lastChapterTitle: saved.title,
  });
}

function $build() {
  let $sub;
  const query = chapter$.pipe(distinctUntilChanged()).pipe(auditTime(TIMEOUT));

  function $stop() {
    if ($sub) $sub.unsubscribe();
    $sub = undefined;
  }

  function $start(enabled = true) {
    if ($sub) $stop();
    if (!enabled) return;

    $sub = query.subscribe((saved) => {
      if (saved) $commit(saved);
    });
  }

  return $start;
}

const $watch = window[NS] || (window[NS] = $build());

export default $watch;
