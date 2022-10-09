import { useState, useEffect, useRef } from 'react';
import { setData, useKeyData } from '../../signal/user/settings'
import { ReactComponent as BookmarkIcon } from '../../assets/bookmark.svg';
import availableFonts from '../../shared/availableFonts';

const Loader = () => (
  <>
    <div className="h-[calc(100vh/3)] md:h-[calc(100vh/2)]">
      <p>Loading...</p>
    </div>
  </>
)

const NotAvailable = () => (
  <>
    <div className="h-[calc(100vh/3)] md:h-[calc(100vh/2)]">
      <p>Not Available</p>
    </div>
  </>
)

const updateFont = (evt) => {
  const fontFamily = (
    evt.target.dataset.value ||
    evt.target.dataset.font
  );
  setData({ fontFamily });
}

const Item = ({ name, label, isActive }) => {
  const css = {
    fontFamily: name
  };
  const className = `
    font-name-item relative leading-10 border-2 rounded px-2
    ${isActive ? 'border-success active' : 'border-neutral'}
  `;
  label || (label = name);
  return (
    <li onClick={updateFont} style={css} data-font={name} className={className}>
      {isActive ? <BookmarkIcon className="absolute top-[-3px] right-2 w-4 text-success" /> : ''}
      {label}
    </li>
  );
}

const ItemsList = ({ available, list, value }) => {
  if (!available) return <NotAvailable />;
  if (list.length === 0) return <Loader />;

  return (
    <ul className="w-full flex flex-col gap-2">
      <Item name="" label="Use Defaults" isActive={value == ''} />
      {list.map(name => <Item key={name} isActive={value == name} name={name} />)}
    </ul>
  )
}

function FontSelect() {
  const [available, setAvailable] = useState(undefined);
  const [list, setList] = useState([]);
  const value = useKeyData('fontFamily', '');

  useEffect(() => {
    if (available !== undefined) return;

    availableFonts().then((items) => {
      setList(items);
      setAvailable(true);
    }).catch(() => {
      setAvailable(false);
      setList([]);
    });
  });

  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const active = root.querySelector('.active');
    if (active) active.scrollIntoView({ block: 'center' });
  }, [list]);

  return (
    <>
      <div ref={ref} className="
        flex flex-wrap gap-2 mt-4 mx-[-14px] px-[14px]
        max-h-[calc(100vh/3)] md:max-h-[calc(100vh/2)] overflow-y-auto"
      >
        <ItemsList available={available} list={list} value={value} />
      </div >
    </>
  )
}

export default FontSelect;
