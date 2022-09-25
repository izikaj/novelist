import { Link } from 'react-router-dom';
//
const NotFound = ({type}) => (
  <div className="text-center flex w-full flex-col">
    <h1>404</h1>
    <p>Sorry, {type || 'route'} not found</p>
    <Link to="/">Back to home page</Link>
  </div>
);

export default NotFound;
