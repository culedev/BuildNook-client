import service from "./config.services";
// Gives user profile
const findProfile = () => {
  return service.get(`/profile`);
};
// Edit user profile
const editProfile = (inputs) => {
  return service.post("/profile", inputs)
}

export { findProfile, editProfile };
