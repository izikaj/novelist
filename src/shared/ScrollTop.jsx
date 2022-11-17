import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoading } from '../signal/loading';

const ScrollToTop = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const loading = useLoading();

  useEffect(() => {
    if (loading !== undefined) return;
    const position = location.state && location.state.position;
    let canceled = false;

    setTimeout(() => {
      if (canceled) return;

      if (position === 'top') {
        window.scrollTo(0, 0);
        navigate(location.pathname, {replace: true, state: null})
      }

      if (position === 'bottom') {
        window.scrollTo(0, window.document.body.scrollHeight);
        navigate(location.pathname, {replace: true, state: null})
      }
    }, 50);

    return () => canceled = true;
  }, [location]);

  return <>{props.children}</>
};
export default ScrollToTop;
