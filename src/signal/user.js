import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { state, useStateObservable } from '@react-rxjs/core';

const entry = new BehaviorSubject('').pipe(distinctUntilChanged());
export const user$ = state(entry, '');
export const useUser = () => useStateObservable(user$);
export const setUser = (value) => entry.next(value);

export default entry;
