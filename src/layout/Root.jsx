import { Outlet } from 'react-router-dom';

import NavBar from '../feature/navbar';
import Popups from '../feature/popups/Popups';
import ScrollTop from '../shared/ScrollTop';
import { useLoading } from '../signal/loading';

function Layout() {
  const loading = useLoading();
  const ready = loading === undefined;

  return (
    <>
      <NavBar />
      <Outlet />

      <p className="mt-10 text-center text-base-content opacity-40">
        Just for fun, not for commercial use
      </p>

      {ready && <ScrollTop />}
      <Popups />
    </>
  )
}

export default Layout
