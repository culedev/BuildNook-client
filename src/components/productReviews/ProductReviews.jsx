// STYLES
import "./reviews.css";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// HOOKS
import { useContext, useEffect, useState } from "react";
// ROUTES
import { useNavigate, useParams } from "react-router-dom";
// SERVICES
import { deleteReview, getAllReviews } from "../../services/reviews.service";
// CONTEXT
import { AuthContext } from "../../context/auth.context";
// COMPONENTS
import SimpleBackdrop from "../SimpleBackdrop";
import AddReview from "./AddReview";

const ProductReviews = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { isUserActive, user } = useContext(AuthContext);
  const [reviews, setReviews] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getProductReviews();
  }, [productId]);

  const getProductReviews = async () => {
    try {
      const response = await getAllReviews(productId);
      console.log(response.data)
      setReviews(response.data);
      setIsFetching(false);
      console.log(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      getProductReviews();
    } catch (error) {
      navigate("/error");
    }
  };
  // Show Delete by User ID
  const deleteBtn = (review) => {
    if (isUserActive && user._id === review.user._id) {
      return (
        <div className="reviewBtn">
          <Button
            type="submit"
            variant="contained"
            endIcon={<DeleteOutlineIcon />}
            style={{ backgroundColor: "#52489C" }}
            onClick={() => handleDelete(review._id)}
          >
            Delete
          </Button>
        </div>
      );
    }
  };

  if (isFetching) {
    return <SimpleBackdrop />;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {reviews.map((eachReview) => {
        return (
          <div className="reviewBox" key={eachReview._id}>
            <div className="reviewUser">
              <div
                style={{
                  marginRight: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={eachReview.user.image}
                  alt=""
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "40px",
                    marginRight: "5px",
                  }}
                />
                <h5>{eachReview.user.username}</h5>
              </div>
              <Rating
                name="read-only"
                style={{ color: "#52489C" }}
                value={eachReview.rating}
                readOnly
              />
            </div>
            <div className="reviewDesc">
              <h3 style={{ color: "#52489C" }}>{eachReview.title}</h3>
              <p>{eachReview.description}</p>
            </div>
            {deleteBtn(eachReview)}
          </div>
        );
      })}
      {isUserActive && <AddReview />}
    </div>
  );
};

export default ProductReviews;
