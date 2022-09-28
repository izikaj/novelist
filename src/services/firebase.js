import { initializeApp } from 'firebase/app';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const APP_NS = ' -- APP -- ';
const DB_NS = ' -- DB -- ';
const AUTH_NS = ' -- AUTH -- ';
const STORE_NS = ' -- STORE -- ';

function $$setup() {
  return initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  });
}

// export singular instances
export const app = (window[APP_NS] || (window[APP_NS] = $$setup()));
export const database = (window[DB_NS] || (window[DB_NS] = getDatabase(app)));
export const auth = (window[AUTH_NS] || (window[AUTH_NS] = getAuth(app)));
export const storage = (window[STORE_NS] || (window[STORE_NS] = getStorage(app)));

if (location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  connectDatabaseEmulator(database, 'localhost', 9000, { disableWarnings: true });
  connectStorageEmulator(storage, "localhost", 9199, { disableWarnings: true });
  // disableWarnings: true
}
