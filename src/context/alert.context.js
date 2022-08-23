import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

import { createContext, useState } from "react";

const AlertContext = createContext();

const AlertWrapper = (props) => {
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [infoAlert, setInfoAlert] = useState(false);

//   <Stack sx={{ width: "100%" }} spacing={2}>
//   <Alert severity="success">
//     <AlertTitle>Success</AlertTitle>
//     <strong>{message}</strong>
//   </Alert>
//   </Stack>

  const getSuccessAlert = () => {
    setSuccessAlert(true);
    setTimeout(() => {
      setSuccessAlert(false);
    }, 3000);
    
  };

  const passedContext = {
    successAlert,
    errorAlert,
    infoAlert,
    getSuccessAlert,
  };

  return (
    <AlertContext.Provider value={passedContext}>
      {props.children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertWrapper };
