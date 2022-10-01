import { useState } from 'react';
import { ReactComponent as EyeShowIcon } from '../../assets/eye-show.svg';
import { ReactComponent as EyeHideIcon } from '../../assets/eye-hide.svg';

function AuthWithGoogle({ name = 'password', autoComplete = 'current-password', className }) {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? EyeShowIcon : EyeHideIcon;
  const type = visible ? 'text' : 'password';
  return (
    <>
      <Icon
        onClick={() => setVisible(!visible)}
        className="w-8 rounded-full absolute p-1 right-6 z-10"
      />
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        className={className}
      />
    </>
  )
}

export default AuthWithGoogle;
