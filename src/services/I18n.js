import { get, toPath, isString } from 'underscore';
import EN from '../locales/en';

const I18N_NS = ' -- I18N -- ';
const LOCALES = { EN };

function $$setup() {
  return {
    locale: 'EN',
    t(key, fallback) {
      if (isString(key)) key = key.split('.');
      return get(LOCALES, [this.locale, ...toPath(key)], fallback);
    },
  };
}

const I18n = (window[I18N_NS] || (window[I18N_NS] = $$setup()));

export default I18n;
