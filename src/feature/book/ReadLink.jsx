import { Link } from 'react-router-dom';
import { useBook } from '../../signal/user/book';

const ToSavedChapter = ({ saved }) => {
  return (
    <Link
      to={`/${saved.id}/${saved.lastChapterId}`}
      children={saved.lastChapterTitle}
    />
  );
}

const ToFirstChapter = ({ book }) => {
  if (!(book && typeof book.chapters === 'object')) return;
  const firstChKey = Object.keys(book.chapters)[0];
  if (!firstChKey) return;
  const chapter = book.chapters[firstChKey];

  return (
    <Link
      to={`/${book.id}/${chapter.id}`}
      children={chapter.title}
    />
  );
}

function ReadLink({ book }) {
  const saved = useBook();
  if (saved && saved.lastChapterId) {
    return (
      <div className="flex mt-4 mb-4 gap-2 md:gap-6">
        <span>Continue reading:</span>
        <ToSavedChapter saved={saved} />
      </div>
    );
  }

  return (
    <div className="flex mt-4 mb-4 gap-2 md:gap-6">
      <span>Start reading:</span>
      <ToFirstChapter book={book} />
    </div>
  );
}

export default ReadLink;
