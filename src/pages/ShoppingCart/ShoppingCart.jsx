// STYLES
import { Divider, Button } from "@mui/material";
// HOOKS
import { useEffect, useState } from "react";
import CartBtn from "../../components/navbars/CartBtn.jsx";
import PaymentIntent from "../../components/Payment/PaymentIntent.jsx";
import SimpleBackdrop from "../../components/SimpleBackdrop.jsx";
// SERVICES
import { getShoppingCart } from "../../services/profile.services";

const ShoppingCart = () => {

  const [userBuyIntent, setUserBuyIntent] = useState(false)
  const [cartProducts, setCartProducts] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  
  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await getShoppingCart()
    setCartProducts(response.data)
    setIsFetching(false)
   
  }
  
  const handleBuy = () => {
    setUserBuyIntent(true)
  }

  if(isFetching){
    return <SimpleBackdrop />
  }

  return (
    <div>
    
      <div style={{display: "flex", justifyContent: "center",width: "100%", marginBottom: "30px"}}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "50%"}}>
          <h2>CART PRODUCTS</h2>
          <div>
            <CartBtn />
          </div>
          <Button type="submit" variant="contained" onClick={handleBuy} style={{backgroundColor: "#52489C"}}>PAY NOW</Button>
        </div>
        <Divider orientation="vertical" flexItem />
          {userBuyIntent === true && (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "50%"}}>
          <h2>PAYMENT</h2>
            <PaymentIntent cartProducts={cartProducts} />
        </div>
            )}
      </div>
    
    </div>
  )
}

export default ShoppingCart