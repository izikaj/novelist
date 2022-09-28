import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { setUser } from '../../signal/user';
import validates from '../../validates';

async function signUp(params) {
  let user = auth.currentUser;

  if (user) {
    setUser(auth.currentUser);
    return user;
  }

  const validator = validates(params);
  validator.check('email', ['presence', ['minLength', 5], ['maxLength', 150]]);
  validator.check('password', ['presence', ['minLength', 6]]);
  validator.check('confirmation', ['presence', ['minLength', 6], ['equals', 'password']]);
  if (validator.invalid) throw validator.messages;

  await createUserWithEmailAndPassword(auth, params.email, params.password).then((cred) => {
    setUser(cred.user);
  }).catch((error) => {
    throw validator.applyServerError(error);
  });
}

export default signUp;
