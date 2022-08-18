// Styles
import "./Auth.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// Hooks
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// Context
import { AuthContext } from "../../context/auth.context";
// Services
import { loginService } from "../../services/auth.services";

const Login = () => {
  const { authenticateUser } = useContext(AuthContext);

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

      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="box">
      <div className="signup-box">
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
            color="primary"
            style={{ width: "50%" }}
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
