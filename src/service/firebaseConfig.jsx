// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoAnp0yjDCYaY4oeIgL1C2kSALLdFM6sA",
  authDomain: "ai-travel-planner-8c1c6.firebaseapp.com",
  projectId: "ai-travel-planner-8c1c6",
  storageBucket: "ai-travel-planner-8c1c6.firebasestorage.app",
  messagingSenderId: "808122077588",
  appId: "1:808122077588:web:5fdac6c17fceda40ef7f81",
  measurementId: "G-S7113SWK25"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);

// const analytics = getAnalytics(app);