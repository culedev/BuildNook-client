import React, { useContext, useEffect } from "react";
import { ProfileContext } from "../../context/profile.context";
import SimpleBackdrop from "../SimpleBackdrop";
import { Divider } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { deleteProductFromCart } from "../../services/transaction.services";
import { useSnackbar } from "notistack";

const CartBtn = ({ btnShow }) => {
  const navigate = useNavigate();
  const { profile, getProfile, isFetchingProfile } = useContext(ProfileContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    getProfile();
  }, []);

  const totalPrice = profile.shoppingCart.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

  const handleDelete = async (productId, productName) => {
    try {
      await deleteProductFromCart(productId);
      getProfile();
      enqueueSnackbar(`${productName} removed from Shopping Cart`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetchingProfile) {
    return <SimpleBackdrop />;
  }

  return (
    <div>
      {profile.shoppingCart.map((eachProduct) => {
        return (
          <div style={{ display: "flex", margin: "30px 15px" }}>
            <img
              src={eachProduct.image}
              alt={eachProduct.name}
              width={70}
              height={70}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: "10px",
              }}
            >
              <span>
                <strong>{eachProduct.name}</strong>
              </span>
              <span>{eachProduct.price}€</span>
              {btnShow === true && (
              <Button
                onClick={() => handleDelete(eachProduct._id, eachProduct.name)}
                style={{ width: 20, color: "red" }}
              >
                <HighlightOffIcon />
              </Button>
              )}
            </div>
          </div>
        );
      })}
      <Divider />
      <div style={{ margin: 20 }}>
        <h4>Subtotal: {totalPrice.toFixed(2)} €</h4>
        <Link to={`/cart/${profile._id}`} style={{ textDecoration: "none" }}>
          {btnShow === true && (
            <Button variant="contained" style={{ backgroundColor: "#52489C" }}>
              PAY WITH STRIPE
            </Button>
          )}
        </Link>
      </div>
    </div>
  );
};

export default CartBtn;
