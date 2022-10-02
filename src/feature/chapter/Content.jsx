import { useData } from '../../signal/user/settings';
import RestoreScroll from './RestoreScroll';

function Content({ chapter }) {
  const opts = useData();
  const style = {
    fontSize: `${opts.fontSize}%`,
    lineHeight: `${opts.lineSpacing}%`,
  };

  return (
    <article className="prose mt-4 px-1" style={style}>
      <h2>{chapter.title}</h2>

      <div
        className="max-w-[98vw]"
        dangerouslySetInnerHTML={{ __html: chapter.content }}
      />

      <RestoreScroll />
    </article>
  );
}

export default Content;
