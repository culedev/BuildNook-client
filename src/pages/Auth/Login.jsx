// STYLES
import "./Auth.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// HOOKS
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// CONTEXT
import { AuthContext } from "../../context/auth.context";
// SERVICES
import { loginService } from "../../services/auth.services";
import { Link } from "react-router-dom";
import { ProfileContext } from "../../context/profile.context";

const Login = () => {
  const { authenticateUser } = useContext(AuthContext);
  const { getProfile } = useContext(ProfileContext)
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const stateClone = { ...userCredentials };
    stateClone[event.target.name] = event.target.value;
    setUserCredentials(stateClone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService(userCredentials);
      const authToken = response.data.authToken;

      localStorage.setItem("authToken", authToken);
      authenticateUser();
      getProfile()
      navigate("/");
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
        <h2 style={{color: "#52489C"}}>Log In</h2>
        <form onSubmit={handleSubmit} className="signup">
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
          <Button
            variant="contained"
            type="submit"
            style={{ width: "50%", backgroundColor: "#7b57c2" }}
          >
            Log In
          </Button>
          <Link to={"/signup"}><p>Need an account?</p></Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
