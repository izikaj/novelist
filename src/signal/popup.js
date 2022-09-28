import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { state, useStateObservable } from '@react-rxjs/core';

export const SIGN_IN = 'signin';
export const SIGN_UP = 'signup';
export const REMIND = 'remind';
export const SETTINGS = 'settings';
export const ALERT = 'alert';

const entry = new BehaviorSubject(null).pipe(distinctUntilChanged());
export const popup$ = state(entry, null);
export const usePopup = () => useStateObservable(popup$);
export const setPopup = (value) => entry.next(value);

export const ShowAlert = ({ title, text, okText, callback }) => {
  setPopup({ type: ALERT, title, text, okText, callback });
};

export default entry;
