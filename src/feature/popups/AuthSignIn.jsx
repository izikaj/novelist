import PopupWithOverlay from './PopupWithOverlay';
import SignInForm from '../form/SignInForm';

function SignIn({ onClose, toSignUp, toRemind }) {
  return (
    <PopupWithOverlay onClose={onClose} hideOnClickOutside={false}>
      <h3 className="text-lg font-bold">Sign In</h3>
      <SignInForm onClose={onClose} toRemind={toRemind} />

      <div className="flex gap-2 mt-6 items-center">
        <button
          className="btn-link btn-sm text-accent text-left p-0"
          type="button" onClick={toSignUp} children="Sign Up"
        />
      </div>
    </PopupWithOverlay>
  );
}

export default SignIn;
