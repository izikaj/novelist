import { Link } from 'react-router-dom';

function Breadcrumbs({ book }) {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li>{book.title}</li>
      </ul>
    </div>
  )
}

export default Breadcrumbs;
