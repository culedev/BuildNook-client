import { createContext, useState, useEffect, useContext } from "react";
import SimpleBackdrop from "../components/SimpleBackdrop";
import { findProfile } from "../services/profile.services";
import { AuthContext } from "./auth.context";

const ProfileContext = createContext();

const ProfileWrapper = (props) => {
  const { isUserActive } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isFetchingProfile, setIsFetchingProfile] = useState(true);

  useEffect(() => {
    if (isUserActive) {
      getProfile();
    } else {
      setIsFetchingProfile(false);
    }
  }, [isUserActive]);

  const getProfile = async () => {
    try {
      const response = await findProfile();
      setProfile(response.data);
      setIsFetchingProfile(false);
    } catch (error) {
      setProfile(null);
      setIsFetchingProfile(false);
    }
  };

  const passedContext = {
    profile,
    getProfile,
    isFetchingProfile,
  };

  if(isFetchingProfile){
    return <SimpleBackdrop />
  }

  return (
    <ProfileContext.Provider value={passedContext}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileWrapper };
