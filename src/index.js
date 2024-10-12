import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initializeApp } from "firebase/app";
import "./index.css";
import App from "./App";
import Layout from "./Layout";
import CreateAcc from "./createAcc";
import Login from "./login";
import DashboardPage from "./Enter/dashboard";
import Signup from "./signup";
import PopupForm from "./Enter/trials";
import StoredChat from "./StoredChat";
import StoredChatLayout from "./storedMeeting";
import LandingPage from "./Hero/LandingPage"
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
  {/* <PopupForm/> */}
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/createacc" element={<CreateAcc />} />
      {/* <Route path="/enter/:name" element={<EnterPage />} /> */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/storedmeetings" element={<StoredChat />} />
      <Route path="/storedchat" element={<StoredChatLayout/>} />
      <Route path="/chat/:meetingId" element={<Layout />} />
    </Routes>
  </BrowserRouter>
  </>
  // <App/>
);