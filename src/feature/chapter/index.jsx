import { useState } from 'react';
import Breadcrumbs from './Breadcrumbs';
import Content from './Content';
import Progress from './Progress';
import Loading from './Loading';
import NavTop from './NavTop';
import NavBottom from './NavBottom';
import Metadata from './Metadata';
import Deferred from '../../shared/Deferred';
import loader from '../../loaders/chapter';

function View() {
  const [chapter, setData] = useState({});
  const book = (chapter && chapter.book) || {};

  return (
    <Deferred loader={loader} setData={setData} fallback={<Loading />}>
      <Progress />

      <main className="chapter md:container md:mx-auto px-1 md:px-0">
        <Breadcrumbs book={book} chapter={chapter} />
        <NavTop book={book} chapter={chapter} />
        <Content book={book} chapter={chapter} />
      </main>

      <NavBottom book={book} chapter={chapter} />

      <Metadata chapter={chapter}/>
    </Deferred>
  )
}

export default View
