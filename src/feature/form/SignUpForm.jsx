import { useState } from 'react';
import signUp from '../../api/auth/signUp';
import FieldError from './FieldError';
import { ShowAlert } from '../../signal/popup';

function SignUpForm({ toSignIn }) {
  const [errors, setErrors] = useState({});
  const register = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const email = evt.target.email.value;
    const password = evt.target.password.value;
    const confirmation = evt.target.confirmation.value;

    signUp({ email, password, confirmation }).then((data) => {
      console.log('AUTH SUCCESS', data);
      setErrors({});
      ShowAlert({
        title: 'Registration success!',
      });
    }).catch((err) => {
      console.log('AUTH ERROR', err);
      setErrors(err);
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
          <FieldError message={errors.email} />
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
          <FieldError message={errors.password} />
        </div>
        <div className="form-control">
          <label className="input-group input-group-sm">
            <span className="flex-none w-2/5 justify-end">Confirm</span>
            <input
              type="password"
              name="confirmation"
              autoComplete="new-password"
              className="flex-none w-3/5 input input-sm input-bordered"
            />
          </label>
          <FieldError message={errors.confirmation} />
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

export default SignUpForm;
