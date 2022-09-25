import { useLoaderData } from 'react-router-dom';
import Card from './Card';

const renderLib = (lib) => lib.map(book => <Card key={book.id} book={book} />);

function List() {
  const library = useLoaderData();
  return (
    <div className="md:container md:mx-auto mt-5 mb-5">
      <main className="home flex flex-col md:flex-row p-1 md:p-0 flex-wrap gap-4 md:gap-0 md:columns-2">
        {renderLib(library)}
      </main>
    </div>
  )
}

export default List;
