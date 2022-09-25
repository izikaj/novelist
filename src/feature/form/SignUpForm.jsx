import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../signal/user';
// import { useState } from 'react';

function SignUpForm({ toSignIn }) {
  const register = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const email = evt.target.email.value;
    const password = evt.target.password.value;
    console.warn(email, password);

    if (auth.currentUser) {
      setUser(auth.currentUser);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
    }).catch((error) => {
      console.warn('error', error);
    });
  }

  return (
    <form action="/" method="post" name="sign-in" onSubmit={register}>
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
        <div className="form-control">
          <label className="input-group input-group-sm">
            <span className="flex-none w-2/5 justify-end">Password</span>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              className="flex-none w-3/5 input input-sm input-bordered"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group input-group-sm">
            <span className="flex-none w-2/5 justify-end">Confirm</span>
            <input
              type="password"
              name="password_confirm"
              autoComplete="new-password"
              className="flex-none w-3/5 input input-sm input-bordered"
            />
          </label>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={toSignIn} type="button" className="btn-link btn-sm flex-1 text-base-content text-left p-0">Back to login</button>
        <button
          type="submit" className="btn btn-sm btn-success"
        >Sign In</button>
      </div>
    </form>
  )
}

export default SignUpForm
