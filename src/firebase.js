import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDDNTzrZmXFDVrtYA1vlFUa4T3jSwqAbAc",
  authDomain: "whatsapp-clone-16e0c.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-16e0c.firebaseio.com",
  projectId: "whatsapp-clone-16e0c",
  storageBucket: "whatsapp-clone-16e0c.appspot.com",
  messagingSenderId: "434243232452",
  appId: "1:434243232452:web:14bf842cd0b7b11c2c1f91",
};

const firebaseApp=firebase.initializeApp(firebaseConfig)
const db= firebaseApp.firestore()
const auth=firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
export {auth,provider}
export default db