import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
//   인증정보를 넣어주세요!
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
