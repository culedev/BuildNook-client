// STYLES
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// HOOKS
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// COMPONENTS
import { postReview } from "../../services/reviews.service";

const ProductReviews = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [newReview, setNewReview] = useState({
    title: "",
    description: "",
    rating: 0,
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px"
  };

  const handleChange = (event) => {
    const stateClone = { ...newReview };
    stateClone[event.target.name] = event.target.value;
    setNewReview(stateClone);
  };

  const handleSubmit = async () => {
    try {
      await postReview(productId, newReview);
      enqueueSnackbar(`Review added successfully`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        preventDuplicate: true,
      })
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div style={{marginTop: "20px"}}>
      <Button style={{color: "#52489C"}} onClick={handleOpen}>Write Review</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Rating
              name="rating"
              value={Number(newReview.rating)}
              onChange={handleChange}
              style={{ color: "#52489C" }}
            />
            <br />
            <TextField
              name="title"
              required
              id="outlined-required"
              label="Title"
              value={newReview.title}
              onChange={handleChange}
              style={{ margin: "20px 0", width: "100%" }}
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
              style={{ marginBottom: "20px", width: "100%"  }}
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              style={{ backgroundColor: "#52489C" }}
            >
              Send Review
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductReviews;
