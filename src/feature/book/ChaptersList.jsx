import { Component } from 'react';
import ChapterLink from './ChapterLink';
import isPresent from '../../shared/isPresent';
import { data$ } from '../../signal/user/chapters';

class ChaptersList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount() {
    this.$sub = data$.subscribe((data) => {
      this.setState({ data });
    });
  }

  componentWillUnmount() {
    if (this.$sub) this.$sub.unsubscribe();
  }

  render() {
    const { data } = this.state;
    const { book } = this.props;

    if (!isPresent(book && book.chapters)) return '';

    return (
      <section className="chapters relative">
        <ul className="flex flex-col gap-1">
          {
            book.chapters.map(
              (chapter) => <ChapterLink key={chapter.id} book={book} chapter={chapter} saved={data[chapter.id]} />
            )
          }
        </ul>
      </section>
    );
  }
}

export default ChaptersList
