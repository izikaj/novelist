import { book$ } from '../../signal/user/book';
import { chapter$ } from '../../signal/user/chapter';
import { setData as setChaptersData } from '../../signal/user/chapters';
import { all as allChapters } from '../../api/user/chapters';

const NS = ' -- WATCH:CHAPTERS -- ';

function $build() {
  // console.log('<<<<< WATCH:CHAPTERS : BUILD');
  let $sub, $subCh;

  function $stop() {
    if ($sub) $sub.unsubscribe();
    if ($subCh) $subCh.unsubscribe();
    $sub = undefined;
    $subCh = undefined;
  }

  function $start(enable = true) {
    $stop();
    if (!enable) return;

    $subCh = chapter$.subscribe((chapter) => {
      if (!chapter) return;
      setChaptersData({ [chapter.id]: { progress: chapter.progress, digest: chapter.digest } });
    });

    $sub = book$.subscribe((book) => {
      if (!book) return setChaptersData('clear!');

      allChapters(book.id).then((data) => {
        if (!data) return;
        setChaptersData([data]);
      }).catch((_err) => { });
    });
  }

  return $start;
}

const $watch = window[NS] || (window[NS] = $build());

export default $watch;
