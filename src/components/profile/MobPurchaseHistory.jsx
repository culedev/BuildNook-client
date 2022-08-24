import "./PurchaseHistory.css";
import { Divider } from "@mui/material";
const MobPurchaseHistory = ({ transactions }) => {
  return (
    <div>
      {transactions.map((transaction) => {
        return (
          <div key={transaction._id} className="cardContainer">
            <h4 className="transactionId">{`ID: ${transaction._id}`}</h4>
            <Divider />
            {transaction.product.map((product) => {
              return (
                <div key={product._id} className="product">
                  <div className="imgContainer">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="dataContainer">
                    <h5 className="productName">{product.name}</h5>
                    <h6 className="productPrice">{product.price}€</h6>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MobPurchaseHistory;
