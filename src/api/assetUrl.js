import { storage } from '../services/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

const API_ASSET_NS = ' -- API:assetUrl -- ';

function $build() {
  const chacheURL = {};
  console.warn('BUILD API:assetUrl');

  return (path) => {
    if (chacheURL[path]) return Promise.resolve(chacheURL[path]);

    return getDownloadURL(ref(storage, path)).then((l) => chacheURL[path] = l);
  };
}

const assetUrl = window[API_ASSET_NS] || (window[API_ASSET_NS] = $build());

export default assetUrl;
