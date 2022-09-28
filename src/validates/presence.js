import isPresent from '../shared/isPresent';

const presence = (target, errors = {}) => (key) => {
  const value = target && target[key];
  if (isPresent(value)) return;

  (errors[key] || (errors[key] = [])).push('blank');
}

export default presence;
