import { useEffect } from 'react';
import { scroll$ } from '../../signal/progress';
import { useLocation } from 'react-router-dom';

const CLS_TIMEOUT = 500;

function RestoreScroll() {
  const location = useLocation();
  let unlock = false;
  useEffect(() => {
    setTimeout(() => unlock = true, CLS_TIMEOUT);
    const path = localStorage.getItem('scroll%P');

    if (path === location.pathname) {
      const y = parseInt(localStorage.getItem('scroll%Y'));
      const h = document.scrollingElement.scrollHeight;
      const t = Math.floor(h * y * 0.01 - 50);
      scrollTo(0, t > 0 ? t : 0);
    } else {
      localStorage.setItem('scroll%P', location.pathname);
      localStorage.setItem('scroll%Y', 0);
    }

    const sub = scroll$.subscribe((pos) => {
      if (unlock) localStorage.setItem('scroll%Y', pos);
    });
    return () => {
      sub.unsubscribe();
    }
  }, [location.pathname]);

  return '';
}

export default RestoreScroll;
