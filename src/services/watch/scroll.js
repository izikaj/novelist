import scrollSnap from '../scrollSnap';
import { chapter$ } from '../../signal/chapter';
import { setNavbar, navbar$ } from '../../signal/navbar';
import { scroll$, reset } from '../../signal/progress';

const NS = ' -- WATCH:SCROLL -- ';

function $$collapseNavbar(nav) {
  const ref = document.getElementById('topBar');
  if (ref.matches(':focus-within')) {
    // move focus to outside
    document.querySelector('main a, main button').focus();
  }
  setNavbar({ ...nav, collapse: true });
}

function $$expandNavbar(nav) {
  setNavbar({ ...nav, collapse: false });
}

function navCollapseLogic(nav, evt) {
  scroll$.next(Math.round(100 * evt.y / evt.height));

  if (!nav.collapse && evt.dy > 60) return $$collapseNavbar(nav);
  if (nav.collapse && (evt.y < 60 || evt.dy < -60)) return $$expandNavbar(nav);
}

function $build() {
  // console.log('<<<<< WATCH:SCROLL : BUILD');
  let lastRef, unsub, nav, $chapter, $sub;

  const scroller = scrollSnap({
    onChange(evt) {
      navCollapseLogic(nav, evt);
    },
    onFinish(evt) {
      navCollapseLogic(nav, evt);
    },
  });

  function $unsubscribe() {
    if (!lastRef) return;

    lastRef = undefined;
    window.removeEventListener('scroll', scroller);
    if (unsub) unsub.unsubscribe();
    unsub = undefined;
    reset();
  }

  function $subscribe(chapter) {
    $chapter = chapter
    if (lastRef) $unsubscribe();
    if (!chapter) return setNavbar({ ...nav, collapse: false });

    window.addEventListener('scroll', scroller);
    unsub = navbar$.subscribe((opt) => nav = opt);
    lastRef = true;
  }

  function $stop() {
    if ($sub) $sub.unsubscribe();
    $subscribe(null);
    $sub = undefined;
  }

  function $start(enable = true) {
    $stop();
    if (!enable) return;

    $sub = chapter$.subscribe((chapter) => {
      $subscribe(chapter)
    });
  }

  return $start;
}

const $watch = window[NS] || (window[NS] = $build());

export default $watch;
