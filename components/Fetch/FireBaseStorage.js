import { initializeApp } from '@firebase/app';
import { getStorage } from '@firebase/storage';

import { firebaseKey } from '../../env'

const firebaseConfig = firebaseKey;

// Firebase 초기화
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage