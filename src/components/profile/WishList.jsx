// STYLES
import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// ROUTES
import { Link, useNavigate } from "react-router-dom";
import { removeFromWishList } from "../../services/products.services";
// HOOKS
import { useSnackbar } from "notistack";

const WishList = ({ profile, getProfile }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const boxWish = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    width: "70%",
    minHeight: "200px",
    maxHeight: "200px",
    margin: "20px",
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px",
    borderRadius: "5px",
  };

  const handleDelete = async (item) => {
    try {
      await removeFromWishList(item._id);
      getProfile();
      enqueueSnackbar(`${item.name} removed from Wish List`, {
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
              style={{ textDecoration: "none"}}
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
                onClick={() => handleDelete(eachItem)}
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
