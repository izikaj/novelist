import { setData, useKeyData } from '../../../signal/user/settings'

function FontSize() {
  const defaultValue = useKeyData('fontSize');
  const onChange = (evt) => setData({ fontSize: parseInt(evt.target.value) });

  return (
    <>
      <label htmlFor="settingFontSize">
        Font Size <span>{defaultValue}%</span>
      </label>
      <input id="settingFontSize"
        onChange={onChange} defaultValue={defaultValue}
        min="50" max="200" step="10" className="range" type="range"
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>50%</span>
        <span></span>
        <span>-</span>
        <span></span>
        <span>150%</span>
        <span></span>
        <span>x2</span>
      </div>
    </>
  );
}

export default FontSize;
