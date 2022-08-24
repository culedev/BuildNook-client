import { Button } from "@mui/material";
// HOOKS
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// SERVICES
import { editProfile } from "../../services/profile.services";
import { uploadService } from "../../services/upload.services";

const EditProfile = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);

  const handleImgUpload = async (event) => {
    const form = new FormData();
    form.append("imageUrl", event.target.files[0]);

    try {
      const response = await uploadService(form);
      setImageUrl(response.data);
      await editProfile(imageUrl);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async () => {
    try {
      await editProfile(imageUrl);
    } catch (error) {
      navigate("/error");
    }
  };

  const isBtnActive = imageUrl === null && "disabled";

  return (
    <div>
      <input
        style={{ display: "none" }}
        id={`preview`}
        type="file"
        onChange={handleImgUpload}
      />
      <label htmlFor={`preview`}>
        <Button
          variant="outlined"
          component="span"
          size="small"
          style={{ borderColor: "#52489C", color: "#52489C" }}
        >
          SELECT PROFILE IMAGE
        </Button>
      </label>
      <form onSubmit={handleSubmit}>
        <br />
        {imageUrl !== null ? (
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#52489C"}}
          >
            Update Profile
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            style={{backgroundColor: "white", color: "#52489C"  }}
            disabled
          >
            Update Profile
          </Button>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
