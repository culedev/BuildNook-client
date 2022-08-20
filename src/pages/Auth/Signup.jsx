// STYLES
import "./Auth.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// HOOKS
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// SERVICES
import { signupService } from "../../services/auth.services";
import { Link } from "react-router-dom";

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
      <h2 style={{color: "#52489C"}}>Sign Up</h2>
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
          <Button variant="contained" type="submit" style={{ width: "50%", backgroundColor: "#7b57c2" }}>
            Sign Up
          </Button>
          <Link to={"/login"}><p>Already an user?</p></Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
