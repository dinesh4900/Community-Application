import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBZLq6Q7jP6QzgVnLTOj8phfvRfQsWPIuI",
    authDomain: "fir-prjct-d44dd.firebaseapp.com",
    databaseURL: "https://fir-prjct-d44dd.firebaseio.com",
    projectId: "fir-prjct-d44dd",
    storageBucket: "fir-prjct-d44dd.appspot.com",
    messagingSenderId: "323043640112",
    appId: "1:323043640112:web:ef4078a7cc9eb2810e3ef5",
    measurementId: "G-WN5B4RK90D"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();


  export{ auth, provider};

  export default db