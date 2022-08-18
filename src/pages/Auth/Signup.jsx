// Styles
import "./Auth.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// Hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Services
import { signupService } from "../../services/auth.services";

const Signup = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const stateClone = { ...newUser };
    stateClone[event.target.name] = event.target.value;
    setNewUser(stateClone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signupService(newUser);
      navigate("/login");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div className="box">
      <div className="signup-box">
        <form onSubmit={handleSubmit} className="signup">
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            name="username"
            onChange={handleChange}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleChange}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type={"password"}
            name="password"
            onChange={handleChange}
          />
          <br />
          {errorMessage && <p>{errorMessage}</p>}
          <br />
          <Button variant="contained" type="submit" color="primary" style={{width: "50%"}}>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
