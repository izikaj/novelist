import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../signal/user';

function LogInForm({ toRemind }) {
  const login = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const email = evt.target.email.value;
    const password = evt.target.password.value;
    console.warn(email, password);

    if (auth.currentUser) {
      setUser(auth.currentUser);
      return;
    }

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
    }).catch((error) => {
      console.warn('error', error);
    });
  }

  return (
    <form action="/" method="post" name="sign-in" onSubmit={login}>
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
          <span
            className="validation-error pl-[40%] text-xs text-error"
          >Some error</span>
        </div>
        <div className="form-control">
          <label className="input-group input-group-sm">
            <span className="flex-none w-2/5 justify-end">Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              className="flex-none w-3/5 input input-sm input-bordered"
            />
          </label>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={toRemind} type="button" className="btn-link btn-sm flex-1 text-base-content text-left p-0">Forgot password?</button>
        <button
          type="submit" className="btn btn-sm btn-success"
        >Sign In</button>
      </div>
    </form>
  )
}

export default LogInForm
