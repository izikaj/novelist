import { database, auth } from '../../services/firebase';
import { ref, get, update as updateFB } from 'firebase/database';
import isPresent from '../../shared/isPresent';

export function all() {
  if (!auth.currentUser) return Promise.reject('unauthorized');
  const uid = auth.currentUser.uid;
  return get(ref(database, `${uid}/books/`)).then(function (result) {
    const books = Object.values(result.val());
    return books;
  });
}

export function show(id) {
  if (!auth.currentUser) return Promise.reject('unauthorized');
  const uid = auth.currentUser.uid;
  return get(ref(database, `${uid}/books/${id}`)).then(function (result) {
    const book = result.val();
    if (!isPresent(book)) throw 'not found';

    return book;
  });
}

export function update(id, data) {
  if (!auth.currentUser) return Promise.reject('unauthorized');
  const uid = auth.currentUser.uid;
  return updateFB(ref(database, `${uid}/books/${id}`), data);
}
