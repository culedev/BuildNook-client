// STYLES
import { Divider } from "@mui/material";
// HOOKS
// ROUTES
// SERVICES
// COMPONENTS
import ProfileSidenav from "../../components/profile/ProfileSidenav"

const Profile = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "start" }}
    >
      <div style={{ flexGrow: 1 }}>
        <ProfileSidenav />
      </div>
      <Divider orientation="vertical" flexItem />
      <div style={{ flexGrow: 20, margin: "20px" }}>
        <h1>HOLAA</h1>
      </div>
    </div>
  )
}

export default Profile