import { Link } from 'react-router-dom';

const renderNav = (book, dst, prev = false) => {
  if (!dst) return '';

  const params = {
    to: `/${book.id}/${dst.id}`,
    rel: prev ? 'prev' : 'next',
    state: {
      position: prev ? 'bottom' : 'top'
    },
    className: 'btn btn-outline flex flex-1 max-w-full h-auto py-2'
  }

  return (
    <Link {...params}>
      <span className="mb-1 w-full">{prev ? '◀ Previous' : 'Next ▶'}</span>
      <span className="max-w-full line-clamp-3">{dst.title}</span>
    </Link>
  );
}

function Pagination({ book, chapter }) {
  return (
    <footer className="pagination px-2 mt-6 mb-6 flex flex-col gap-2">
      <div className="btn-group flex">
        {renderNav(book, chapter.prev, true)}
        {renderNav(book, chapter.next)}
      </div>
    </footer>
  )
}

export default Pagination;
