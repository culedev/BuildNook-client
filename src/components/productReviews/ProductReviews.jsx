// STYLES
import "./reviews.css";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// HOOKS
import { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
// ROUTES
import { useNavigate, useParams } from "react-router-dom";
// SERVICES
import { deleteReview, getAllReviews } from "../../services/reviews.service";
// CONTEXT
import { AuthContext } from "../../context/auth.context";
// COMPONENTS
import SimpleBackdrop from "../SimpleBackdrop";


const ProductReviews = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { isUserActive, user } = useContext(AuthContext);
  const [reviews, setReviews] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    getProductReviews();
  }, [productId]);

  const getProductReviews = async () => {
    try {
      const response = await getAllReviews(productId);
      setReviews(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      getProductReviews();
      enqueueSnackbar(`Review removed successfully`, {
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
                <h4 style={{marginLeft: "10px"}}>{eachReview.user.username}</h4>
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
      
    </div>
  );
};

export default ProductReviews;
