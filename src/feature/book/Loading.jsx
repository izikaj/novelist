import { Link } from 'react-router-dom';

// import CardPlaceholder from './CardPlaceholder';

function List() {
  return (
    <main className="md:container md:mx-auto mb-5 px-1 md:px-0">
      <div className="text-sm breadcrumbs">
        <ul><li><Link to="/">Home</Link></li><li>...</li>
        </ul>
      </div>

      <div className="flex mt-4 mb-4 gap-2 md:gap-6">
        <figure className="flex-none">
          <div className="w-[100px] md:w-[150px] h-[160px] md:h-[220px]"/>
        </figure>
        <div className="md:pt-4 md:pb-4 flex flex-col gap-2">
          <h2 className="card-title md:mb-4">...</h2>

          <div className="flex">
            <label className="flex-none w-[100px]">Chapters:</label>
            <p>-</p>
          </div>
          <div className="flex">
            <label className="flex-none w-[100px]">Update:</label>
            <p>-</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default List;
