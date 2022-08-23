// STYLES
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MediaQuery from "react-responsive";
// HOOKS
import { useState } from "react";
// ROUTES
import { Link } from "react-router-dom";

const categoriesArr = [
  "power-supply",
  "motherboard",
  "HDD",
  "SSD",
  "graphic-cards",
  "ram",
  "pc-tower",
];

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ color: "white", marginLeft: "20px" }}
      >
        Categories
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MediaQuery maxWidth={600}>
          <Link to={`/`} style={{ textDecoration: "none", color: "#52489C" }}>
            <MenuItem onClick={handleClose}>BACK HOME</MenuItem>
          </Link>
        </MediaQuery>
        {categoriesArr.map((eachCategorie) => {
          const categorieName = eachCategorie
            .split("-")
            .join(" ")
            .toUpperCase();
          return (
            <Link
              to={`/products/${eachCategorie}`}
              style={{ textDecoration: "none", color: "#52489C" }}
            >
              <MenuItem onClick={handleClose}>{categorieName}</MenuItem>
            </Link>
          );
        })}
      </Menu>
    </div>
  );
}
