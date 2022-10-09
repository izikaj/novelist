import Panel from './Panel';
import PopupWithOverlay from '../popups/PopupWithOverlay';

function Settings({ onClose }) {
  return (
    <PopupWithOverlay onClose={onClose} boxCss="pb-0 md:pb-4">
      <Panel />
    </PopupWithOverlay>
  )
}

export default Settings
