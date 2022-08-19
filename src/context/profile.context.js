import { createContext, useState, useEffect, useContext } from "react";
import { findProfile } from "../services/profile.services";
import { AuthContext } from "./auth.context";

const ProfileContext = createContext();

const ProfileWrapper = (props) => {
  const { isUserActive } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isFetchingShoppingCart, setIsFetchingShoppingCart] = useState(true);

  useEffect(() => {
    if (isUserActive) {
      getProfile();
    } else {
      setIsFetchingShoppingCart(false);
    }
  }, [isUserActive]);

  const getProfile = async () => {
    try {
      const response = await findProfile();
      setProfile(response.data);
      setIsFetchingShoppingCart(false);
    } catch (error) {
      setProfile(null);
      setIsFetchingShoppingCart(false);
    }
  };

  const passedContext = {
    profile,
    getProfile,
    isFetchingShoppingCart,
  };

  return (
    <ProfileContext.Provider value={passedContext}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileWrapper };
