// STYLES
import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// ROUTES
import { Link, useNavigate } from "react-router-dom";
import { removeFromWishList } from "../../services/products.services";

const WishList = ({ profile, getProfile }) => {
  const navigate = useNavigate();

  const boxWish = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    width: "300px",
    margin: "20px",
    boxShadow: "1px 1px 1px 1px grey",
    borderRadius: "5px",
  };

  const handleDelete = async (itemId) => {
    try {
      await removeFromWishList(itemId);
      getProfile();
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {profile.wishList.map((eachItem) => {
        return (
          <div style={boxWish} key={eachItem._id}>
            <Link
              to={`/products/${eachItem._id}/details`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <img
                src={eachItem.image}
                alt={eachItem.name}
                width={150}
                style={{ marginRight: "10px" }}
              />
            </Link>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h4>{eachItem.name}</h4>
              <h3>{eachItem.price}€</h3>
              <Button
                type="submit"
                variant="contained"
                endIcon={<DeleteOutlineIcon />}
                style={{ backgroundColor: "#52489C" }}
                onClick={() => handleDelete(eachItem._id)}
              >
                Remove
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WishList;
