import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ScrollToTop = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const position = location.state && location.state.position;

    if (position === 'top') {
      window.scrollTo(0, 0);
      navigate(location.pathname, {replace: true, state: null})
    }

    if (position === 'bottom') {
      window.scrollTo(0, window.document.body.scrollHeight);
      navigate(location.pathname, {replace: true, state: null})
    }
  }, [location]);

  return <>{props.children}</>
};
export default ScrollToTop;
