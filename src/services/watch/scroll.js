import scrollSnap from '../scrollSnap';
import { setNavbar, navbar$ } from '../../signal/navbar';

const NS = ' -- WATCH:SCROLL -- ';

function navCollapseLogic(navOpts, evt) {
  if (navOpts.collapse && evt.y < 60) return setNavbar({ ...navOpts, collapse: false });
  if (navOpts.collapse && evt.dy < -60) return setNavbar({ ...navOpts, collapse: false });
  if (!navOpts.collapse && evt.dy > 60) return setNavbar({ ...navOpts, collapse: true });
}

function $build() {
  console.log('<<<<< WATCH:SCROLL : BUILD');
  let lastRef, unsub, navOpts;

  const scroller = scrollSnap({
    onChange(evt) {
      console.log('scrollSnap', 'onChange', evt);
      navCollapseLogic(navOpts, evt);
    },
    onFinish(evt) {
      console.log('scrollSnap', 'onFinish', evt);
      navCollapseLogic(navOpts, evt);
    },
  });

  function $unsubscribe() {
    if (!lastRef) return;
    window.removeEventListener('scroll', scroller);
    lastRef = undefined;
    if (unsub) unsub.unsubscribe();
    unsub = undefined;
  }

  function $subscribe(enable = false) {
    if (lastRef) $unsubscribe();
    if (!enable) return setNavbar({ ...navOpts, collapse: false });

    window.addEventListener('scroll', scroller);
    unsub = navbar$.subscribe((opt) => navOpts = opt);
    lastRef = true;
  }

  return $subscribe;
}

const $watch = window[NS] || (window[NS] = $build());

export default $watch;
