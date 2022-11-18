import logo from './logo.svg';
import './App.css';
import VocabForm from'./components/VocabForm';
import VocabPublic from'./components/VocabPublic';
import store from './index';
import {Provider} from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';
import Login from './components/Login';
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from './components/Navbar';
function App() {
  const [user, setUser] = useState({});
  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var decoded = jwt_decode(response.credential);
    setUser(decoded);
    document.getElementById("buttonDiv").hidden = true;
  };
  const handleLogOut = (e) => {
    setUser({});
    document.getElementById("buttonDiv").hidden = false;
  };
  useEffect(() => {
    /* global google*/
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "293409436957-3uufdep8n95kro3e6q1m01r0tnntl6o2.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
      <Route
          path="/dashboard"
          element={
            <Protected>
              <Provider store={store}>
         <VocabForm></VocabForm>
         </Provider>
            </Protected>
          }
        ></Route>
        
         <Route path="/" element={<VocabPublic/>}></Route>
         <Route path="/login" element={<Login />}></Route>
      </Routes>

     
    </div>
  );
}

export default App;
