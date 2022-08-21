// STYLES
import "./Details.css";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
// HOOKS
import { useEffect, useState, useContext } from "react";
import { ProfileContext } from '../../context/profile.context';
// ROUTES
import { useNavigate, useParams } from "react-router-dom";
// SERVICES
import { getProductDetails } from "../../services/products.services";
import { addProductToCart } from '../../services/transaction.services';
import { addToWishList } from '../../services/products.services';
// COMPONENTS
import ListCategories from "../../components/navbars/ListCategories";
import BoxDescRev from "../../components/BoxDescRev";
import { avgRating } from "../../services/reviews.service";

const ProductDetail = () => {
  const navigate = useNavigate();
  const {getProfile} = useContext(ProfileContext)
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await getProductDetails(productId);
      const responseAvg = await avgRating(productId);
      setProduct(response.data);
      setRating(responseAvg.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleAddCart = async () => {
    await addProductToCart(product._id);
    getProfile();
  };

  const handleWishList = async () => {
    await addToWishList(product._id);
    getProfile();
  };

  if (isFetching) {
    return <h2>...Loading</h2>;
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "start" }}
    >
      <div style={{ flexGrow: 1 }}>
        <ListCategories />
      </div>

      <div style={{ flexGrow: 20, margin: "20px" }}>
        <div className="boxImage">
          <img src={product.image} alt={product.name} width={400} />
          <div className="details">
            <h2>{product.name}</h2>
            <h2>{product.price}€</h2>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Rating
                name="read-only"
                value={rating.rating}
                style={{ color: "#52489C" }}
                readOnly
              />
              <p>({rating.length})</p>
            </div>
            <div style={{marginTop: "10px"}}>
              <Button
                onClick={handleWishList}
                size="small"
                sx={{ color: "#52489C" }}
              >
                <FavoriteIcon sx={{ color: "#52489C" }} />
                Wish List
              </Button>
              <Button
                onClick={handleAddCart}
                size="small"
                sx={{ color: "#52489C" }}
              >
                <AddShoppingCartIcon sx={{ color: "#52489C" }} />
                Add Cart
              </Button>
            </div>
          </div>
        </div>
        <div>
          <BoxDescRev />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
