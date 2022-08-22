import React, { useContext, useEffect} from "react";
import { ProfileContext } from "../../context/profile.context";
import SimpleBackdrop from "../SimpleBackdrop";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const CartBtn = () => {
  const { profile, getProfile, isFetchingProfile } = useContext(ProfileContext);
  console.log(profile);

  useEffect(() => {
    getProfile();
  }, []);


   const totalPrice = profile.shoppingCart.reduce((acc, product) => {
        console.log(product.price)
        return acc + product.price
    }, 0)


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
              width={50}
              height={50}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <span>
                <strong>{eachProduct.name}</strong>
              </span>
              <span>{eachProduct.price}€</span>
            </div>
          </div>
        );
      })}
      <Divider />
      <div style={{margin: 20}}>
        <h4>Subtotal: {totalPrice} €</h4>
        <Link to={`/cart/${profile._id}`} style={{textDecoration: "none"}}><Button variant="contained" style={{ backgroundColor: "#52489C" }}>PAY WITH STRIPE</Button ></Link>
      </div>
    </div>
  );
};

export default CartBtn;
