import Panel from './Panel';
import PopupWithOverlay from '../popups/PopupWithOverlay';

function Settings({ onClose }) {
  return (
    <PopupWithOverlay onClose={onClose}>
      <Panel />
    </PopupWithOverlay>
  )
}

export default Settings
