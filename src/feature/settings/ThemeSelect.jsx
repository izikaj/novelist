import { setData, useKeyData } from '../../signal/user/settings'
import { ReactComponent as BookmarkIcon } from '../../assets/bookmark.svg';

const THEMES = [
  'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate',
  'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden',
  'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black',
  'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade',
  'night', 'coffee', 'winter'
];

const Palette = (
  <div className="flex flex-shrink-0 flex-wrap gap-1">
    <div className="bg-primary w-2 rounded border-primary-content border-[1px]"></div>
    <div className="bg-secondary w-2 rounded border-primary-content border-[1px]"></div>
    <div className="bg-accent w-2 rounded border-primary-content border-[1px]"></div>
    <div className="bg-neutral w-2 rounded border-primary-content border-[1px]"></div>
  </div>
);

const updateTheme = (evt) => {
  const theme = (
    evt.target.dataset.value ||
    evt.target.dataset.theme ||
    evt.target.querySelector('.theme-label').innerText
  );
  setData({ theme });
};

const Item = ({ theme, value }) => {
  const isActive = theme === value;
  const css = `
    min-w-[45%] md:min-w-[30%] flex-1 border-2
    rounded-md cursor-pointer overflow-hidden relative
    ${isActive ? 'border-accent' : 'border-transparent'}
  `;
  return (
    <div onClick={updateTheme} className={css} data-value={theme}>
      {isActive ? <BookmarkIcon className="absolute top-[-5px] left-2 w-4" /> : ''}
      <div
        className="bg-base-100 text-base-content hover:bg-base-200 flex-1 font-sans pointer-events-none"
        data-theme={theme}
      >
        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-2 md:px-4">
          <div className="theme-label flex-grow text-sm font-bold">{theme}</div>
          {Palette}
        </div>
      </div>
    </div >
  );
};

const List = ({ value }) => THEMES.map((theme) => {
  return <Item key={theme} theme={theme} value={value} />;
});

function ThemeSelect() {
  const theme = useKeyData('theme', 'dark');

  return (
    <>
      <div className="
        flex flex-wrap gap-2 mt-4 mx-[-14px] px-[14px] justify-around
        max-h-[calc(100vh/3)] md:max-h-[calc(100vh/2)] overflow-y-auto"
      ><List value={theme} /></div >
    </>
  )
}

export default ThemeSelect
