import { useState } from 'react'
import ThemeSelect from './ThemeSelect';
import TextOptions from './TextOptions';
import FontSelect from './FontSelect';
import { useChapter } from '../../signal/chapter'

const onThemeChange = (theme) => {
  document.firstElementChild.setAttribute('data-theme', theme);
  console.warn('UPDATE THEME', theme);
};

const onOptionsChange = (theme) => {
  document.firstElementChild.setAttribute('data-theme', theme);
  console.warn('UPDATE THEME', theme);
};

const TabItem = ({ code, label, tab, setTab }) => (
  <a
    className={`tab tab-bordered${tab === code ? ' tab-active' : ''}`}
    children={label}
    onClick={() => setTab(code)}
  />
);

const TabContent = ({ tab }) => {
  const theme = document.firstElementChild.getAttribute('data-theme') || 'dark';
  const opts = {};

  switch (tab) {
    case 'theme':
      return <ThemeSelect value={theme} onChange={onThemeChange} />;

    case 'text':
      return <TextOptions value={opts} onChange={onOptionsChange} />;

    case 'font':
      return <FontSelect value={opts} onChange={() => console.log('TODO: on font name chenge')} />;
  }
  return 'N/A';
}

function Panel() {
  const chapter = useChapter();
  const [tab, setTab] = useState(chapter ? 'text' : 'theme');

  return (
    <>
      <div className="tabs">
        <TabItem code="text" label="Text Display" tab={tab} setTab={setTab} />
        <TabItem code="theme" label="Choose Theme" tab={tab} setTab={setTab} />
        <TabItem code="font" label="Font" tab={tab} setTab={setTab} />
      </div>
      <TabContent tab={tab} />
    </>
  );
}

export default Panel
