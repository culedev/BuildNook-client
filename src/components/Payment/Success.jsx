// STYLES
import { Button } from "@mui/material";
// HOOKS
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// SERVICES
import { patchPayment } from "../../services/transaction.services";
// COMPONENTS
import SimpleBackdrop from "../SimpleBackdrop";

const boxStyle = {
  border: "1px solid #e8ebed",
  borderRadius: "20px",
  padding: "50px",
  backgroundColor: "#e8ebed",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  marginTop: "200px",
  marginBottom: "100px",
};

const Success = () => {
  const [isFetching, setIsFetching] = useState(true);
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );
  const paymentIntent = new URLSearchParams(window.location.search).get(
    "payment_intent"
  );

  const navigate = useNavigate();
  useEffect(() => {
    completePayment();
  }, []);

  const completePayment = async () => {
    try {
      await patchPayment({ client: clientSecret, payment: paymentIntent });
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching) {
    return <SimpleBackdrop />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={boxStyle}>
        <h1>Thank you for your order!</h1>
        <h4>You can check the order on Purchase History</h4>
        <h4>
          If you have any question, email <a href="#">example@example.com</a>
        </h4>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#52489C", marginTop: "20px" }}
          >
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
