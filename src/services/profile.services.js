import service from "./config.services";

const findProfile = (userId) => {
  return service.get(`/profile/${userId}`);
};

export { findProfile };
