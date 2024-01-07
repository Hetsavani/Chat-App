import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Layout from "./Layout";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN45fn0XzvfBcBmyR09bXXF82OqI1mMQU",
  authDomain: "chat-app-73c49.firebaseapp.com",
  databaseURL: "https://chat-app-73c49-default-rtdb.firebaseio.com",
  projectId: "chat-app-73c49",
  storageBucket: "chat-app-73c49.appspot.com",
  messagingSenderId: "632382168601",
  appId: "1:632382168601:web:f9162b7c4351624a72d488",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Layout/>
  <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat/:xyz" element={<Layout />} />
      
    </Routes>
  </BrowserRouter>
  </>
  // <App/>
);
