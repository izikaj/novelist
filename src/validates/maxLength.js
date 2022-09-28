const maxLength = (target, errors = {}) => (key, checkpoint) => {
  const value = target && target[key];
  if (!Number.isFinite(checkpoint)) return;
  if ('string' !== typeof value) return;
  if (value.length <= checkpoint) return;

  (errors[key] || (errors[key] = [])).push('long');
}

export default maxLength;
