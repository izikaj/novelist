import { useEffect } from 'react';
import AuthSignIn from './AuthSignIn';
import AuthSignUp from './AuthSignUp';
import AuthRemind from './AuthRemind';
import Settings from '../settings';
import Alert from './Alert';
import {
  usePopup, setPopup,
  SIGN_IN, SIGN_UP, REMIND, SETTINGS, ALERT
} from '../../signal/popup';
import { user$ } from '../../signal/user';

export {
  SIGN_IN,
  SIGN_UP,
  REMIND,
  SETTINGS,
  ALERT,
};

const UNAUTHORIZED_TYPES = [
  SIGN_IN, SIGN_UP
];

function Popups() {
  const popup = usePopup();

  useEffect(function () {
    const sub = user$.subscribe(function (user) {
      if (user && UNAUTHORIZED_TYPES.includes(popup && popup.type)) setPopup(null);
    });
    return () => sub.unsubscribe();
  })

  const onClose = () => {
    if (typeof popup.callback === 'function') popup.callback(popup);
    setPopup(null);
  }

  const opts = {
    popup,
    onClose,
    toSignIn: () => setPopup({ type: SIGN_IN }),
    toSignUp: () => setPopup({ type: SIGN_UP }),
    toRemind: () => setPopup({ type: REMIND }),
  }

  switch (popup && popup.type) {
    case ALERT:
      return <Alert popup={popup} onClose={onClose} />;
    case SIGN_IN:
      return <AuthSignIn {...opts} />;
    case SIGN_UP:
      return <AuthSignUp {...opts} />;
    case REMIND:
      return <AuthRemind {...opts} />;
    case SETTINGS:
      return <Settings onClose={onClose} />;
  }

  return '';
}

export default Popups;
