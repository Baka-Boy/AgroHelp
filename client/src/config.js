// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqTwEVFFkC6JgttkDPQByvyMNCouZI7MY",
  authDomain: "agrohelp-a481d.firebaseapp.com",
  projectId: "agrohelp-a481d",
  storageBucket: "agrohelp-a481d.appspot.com",
  messagingSenderId: "234756610202",
  appId: "1:234756610202:web:32e16bf84ec8aa10cee723",
  measurementId: "G-QCW04DL55P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export default app;