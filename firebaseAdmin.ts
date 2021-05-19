
import * as firebaseAdmin from "firebase-admin";
import serviceAccount from './utils/db/serviceAccountKey.json';

const privateKey = serviceAccount.private_key;
const clientEmail = serviceAccount.client_email;
const projectId = serviceAccount.project_id;

if (!privateKey || !clientEmail || !projectId) {
  console.log(
    `Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`
  );
}

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: privateKey,
      clientEmail,
      projectId,
    }),
    databaseURL: `https://${projectId}.firebaseio.com`,
  });
}

export { firebaseAdmin };