import { Outlet } from 'react-router-dom';

import NavBar from '../feature/navbar';
import Popups from '../feature/popups/Popups';
import ScrollTop from '../shared/ScrollTop';

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet/>

      <p className="mt-10 text-center text-neutral">
        Just for fun, not for commercial use
      </p>

      <ScrollTop />
      <Popups />
    </>
  )
}

export default Layout
