import { useState } from 'react';
import { useBook } from '../../signal/book';
import { useBook as useBookmark } from '../../signal/user/book';
import { update } from '../../api/user/books';
import BookState from '../../shared/BookState';
import Icon from '../../shared/Icon';

import bookmarkRawSvg from '../../assets/bookmark.svg?raw';
import bookmarkOffRawSvg from '../../assets/bookmark-off.svg?raw';

const setNovelState = (book, saved, state) => {
  const savestate = { state };
  if (!saved.title) savestate.title = book.title;

  update(book.id, savestate);
};

const DropItem = ({ label, state, book, saved }) => {
  const opts = {
    onClick: () => setNovelState(book, saved, state),
    className: saved.state == state ? 'active' : '',
    children: label
  }
  return <li><a {...opts} /></li>;
}

const DropContent = (book, saved) => {
  return Object.entries(BookState).map(([state, label]) => {
    const opts = { book, saved, label, state, key: state };
    return <DropItem {...opts} />;
  })
}

function Bookmark() {
  const saved = useBookmark();
  const book = useBook();
  if (!saved) return '';

  const bookmarked = saved.state > 0 && saved.state < 9;

  return (
    <>
      <div className="dropdown dropdown-end">
        <button tabIndex="0" className="btn btn-ghost btn-circle">
          <Icon
            className="w-10 rounded-full"
            raw={bookmarked ? bookmarkRawSvg : bookmarkOffRawSvg}
          />
        </button>
        <ul
          tabIndex="0"
          className="dropdown-content menu p-2 bg-base-200 rounded-box shadow-md"
        >
          {DropContent(book, saved)}
        </ul>
      </div>
    </>
  )
}

export default Bookmark
