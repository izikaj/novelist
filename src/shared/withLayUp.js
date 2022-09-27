import { map } from 'rxjs';

const isObject = (value) => typeof value === 'object' && !Array.isArray(value);
const cleanObject = (data) => {
  Object.keys(data).forEach(k => delete data[k]);
  return data;
}

const withLayUp = (initial = {}) => {
  const data = { ...initial };
  const injectObject = (item) => {
    Object.keys(item).forEach((key) => {
      data[key] = item[key];
    });
  };

  const dump = (value) => {
    if (value === 'clear!') return cleanObject(data);

    if (isObject(value)) value = [value];
    value.forEach((item) => injectObject(item));
    return { ...data };
  };

  return map(dump);
}

export default withLayUp;
