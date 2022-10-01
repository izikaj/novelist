import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { setUser } from '../../signal/user';
import validates from '../../validates';

async function googleAuth() {
  let user = auth.currentUser;

  if (user) {
    setUser(auth.currentUser);
    return user;
  }

  const validator = validates({});
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider).then((cred) => {
    setUser(cred.user);
  }).catch((error) => {
    throw validator.applyServerError(error);
  });
}

export default googleAuth;
