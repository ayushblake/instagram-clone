import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp =firebase.initializeApp(
    {
        apiKey: "AIzaSyDywRmV5Z2mNnRe1wVVg1xADKk1AL7BX20",
        authDomain: "instagram-clone-react-ap-e9675.firebaseapp.com",
        databaseURL: "https://instagram-clone-react-ap-e9675-default-rtdb.firebaseio.com",
        projectId: "instagram-clone-react-ap-e9675",
        storageBucket: "instagram-clone-react-ap-e9675.appspot.com",
        messagingSenderId: "680950260231",
        appId: "1:680950260231:web:38e11758c5148b0f2840a2",
        measurementId: "G-F1V4YH3D21"
      }
) ; 

    const db=firebaseApp.firestore();
    const auth=firebase.auth();
    const storage=firebase.storage();

export {db,auth,storage};