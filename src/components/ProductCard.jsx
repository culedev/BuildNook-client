import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { addProductToCart } from '../services/transaction.services';
import { ProfileContext } from '../context/profile.context';
import { useContext } from 'react';
import { addToWishList } from '../services/products.services';


export default function ProductCard({product}) {
    const {getProfile} = useContext(ProfileContext)
    const handleAddCart = async () => {
        await addProductToCart(product._id)
        getProfile()
    }

    const handleWishList = async () => {
        await addToWishList(product._id)
        getProfile()
    }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={product.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {product.name}
        </Typography>
        <Typography variant="h5" color="#52489C">
        {product.price}$
        </Typography>
      </CardContent>
      <CardActions style={{display: "flex", justifyContent: "center"}}>
        <Button onClick={handleWishList} size="small" sx={{ color: "#52489C" }}><FavoriteIcon sx={{ color: "#52489C" }}/>Wish List</Button>
        <Button onClick={handleAddCart} size="small" sx={{ color: "#52489C" }}><AddShoppingCartIcon sx={{ color: "#52489C" }}/>Add Cart</Button>
      </CardActions>
    </Card>
  );
}