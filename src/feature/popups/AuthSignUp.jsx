import PopupWithOverlay from './PopupWithOverlay';
import SignUpForm from '../form/SignUpForm';

function SignUp({ onClose, toSignIn }) {
  return (
    <PopupWithOverlay onClose={onClose} hideOnClickOutside={false}>
      <h3 className="text-lg font-bold">Sign Up</h3>

      <SignUpForm onClose={onClose} toSignIn={toSignIn} />
    </PopupWithOverlay>
  );
}

export default SignUp;
