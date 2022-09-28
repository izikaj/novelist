import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { setUser } from '../../signal/user';
import validates from '../../validates';

async function remind(params) {
  let user = auth.currentUser;

  if (user) {
    setUser(auth.currentUser);
    return user;
  }

  const validator = validates(params);
  validator.check('email', ['presence', ['minLength', 5], ['maxLength', 150]]);
  if (validator.invalid) throw validator.messages;

  const url = location.origin;

  await sendPasswordResetEmail(auth, params.email, { url }).catch((error) => {
    throw validator.applyServerError(error);
  });
}

export default remind;
