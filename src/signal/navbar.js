import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { state, useStateObservable } from '@react-rxjs/core';

const initial = {
  collapse: false,
};

const entry = new BehaviorSubject(initial).pipe(distinctUntilChanged());
export const navbar$ = state(entry, initial);
export const useNavbar = () => useStateObservable(navbar$);
export const setNavbar = (value) => entry.next(value);

export default entry;
