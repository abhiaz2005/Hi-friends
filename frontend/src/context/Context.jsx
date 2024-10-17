import { createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

const Context = ({ children }) => {
  // Save token to localStorage
  let setServerToken = (serverToken) => {
    localStorage.setItem("authToken", serverToken);
  };

  // Get and validate token from localStorage
  const getServerTokenDecode = () => {
    try {
        const auth = localStorage.getItem("authToken") ;
        const decoded = jwtDecode(auth);
        return decoded ;
    } catch (error) {
        return null ;
    }
  };


  return (
    <UserContext.Provider value={{ setServerToken, getServerTokenDecode }}>
      {children}
    </UserContext.Provider>
  );
};

export default Context;
