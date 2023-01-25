import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/authcontext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { Display } from "./context/themeContext";





ReactDOM.render(
  <Display>
  <AuthProvider>
      <App />
    </AuthProvider>
  </Display>
  
  ,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
