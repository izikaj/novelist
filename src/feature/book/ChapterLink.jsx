import { Link } from 'react-router-dom';
import { update } from '../../api/user/chapters';
import chapters$ from '../../signal/user/chapters';

import { ReactComponent as EyeShowIcon } from '../../assets/eye-show.svg';
import { ReactComponent as EyeHideIcon } from '../../assets/eye-hide.svg';
import { ReactComponent as EyeTrackIcon } from '../../assets/eye-tracking.svg';

const ProgressBar = ({ saved }) => {
  if (!saved) return '';
  if (!(saved.progress > 0 && saved.progress < 100)) return '';

  const style = {
    width: `${saved.progress}%`,
  };

  return (
    <div
      className="bg-neutral-focus absolute top-0 left-0 h-full"
      style={style}
    />
  );
}

const toggleReadState = (book, chapter, isUnread = false) => {
  const data = {
    title: chapter.title,
    digest: chapter.digest,
    progress: isUnread ? 0 : 100,
  };
  update(book.id, chapter.id, data).then(() => {
    chapters$.next({ [chapter.id]: data });
  }).catch(() => { });
}

const iconByProgress = (value) => {
  if (!value || value <= 0) return EyeHideIcon;
  if (value >= 100) return EyeShowIcon;
  return EyeTrackIcon;
}

const ReadToggle = ({ book, chapter, saved }) => {
  const progress = saved && saved.progress || 0;
  const Icon = iconByProgress(progress);
  return (
    <button
      className="relative inline-block h-4 w-4 b-0 flex-none read-toggle text-accent-focus"
      onClick={() => toggleReadState(book, chapter, progress >= 100)}
    ><Icon className="w-8 rounded-full" /></button>
  );
}

function ChapterLink({ book, chapter, saved }) {
  return (
    <li className="chapter relative flex items-center pl-2 gap-2">
      <ProgressBar saved={saved} />
      <ReadToggle saved={saved} book={book} chapter={chapter} />
      <Link
        to={`/${book.id}/${chapter.id}`} className="relative"
        state={{ position: 'top' }}
        title={'ch' + chapter.id + ': ' + chapter.title}
      >{chapter.title}</Link>
    </li>
  );
}

export default ChapterLink;
