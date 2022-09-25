import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { state, useStateObservable } from '@react-rxjs/core';

const entry = new BehaviorSubject('').pipe(distinctUntilChanged());
export const popup$ = state(entry, '');
export const usePopup = () => useStateObservable(popup$);
export const setPopup = (value) => entry.next(value);

export default entry;
