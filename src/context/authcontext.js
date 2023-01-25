import { createContext, useState } from "react";

export const authContext = createContext();
export const AuthConsumer = authContext.Consumer;

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    window.localStorage.getItem("username")
  );
  return (
    <authContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </authContext.Provider>
  );
};
