import SignInForm from '../form/SignInForm';
// import { usePopup } from '../../signal/popup';

function SignIn({ onClose, toSignUp, toRemind }) {
  return (
    <div className="modal modal-bottom sm:modal-middle modal-open">
      <div className="modal-box relative">
        <button
          type="button"
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >✕</button>
        <h3 className="text-lg font-bold">Sign In</h3>

        <SignInForm onClose={onClose} toRemind={toRemind} />

        <div className="flex gap-2 mt-6 items-center">
          <button type="button" onClick={toSignUp} className="btn-link btn-sm text-accent text-left p-0">Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default SignIn
