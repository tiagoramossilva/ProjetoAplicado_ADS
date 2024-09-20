const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pa-iii-3afc6.firebaseio.com', 
});

const db = admin.firestore();

module.exports = db;
