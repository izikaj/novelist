import Icon from '../../shared/Icon';
import Bookmark from './Bookmark';
import Auth from './Auth';

import settingsRawSvg from '../../assets/settings.svg?raw';

function NavBar() {
  const hidden = Math.random() < 0.5;
  const rootCSS = `
    navbar bg-base-100 fixed top-0 shadow shadow-neutral-focus
    right-0 z-10 transition-transform
    ${hidden ? 'translate-y-[-100%]' : 'translate-y-0'}"
  `;
  return (
    <>
      <div className="navbar opacity-0"></div>
      <div className={rootCSS}>
        <div className="flex-1">
          <Auth/>
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
