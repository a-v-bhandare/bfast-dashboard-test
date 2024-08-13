import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signInStatus, setSignInStatus] = useState(false);

  const signIn = () => {
    setIsAuthenticated(true);
    setSignInStatus(true); // Update sign-in status to true after successful sign-in
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setSignInStatus(false); // Update sign-in status to false after sign-out
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, signInStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
