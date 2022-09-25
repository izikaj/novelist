import SignUpForm from '../form/SignUpForm';
// import { usePopup } from '../../signal/popup';

function SignUp({ onClose, toSignIn }) {
  return (
    <div className="modal modal-bottom sm:modal-middle modal-open">
      <div className="modal-box relative">
        <button
          type="button"
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >✕</button>
        <h3 className="text-lg font-bold">Sign Up</h3>

        <SignUpForm onClose={onClose} toSignIn={toSignIn} />
      </div>
    </div>
  )
}

export default SignUp
