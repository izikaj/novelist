import { useEffect } from 'react';
import { scroll$ } from '../../signal/progress';
import { useLocation } from 'react-router-dom';

function RestoreScroll() {
  const location = useLocation();
  useEffect(() => {
    const path = localStorage.getItem('scroll%P');
    if (path === location.pathname) {
      const y = parseInt(localStorage.getItem('scroll%Y'));
      const h = document.scrollingElement.scrollHeight;
      const t = Math.floor(h * y * 0.01 - 50);
      scrollTo(0, t > 0 ? t : 0);
    }

    localStorage.setItem('scroll%P', location.pathname);
    const sub = scroll$.subscribe((pos) => {
      if (pos > 0) localStorage.setItem('scroll%Y', pos);
    });
    return () => {
      sub.unsubscribe();
    }
  }, [location.pathname]);

  return '';
}

export default RestoreScroll;
