import { useNavbar } from '../../signal/navbar';
import { setPopup, SETTINGS } from '../../signal/popup';
import { ReactComponent as SettingsIcon } from '../../assets/settings.svg';

function Bookmark() {
  const opts = useNavbar();

  return (
    <>
      <button
        type="button"
        tabIndex={opts.collapse ? '-1' : '0'}
        className="btn btn-ghost btn-circle"
        onClick={() => setPopup({ type: SETTINGS })}
      >
        <SettingsIcon className="w-6 rounded-full" />
      </button>
    </>
  )
}

export default Bookmark
