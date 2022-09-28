const presence = (target, errors = {}) => (key, ref) => {
  const value1 = target && target[key];
  const value2 = target && target[ref];
  if (value1 === value2) return;

  (errors[key] || (errors[key] = [])).push('not_equal');
}

export default presence;
