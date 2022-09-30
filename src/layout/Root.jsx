import { Outlet, useNavigation } from 'react-router-dom';

import NavBar from '../feature/navbar';
import Popups from '../feature/popups/Popups';
import ScrollTop from '../shared/ScrollTop';
import { setLoading } from '../signal/loading';

function Layout() {
  const nav = useNavigation();
  if (nav.state === 'idle') setTimeout(() => setLoading(100), 1);
  if (nav.state === 'loading') setTimeout(() => setLoading(0), 1);

  return (
    <>
      <NavBar />
      <Outlet/>

      <p className="mt-10 text-center text-base-content opacity-40">
        Just for fun, not for commercial use
      </p>

      <ScrollTop />
      <Popups />
    </>
  )
}

export default Layout
