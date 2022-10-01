import { useState } from 'react';
import Breadcrumbs from './Breadcrumbs';
import Card from './Card';
import Loading from './Loading';
import ChaptersList from './ChaptersList';
import Deferred from '../../shared/Deferred';
import loader from '../../loaders/book';

function View() {
  const [book, setData] = useState({});

  return (
    <Deferred loader={loader} setData={setData} fallback={<Loading />}>
      <main className="md:container md:mx-auto mb-5 px-1 md:px-0">
        <Breadcrumbs book={book} />
        <Card book={book} />
        <ChaptersList book={book} />
      </main>
    </Deferred>
  )
}

export default View;
