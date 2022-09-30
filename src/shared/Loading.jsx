import { useLoading } from '../signal/loading';

function Loading({ } = {}) {
  const value = useLoading();
  if (value === undefined) return '';

  const wrapCss = `
    fixed top-0 left-0 w-full h-[1px] z-20
    ${value < 100 ? 'bg-info' : 'bg-success'}
  `;
  const barCss = `
    h-[1px] absolute left-0 top-0
    ${value < 100 ? 'loader-active bg-primary' : 'loader-finished bg-success'}
  `;

  const style = { width: `${value}%` }
  return (
    <div className={wrapCss}>
      <div className={barCss} style={style} />
    </div>
  );
}

export default Loading;
