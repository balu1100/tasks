import { useEffect, useState } from "react";

const Route = ({ path, children }) => {
  const [location, setLocation] = useState(window.location.pathname);

  const onLocationChange = () => {
    setLocation(window.location.pathname);
  };

  useEffect(() => {
    window.addEventListener("popstate", onLocationChange);
    return () => {
      window.removeEventListener("popstate", null);
    };
  }, []);

  return location === path ? children : null;
};

export default Route;
