import { database, auth } from '../../services/firebase';
import { ref, get, update as updateFB } from 'firebase/database';
import isPresent from '../../shared/isPresent';

export function all(bookId) {
  if (!auth.currentUser) return Promise.reject('unauthorized');
  const uid = auth.currentUser.uid;
  return get(ref(database, `${uid}/chapters/${bookId}`)).then(function (result) {
    return result.val();
  });
}

export function show(bookId, id) {
  if (!auth.currentUser) return Promise.reject('unauthorized');
  const uid = auth.currentUser.uid;
  return get(ref(database, `${uid}/chapters/${bookId}/${id}`)).then(function (result) {
    const chapter = result.val();
    if (!isPresent(chapter)) throw 'not found';

    return chapter;
  });
}

export function update(bookId, id, data) {
  if (!auth.currentUser) return Promise.reject('unauthorized');
  const uid = auth.currentUser.uid;
  return updateFB(ref(database, `${uid}/chapters/${bookId}/${id}`), data);
}
