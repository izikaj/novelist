import PopupWithOverlay from './PopupWithOverlay';
import RemindForm from '../form/RemindForm';

function Remind({ onClose, toSignIn }) {
  return (
    <PopupWithOverlay onClose={onClose} hideOnClickOutside={false}>
      <h3 className="text-lg font-bold">Remind Password</h3>

      <RemindForm onClose={onClose} toSignIn={toSignIn} />
    </PopupWithOverlay>
  );
}

export default Remind;
