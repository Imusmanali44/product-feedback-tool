import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDnRCzxps6_89b5Fs5AuerTGOfMaDfkBmU",
  authDomain: "product-feedback-tool.firebaseapp.com",
  projectId: "product-feedback-tool",
  storageBucket: "product-feedback-tool.appspot.com",
  messagingSenderId: "632310976725",
  appId: "1:632310976725:web:e3078001ff2c189a09525c",
  measurementId: "G-CFLFSP5SLP",
  databaseUrl: "https://product-feedback-tool-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

