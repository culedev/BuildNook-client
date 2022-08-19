import { createContext, useState, useEffect } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

const AuthWrapper = (props) => {
  const [isUserActive, setIsUserActive] = useState(false);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      const response = await verifyService();
      setIsUserActive(true);
      setUser(response.data);
      setIsFetching(false);
    } catch (error) {
      setIsUserActive(false);
      setUser(null);
      setIsFetching(false);
    }
  };
 
  
  if (isFetching) {
    return <h2>...Loading</h2>;
  }
  const passedContext = {
    isUserActive,
    user,
    authenticateUser,
  };

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthWrapper };
