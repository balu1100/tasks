import { signOut } from "firebase/auth";

const signout = (auth, setUser) => {
  signOut(auth).then(() => {
    setUser(null);
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("uid");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("tasks");
    window.history.pushState({}, null, "/");
  });
};

export { signout };
