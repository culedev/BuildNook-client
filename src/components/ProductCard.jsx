// STYLES
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
// SERVICES
import { addProductToCart } from "../services/transaction.services";
import { addToWishList } from "../services/products.services";
// HOOKS
import { useSnackbar } from "notistack";
import { ProfileContext } from "../context/profile.context";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
// ROUTES
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { getProfile } = useContext(ProfileContext);
  const { isUserActive } = useContext(AuthContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleAddCart = async () => {
    if (isUserActive) {
      try {
        await addProductToCart(product._id);
        getProfile();
        enqueueSnackbar(`${product.name} added to Shopping Cart`, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          preventDuplicate: true,
        });
      } catch (error) {
        navigate("/error");
      }
    } else {
      navigate("/login");
    }
  };

  const handleWishList = async () => {
    if (isUserActive) {
      try {
        await addToWishList(product._id);
        getProfile();
        enqueueSnackbar(`${product.name} added to Wish List`, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          preventDuplicate: true,
        });
      } catch (error) {
        navigate("/error");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link
        to={`/products/${product._id}/details`}
        style={{ textDecoration: "none" }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="200"
          image={product.image}
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="h5" color="#52489C">
          {product.price}€
        </Typography>
      </CardContent>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Button onClick={handleWishList} size="small" sx={{ color: "#52489C" }}>
          <FavoriteIcon sx={{ color: "#52489C" }} />
          Wish List
        </Button>
        <Button onClick={handleAddCart} size="small" sx={{ color: "#52489C" }}>
          <AddShoppingCartIcon sx={{ color: "#52489C" }} />
          Add Cart
        </Button>
      </CardActions>
    </Card>
  );
}
