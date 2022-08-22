import service from "./config.services";
// Gives user profile
const findProfile = () => {
  return service.get(`/profile`);
};
// Edit user profile
const editProfile = (image) => {
  return service.patch("/profile", image)
}

export { findProfile, editProfile };
