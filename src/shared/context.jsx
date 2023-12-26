import { PropTypes } from "prop-types";
import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../Firebase";

export const Context = createContext();

export const AuthContext = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) setUser(currentUser);
      else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const values = {
    user: user,
    setUser: setUser,
  };

  return (
    <Context.Provider value={values}>{!loading && children}</Context.Provider>
  );
};

AuthContext.propTypes = {
  children: PropTypes.node,
};
