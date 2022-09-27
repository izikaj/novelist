import { setData, useKeyData } from '../../../signal/user/settings'

function LineSpacing() {
  const defaultValue = useKeyData('lineSpacing');
  const onChange = (evt) => setData({ lineSpacing: parseInt(evt.target.value) });
  const multiplier = (parseInt(defaultValue) * 0.01).toFixed(1);

  return (
    <>
      <label htmlFor="settingLineSpacing">
        Line spacing <span>x{multiplier}</span>
      </label>
      <input id="settingLineSpacing"
        onChange={onChange} defaultValue={defaultValue}
        min="100" max="200" step="10" className="range" type="range"
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>x1</span>
        <span></span>
        <span>-</span>
        <span></span>
        <span>x2</span>
      </div>
    </>
  );
}

export default LineSpacing;
