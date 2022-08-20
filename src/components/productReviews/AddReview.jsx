// STYLES
import TextField from "@mui/material/TextField";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
// HOOKS
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// COMPONENTS
import { postReview } from "../../services/reviews.service";

const ProductReviews = () => {
    const {productId} = useParams()
    const navigate = useNavigate()
  const [newReview, setNewReview] = useState({
    title: "",
    description: "",
    rating: 0,
  });

  const handleChange = (event) => {
    const stateClone = {...newReview};
    stateClone[event.target.name] = event.target.value
    setNewReview(stateClone)
  };

  const handleSubmit = async () => {
    try {
        await postReview(productId, newReview)
    } catch (error) {
        navigate("/error")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Write a Review</h3>
        <Rating
          name="rating"
          value={Number(newReview.rating)}
          onChange={handleChange}
          style={{color: "#52489C"}}
        />
        <br />
        <TextField
          name="title"
          required
          id="outlined-required"
          label="Title"
          value={newReview.title}
          onChange={handleChange}
          style={{ margin: "20px 0" }}
        />
        <br />
        <TextField
          name="description"
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          maxRows={4}
          value={newReview.description}
          onChange={handleChange}
          style={{ marginBottom: "20px" }}
        />
        <br />
        <Button type="submit" variant="contained" endIcon={<SendIcon />} style={{backgroundColor: "#52489C"}}>
        Send Review
      </Button>
      </form>
    </div>
  );
};

export default ProductReviews;
