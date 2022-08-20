import service from "./config.services";
// Register user
const signupService = (newUser) => {
  return service.post("/auth/signup", newUser);
};
// LogIn user
const loginService = (userCredentials) => {
  return service.post("/auth/login", userCredentials);
};
// Verify user
const verifyService = () => {
  return service.get("/auth/verify");
};

export { signupService, loginService, verifyService };
