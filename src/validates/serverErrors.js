// https://firebase.google.com/docs/auth/admin/errors
// auth/email-already-exists -> email: taken
// auth/invalid-display-name -> displayName: invalid
// auth/invalid-email -> email: invalid
// auth/invalid-password -> password: ivalid (min length: 6)
// auth/invalid-provider-data -> auth data: invalid
// auth/user-not-found -> not found
// auth/wrong-password -> not found
// auth/email-already-in-use -> email: taken

const MAPPING = {
  'auth/email-already-exists': ['email', 'taken'],
  'auth/email-already-in-use': ['email', 'taken'],
  'auth/invalid-email': ['email', 'invalid'],
  'auth/invalid-display-name': ['displayName', 'invalid'],
  'auth/invalid-password': ['password', 'invalid'],
  'auth/invalid-provider-data': ['provider', 'invalid'],
  'auth/user-not-found': ['email', 'not_found'],
  'auth/wrong-password': ['email', 'not_found'],
};

const FALLBACK = ['base', 'invalid'];

const server = (_target, errors = {}) => (error) => {
  if (!error.code) return;
  console.log('<<<<<<<', error.code, MAPPING[error.code] || FALLBACK);
  const [field, code] = (MAPPING[error.code] || FALLBACK);

  (errors[field] || (errors[field] = [])).push(code);
}

export default server;
