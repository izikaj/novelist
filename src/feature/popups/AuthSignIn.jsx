import PopupWithOverlay from './PopupWithOverlay';
import SignInForm from '../form/SignInForm';

function SignIn({ onClose, toSignUp, toRemind }) {
  return (
    <PopupWithOverlay onClose={onClose} hideOnClickOutside={false}>
      <h3 className="text-lg font-bold">Sign In</h3>
      <SignInForm onClose={onClose} toSignUp={toSignUp} toRemind={toRemind} />
    </PopupWithOverlay>
  );
}

export default SignIn;
