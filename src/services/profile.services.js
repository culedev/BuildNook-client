import service from "./config.services";

const findProfile = () => {
  return service.get(`/profile`);
};

const editProfile = (inputs) => {
  return service.post("/profile", inputs)
}

export { findProfile };
