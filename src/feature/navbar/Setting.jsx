import { useNavbar } from '../../signal/navbar';
import { setPopup } from '../../signal/popup';
import { SETTINGS } from '../popups/Popups';
import Icon from '../../shared/Icon';

import settingsRawSvg from '../../assets/settings.svg?raw';

function Bookmark() {
  const opts = useNavbar();

  return (
    <>
      <button
        type="button"
        tabIndex={opts.collapse ? '-1' : '0'}
        className="btn btn-ghost btn-circle"
        onClick={() => setPopup(SETTINGS)}
      >
        <Icon className="w-8 rounded-full" raw={settingsRawSvg} />
      </button>
    </>
  )
}

export default Bookmark
