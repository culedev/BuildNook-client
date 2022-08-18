import { useContext } from "react";
import { AuthContext } from "../context/auth.context.js";
import { Navigate } from "react-router-dom";

const IsPrivate = (props) => {
  const { isUserActive } = useContext(AuthContext);

  if (isUserActive) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default IsPrivate;
