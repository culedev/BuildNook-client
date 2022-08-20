// STYLES
import "./reviews.css";
import Rating from "@mui/material/Rating";
// HOOKS
import { useEffect, useState } from "react";
// ROUTES
import { useNavigate, useParams } from "react-router-dom";
// SERVICES
import { getAllReviews } from "../../services/reviews.service";
// COMPONENTS
import SimpleBackdrop from "../SimpleBackdrop";
import AddReview from "./AddReview";

const ProductReviews = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getProductReviews();
  }, [productId]);

  const getProductReviews = async () => {
    try {
      const response = await getAllReviews(productId);
      setReviews(response.data);
      setIsFetching(false);
      console.log(response.data);
    } catch (error) {
      navigate("/error");
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
          <div className="reviewBox">
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
                    marginRight: "5px"
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
              <h3 style={{color: "#52489C"}}>{eachReview.title}</h3>
              <p>{eachReview.description}</p>
            </div>
            <div className="reviewBtn"></div>
          </div>
        );
      })}
      <AddReview />
    </div>
  );
};

export default ProductReviews;
