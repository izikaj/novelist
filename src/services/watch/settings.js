import { data$, setData, filteredBy } from '../../signal/user/settings';
import { show, update } from '../../api/user/settings';
import { auditTime } from 'rxjs';

const NS = ' -- WATCH:SETTINGS -- ';

const quesTheme = () => {
  const prefDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = localStorage['_theme'] || (localStorage['_theme'] = (prefDark ? '"dark"' : '"light"'));
  try {
    return JSON.parse(theme);
  } catch (error) {
    return prefDark ? 'dark' : 'light'
  }
}

function $build() {
  // console.log('<<<<< WATCH:SETTINGS : BUILD');
  let $sub;

  show().then(opts => setData(opts)).catch(_err => {
    setData({
      theme: quesTheme(),
      fontSize: 120,
      lineSpacing: 150,
      fontFamily: '',
    });
  });

  function $stop() {
    if (!$sub) return;
    $sub.forEach(s => s.unsubscribe());
    $sub = undefined;
  }

  function $start(enabled = true) {
    if ($sub) $stop();
    if (!enabled) return;

    $sub = [
      data$.pipe(auditTime(3000)).subscribe(update),
      filteredBy('theme').subscribe((theme) => {
        document.firstElementChild.setAttribute('data-theme', theme);
        localStorage.setItem('_theme', JSON.stringify(theme));
      }),
      filteredBy('fontSize').subscribe(),
      filteredBy('lineSpacing').subscribe(),
      filteredBy('lineSpacing').subscribe(),
      filteredBy('fontFamily').subscribe(),
    ];
  }

  return $start;
}

const $watch = window[NS] || (window[NS] = $build());

export default $watch;
