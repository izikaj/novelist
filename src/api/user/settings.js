import isPresent from '../../shared/isPresent';

const KEY = '_settings';

export function show() {
  return new Promise((resolve, reject) => {
    if (!window.localStorage) return reject('unavailable');
    const raw = localStorage.getItem(KEY);
    if (!isPresent(raw)) return reject('blank');

    try {
      resolve(JSON.parse(raw));
    } catch (error) {
      reject(error.message);
    }
  });
}

export function update(data) {
  return new Promise((resolve, reject) => {
    if (!window.localStorage) return reject('unavailable');

    resolve(localStorage.setItem(KEY, JSON.stringify(data)));
  });
}
