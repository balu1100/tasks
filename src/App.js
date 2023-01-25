import "./App.css";
import { useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase.config";
import SideBar from "./components/sidebar/Sidebar";
import Inbox from "./components/inbox/Inbox";
import Route from "./router/Route";
import Login from "./components/login/Login";
import { authContext } from "./context/authcontext";
import Completed from "./components/completed/Completed";
import { TaskProvider } from "./context/taskContext";
import { Toaster } from "react-hot-toast";
import { context, Display } from "./context/themeContext";

function App() {
  const [user, setCurrentUser] = useContext(authContext);
  const display=useContext(context)
  console.log(display)
  onAuthStateChanged(auth, (currentUser) => {
    setCurrentUser(currentUser);
  });

  let displayScreen =
    user === null ? (
      <div className="login-container">
        <Login />
      </div>
    ) : (
      
    <TaskProvider>
            <div className="main-container">
              <SideBar />
              <div className="container">
                <h1>{display.name}</h1>
                <Route path="/">
                  <Inbox />
                </Route>
              
                <Route path="/completed">
                  <Completed />
                </Route>
              </div>
              <Toaster position="bottom-right" reverseOrder={true} />
            </div>
          </TaskProvider>
      
      
    );
  useEffect(() => {}, [user]);
  return <div>{displayScreen}</div>;
}

export default App;
