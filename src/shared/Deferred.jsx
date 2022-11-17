import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Deferred = ({ children, loader, setData, fallback }) => {
  const [ready, setReady] = useState(false);
  const loc = useLocation();
  const params = useParams();

  useEffect(() => {
    let canceled = false;
    setReady(false);
    setTimeout(() => {
      Promise.resolve(loader({ params })).then(raw => {
        if (canceled) return;
        setData(raw);
        setTimeout(() => setReady(true), 10);
      });
    }, 10);

    return () => canceled = true;
  }, [loc.pathname]);

  return ready ? children : fallback;
}

export default Deferred;
