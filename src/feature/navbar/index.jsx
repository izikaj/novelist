import Bookmark from './Bookmark';
import Auth from './Auth';
import Setting from './Setting';
import { useNavbar } from '../../signal/navbar';

function NavBar() {
  const opts = useNavbar();
  const styles = {
    transform: `translate3d(0, ${opts.collapse ? '-100%' : '0'}, 0)`
  }
  return (
    <>
      <div id="topBarSpace" className="navbar opacity-0"></div>
      <div id="topBar" style={styles}
        className="navbar bg-base-100 fixed shadow shadow-neutral-focus
                   top-0 right-0 z-10 transition-transform"
      >
        <div className="flex-1">
          <Auth />
        </div>

        <div className="flex-none gap-2">
          <Bookmark />
          <Setting />
        </div>
      </div>
    </>
  )
}

export default NavBar
