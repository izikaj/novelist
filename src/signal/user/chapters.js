import { BehaviorSubject, map, auditTime } from 'rxjs';
import { state, useStateObservable } from '@react-rxjs/core';

const data = {};
const injectObject = (item) => {
  Object.keys(item).forEach((key) => {
    data[key] = item[key];
  });
};
const dump = (value) => {
  if (value === 'clear!') {
    Object.keys(data).forEach(k => delete data[k]);
    return data;
  }

  if (typeof value === 'object' && !Array.isArray(value)) value = [value];
  value.forEach((item) => {
    injectObject(item);
  });
  return data;
};

const entry = (new BehaviorSubject({})).pipe(map(dump)).pipe(auditTime(100));
export const data$ = state(entry, {});
export const useData = () => useStateObservable(data$);
export const setData = (value) => entry.next(value);

// data$.subscribe(d => {
//   console.log('<<<<<<<< CHAPTERS', d);
// });

export default entry;
