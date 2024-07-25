import * as admin from 'firebase-admin';
import serviceAccount from '../../firebase-key.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const auth = admin.auth();
const db = admin.firestore();
export { admin, db, auth };
