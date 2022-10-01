import { useState } from 'react';
import signIn from '../../api/auth/signIn';
import FieldError from './FieldError';
import AuthWithGoogle from './AuthWithGoogle';
import PasswordInput from './PasswordInput';

function LogInForm({ toRemind, toSignUp }) {
  const [errors, setErrors] = useState({});
  const login = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const email = evt.target.email.value;
    const password = evt.target.password.value;

    signIn({ email, password }).then((data) => {
      console.log('AUTH SUCCESS', data);
      setErrors({});
    }).catch((err) => {
      console.log('AUTH ERROR', err);
      setErrors(err);
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
          <FieldError message={errors.email} />
        </div>
        <div className="form-control">
          <label className="input-group input-group-sm">
            <span className="flex-none w-2/5 justify-end">Password</span>
            <PasswordInput
              name="password"
              autoComplete="current-password"
              className="flex-none w-3/5 input input-sm input-bordered"
            />
          </label>
          <FieldError message={errors.password} />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={toRemind} type="button" className="btn-link btn-sm flex-1 text-base-content text-left p-0">Forgot password?</button>
        <button
          type="submit" className="btn btn-sm btn-success"
        >Send</button>
      </div>

      <div className="flex gap-2 mt-6 items-center justify-between">
        <button
          className="btn-link btn-sm text-accent text-left p-0"
          type="button" onClick={toSignUp} children="Sign Up"
        />

        <AuthWithGoogle />
      </div>
    </form>
  )
}

export default LogInForm;
