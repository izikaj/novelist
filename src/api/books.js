import { database } from '../services/firebase';
import { ref, get } from 'firebase/database';
import isPresent from '../shared/isPresent';

export function all() {
  return get(ref(database, 'books')).then(function (result) {
    const books = Object.values(result.val());
    return books;
  });
}

export function show(id) {
  return get(ref(database, `books/${id}`)).then(function (result) {
    const book = result.val();
    if (!isPresent(book)) throw 'not found';

    return book;
  });
}
