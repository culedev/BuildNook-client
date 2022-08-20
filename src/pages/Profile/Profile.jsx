// STYLES
import { Divider } from "@mui/material";
// HOOKS
import { useContext } from "react";
// ROUTES
import { useParams } from "react-router-dom";
// SERVICES
import { ProfileContext } from "../../context/profile.context";
// COMPONENTS
import ProfileSidenav from "../../components/profile/ProfileSidenav";
import EditProfile from "../../components/profile/EditProfile.jsx";
import MyReviews from "../../components/profile/MyReviews.jsx";
import PurchaseHistory from "../../components/profile/PurchaseHistory.jsx";
import WishList from "../../components/profile/WishList.jsx";

const Profile = () => {
  const { display } = useParams();
  const { profile, getProfile } = useContext(ProfileContext)
  console.log(profile)
  const displayInfo = () => {
    if (display === "edit-profile") {
      return <EditProfile />;
    } else if (display === "purchase-history") {
      return <PurchaseHistory />;
    } else if (display === "wish-list") {
      return <WishList />;
    } else if (display === "my-reviews") {
      return <MyReviews />;
    } else {
      return <WishList />;
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "start" }}
    >
      <div style={{ flexGrow: 1 }}>
        <ProfileSidenav />
      </div>
      <Divider orientation="vertical" flexItem />
      <div style={{ flexGrow: 20, margin: "20px" }}>
        <h2>Hello, {profile.username}</h2>
        <p>{profile.email}</p>
        <img src={profile.image} alt="" style={{width: "200px", height: "200px", borderRadius: "200px"}}/>
        {displayInfo()}
      </div>
    </div>
  );
};

export default Profile;
