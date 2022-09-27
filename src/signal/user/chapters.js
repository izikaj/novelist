import { BehaviorSubject, auditTime } from 'rxjs';
import { state, useStateObservable } from '@react-rxjs/core';
import withLayUp from '../../shared/withLayUp';

const entry = (new BehaviorSubject({})).pipe(withLayUp()).pipe(auditTime(100));
export const data$ = state(entry, {});
export const useData = () => useStateObservable(data$);
export const setData = (value) => entry.next(value);

// data$.subscribe(d => {
//   console.log('<<<<<<<< CHAPTERS', d);
// });

export default entry;
