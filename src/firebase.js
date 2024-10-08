// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfwR4AeIQr0G3zPIm8wag9cOpFNiuen4g",
  authDomain: "airbnb-project-2d1fa.firebaseapp.com",
  projectId: "airbnb-project-2d1fa",
  storageBucket: "airbnb-project-2d1fa.appspot.com",
  messagingSenderId: "472233065561",
  appId: "1:472233065561:web:e25a065f1cfcf0be294548",
  measurementId: "G-CXJ2K1LM4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional, if you want to use analytics
const auth = getAuth(app); // Initialize Auth

// Export Auth
export { auth };





