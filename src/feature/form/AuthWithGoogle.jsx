import googleAuth from '../../api/auth/googleAuth';

function AuthWithGoogle() {
  return (
    <button
      onClick={googleAuth} type="button"
      className="flex items-center btn-link btn-sm p-0 text-accent-content"
    >
      <span className="mr-1">Continue with</span>
      <img src="/google_btn.svg" alt="Google" />
    </button>
  )
}

export default AuthWithGoogle;
