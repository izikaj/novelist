import Icon from '../../shared/Icon';
import Bookmark from './Bookmark';
import Auth from './Auth';
import { useNavbar } from '../../signal/navbar';

import settingsRawSvg from '../../assets/settings.svg?raw';

function NavBar() {
  const opts = useNavbar();
  const styles = {
    transform: `translate3d(0, ${opts.collapse ? '-100%' : '0'}, 0)`
  }
  return (
    <>
      <div className="navbar opacity-0"></div>
      <div
        className="navbar bg-base-100 fixed shadow shadow-neutral-focus
                   top-0 right-0 z-10 transition-transform"
        style={styles}
      >
        <div className="flex-1">
          <Auth />
        </div>

        <div className="flex-none gap-2">
          <Bookmark />
          <button type="button" className="btn btn-ghost btn-circle">
            <Icon className="w-8 rounded-full" raw={settingsRawSvg} />
          </button>
        </div>
      </div>
    </>
  )
}

export default NavBar
