import { Link } from 'react-router-dom';

function Breadcrumbs({ book, chapter }) {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to={`/${book.id}`}>{book.title}</Link></li>
        <li>{chapter.title}</li>
      </ul>
    </div>
  )
}

export default Breadcrumbs;
