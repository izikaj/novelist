const isPresent = (value) => {
  if (value === null || value === undefined || value === '') return false;

  if (Array.isArray(value)) return value.length > 0;
  const type = typeof value;
  if (type === 'boolean' || type === 'number' || type === 'function') return true;

  return Object.getOwnPropertyNames(value).length > 0;
}

export default isPresent;
