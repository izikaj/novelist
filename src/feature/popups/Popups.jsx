import { useEffect } from 'react';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import Remind from '../auth/Remind';
import { usePopup, setPopup } from '../../signal/popup';
import { user$ } from '../../signal/user';

export const SIGN_IN = 'signin';
export const SIGN_UP = 'signup';
export const REMIND = 'remind';

const UNAUTHORIZED_TYPES = [
  SIGN_IN, SIGN_UP
];

function Popups() {
  const popup = usePopup();

  useEffect(function () {
    const sub = user$.subscribe(function(user) {
      if (user && UNAUTHORIZED_TYPES.includes(popup)) setPopup('');
    });
    return () => sub.unsubscribe();
  })

  const onClose = () => {
    console.debug('ON CLOSE', popup);
    setPopup('');
  }

  const opts = {
    onClose,
    toSignIn: () => setPopup(SIGN_IN),
    toSignUp: () => setPopup(SIGN_UP),
    toRemind: () => setPopup(REMIND),
  }

  switch (popup) {
    case SIGN_IN:
      return <SignIn {...opts} />;
    case SIGN_UP:
      return <SignUp {...opts} />;
    case REMIND:
      return <Remind {...opts} />;
  }
  return '';
}

export default Popups
