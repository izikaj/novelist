import { auth } from '../../services/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

function RemindForm({ toSignIn }) {
  const remind = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const email = evt.target.email.value;
    console.warn(email);
    const opts = {
      url: `${window.location.origin}/`
    };

    sendPasswordResetEmail(auth, email, opts).then(() => {
      console.warn('sendPasswordResetEmail SENT!!!!');
    }).catch((error) => {
      console.warn('sendPasswordResetEmail error', error);
    });
  }

  return (
    <form action="/" method="post" name="sign-in" onSubmit={remind}>
      <div className="flex flex-col gap-2 mt-6">
        <div className="form-control">
          <label className="input-group input-group-sm">
            <span className="flex-none w-2/5 justify-end">Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="flex-none w-3/5 input input-sm input-bordered"
            />
          </label>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          className="btn-link btn-sm flex-1 text-base-content text-left p-0"
          onClick={toSignIn}
        >Back to login</button>
        <button type="submit" className="btn btn-sm btn-success">Send</button>
      </div>
    </form>
  )
}

export default RemindForm
