import { combineLatest, auditTime } from 'rxjs';
import { chapter$ } from '../../signal/user/chapter';
import { read$ } from '../../signal/progress';
import { update } from '../../api/user/chapters';

const NS = ' -- WATCH:SYNC_PROGRESS -- ';
const TIMEOUT = 3000;

const commit = (saved) => {
  return update(saved.bookId, saved.id, {
    digest: saved.digest,
    progress: saved.progress,
    title: saved.title,
  });
}

function $build() {
  // console.log('<<<<< WATCH:SYNC_PROGRESS : BUILD');
  let $sub;
  const query = combineLatest({ chapter$, read$ }).pipe(auditTime(TIMEOUT));

  function $stop() {
    if ($sub) $sub.unsubscribe();
    $sub = undefined;
  }

  function $start(enabled = true) {
    if ($sub) $stop();
    if (!enabled) return;

    $sub = query.subscribe(({ chapter$: saved, read$: read }) => {
      if (!saved) return;
      if (read < saved.progress) return read$.next(saved.progress);
      if (saved.$blank) return commit(saved);
      if (read <= saved.progress) return;

      console.log('UPDATE READ PROGRESS', read);
      saved.progress = read;
      return commit(saved);
    });
  }

  return $start;
}

const $watch = window[NS] || (window[NS] = $build());

export default $watch;
