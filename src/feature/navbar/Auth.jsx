import { useState } from 'react'
import { useUser } from '../../signal/user';
import { setPopup, SIGN_IN } from '../../signal/popup';
import Icon from '../../shared/Icon';

import { auth } from '../../services/firebase';
import { signOut } from 'firebase/auth';

import userRawSvg from '../../assets/user.svg?raw';
import exitRawSvg from '../../assets/exit.svg?raw';

function asyncAction(user) {
  if (user) return signOut(auth);

  return new Promise((resolve) => {
    setTimeout(() => {
      setPopup({ type: SIGN_IN });
      setTimeout(resolve, 5000);
    }, 1);
  });
}

function Auth() {
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const title = user ? 'Log Out' : 'Log In';
  const rawIcon = user ? exitRawSvg : userRawSvg;
  const action = () => {
    if (loading) return;

    setLoading(true);
    const $loaded = () => setLoading(false);
    asyncAction(user).then($loaded).catch($loaded);
  }
  const btnCSS = `btn btn-ghost btn-circle ${loading ? 'opacity-30' : ''}`;
  return (
    <>
      <button
        type="button" title={title}
        className={btnCSS}
        onClick={action}
      >
        <Icon className="w-6 rounded-full" raw={rawIcon} />
      </button>
    </>
  )
}

export default Auth
