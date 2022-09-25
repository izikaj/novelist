import { database } from '../services/firebase';
import { ref, get } from 'firebase/database';
import isPresent from '../shared/isPresent';

export function show(bookId, id) {
  return get(ref(database, `chapters/${bookId}/${id}`)).then(function (result) {
    const chapter = result.val();
    if (!isPresent(chapter)) throw 'not found';

    return chapter;
  });
}
