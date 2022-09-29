import { useNavbar } from '../../signal/navbar';
import { useUser } from '../../signal/user';
import { useBook } from '../../signal/book';
import { useBook as useBookmark } from '../../signal/user/book';
import { update } from '../../api/user/books';
import { setPopup, SIGN_IN } from '../../signal/popup';
import BookState from '../../shared/BookState';

import { ReactComponent as BookmarkIcon } from '../../assets/bookmark.svg';
import { ReactComponent as BookmarkOffIcon } from '../../assets/bookmark-off.svg';

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

const MarkIcon = ({ active }) => {
  const Icon = active ? BookmarkIcon : BookmarkOffIcon;
  return <Icon className="w-8 rounded-full" />;
}

const DisabledMark = ({ opts }) => {
  return (
    <button
      tabIndex={opts.collapse ? '-1' : '0'}
      className="btn btn-ghost btn-circle"
      onClick={() => setPopup({ type: SIGN_IN })}
    ><MarkIcon active={false} /></button>
  );
}

function Bookmark() {
  const book = useBook();
  const user = useUser();
  const opts = useNavbar();
  const saved = useBookmark() || {state: 0};

  if (!book) return '';
  if (!user) return <DisabledMark opts={opts} />;
  if (!saved) return '';

  const bookmarked = saved.state > 0 && saved.state < 9;

  return (
    <>
      <div className="dropdown dropdown-end">
        <button
          tabIndex={opts.collapse ? '-1' : '0'}
          className="btn btn-ghost btn-circle"
        ><MarkIcon active={bookmarked} /></button>
        <ul
          tabIndex={opts.collapse ? '-1' : '0'}
          className="dropdown-content menu p-2 bg-base-200 rounded-box shadow-md"
        >
          {DropContent(book, saved)}
        </ul>
      </div>
    </>
  )
}

export default Bookmark
