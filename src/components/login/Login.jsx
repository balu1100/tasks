import React, { useContext } from "react";
import { signInWithGoogle } from "../../services/auth/googleauth";
import { auth } from "../../services/firebase.config";
import { authContext } from "../../context/authcontext";
import "./login.css";

const Login = () => {
  const setUser = useContext(authContext);
  const handleClick = async () => {
    signInWithGoogle()
      .then(() => {
        setUser[1](auth.currentUser.displayName);
        window.localStorage.setItem("username", auth.currentUser.displayName);
        window.localStorage.setItem("uid", auth.currentUser.uid);
        window.localStorage.setItem("img", auth.currentUser.photoURL);
        window.localStorage.setItem("email", auth.currentUser.email);
        window.localStorage.setItem("completed", JSON.stringify([]));
        window.localStorage.setItem("notes", JSON.stringify([]));
        window.history.pushState({}, null, "/");
      })
      .catch((err) => {});
  };

  return (
    <div className="login-form">
      <button onClick={handleClick} className="login-btn">
        <img
          src="https://img.icons8.com/color/48/000000/google-logo.png"
          width="40px"
          alt="google-logo"
        />
        <span>Sign in with Google</span>
      </button>
      <button className="login-btn">
        <img
          src="https://img.icons8.com/fluency/48/000000/facebook.png"
          width="40px"
          alt="facebook-logo"
        />

        <span>Sign in with Facebook</span>
      </button>
    </div>
  );
};
export default Login;
