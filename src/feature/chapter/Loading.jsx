import { Link } from 'react-router-dom';

// import CardPlaceholder from './CardPlaceholder';

function List() {
  return (
    <main className="md:container md:mx-auto mb-5 px-1 md:px-0">
      <div className="text-sm breadcrumbs">
        <ul><li><Link to="/">Home</Link></li><li>...</li><li>...</li>
        </ul>
      </div>

      <div className="flex mt-4 mb-4 gap-2 md:gap-6">
        <article className="prose mt-4 px-1">
          <h2>...... .......... ......</h2>
          <p>
            ............. ....... ............
            ............. ....... ............
            ............. ....... ............
            ............. ....... ............
          </p>
        </article>
      </div>
    </main>
  )
}

export default List;
