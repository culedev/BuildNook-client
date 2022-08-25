// STYLES
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import MediaQuery from "react-responsive";
import Drawer from "@mui/material/Drawer";
// COMPONENTS
import Sidenav from "./Sidenav";
import SimpleBackdrop from "../SimpleBackdrop";
import CartBtn from "./CartBtn";
// HOOKS
import { useContext, useEffect, useState } from "react";
// ROUTES
import { Link, useNavigate } from "react-router-dom";
// CONTEXT
import { AuthContext } from "../../context/auth.context";
import { ProfileContext } from "../../context/profile.context";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export default function PrimarySearchAppBar() {
  const { isUserActive, authenticateUser } = useContext(AuthContext);
  const { profile, getProfile, isFetchingProfile } = useContext(ProfileContext);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    authenticateUser();
    getProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/login");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  if (isFetchingProfile) {
    return <SimpleBackdrop />;
  }

  // Show Login/Signup btns when user isnt active
  const showAuthBtns = () => {
    if (!isUserActive) {
      return (
        <div>
          <Link
            to={"/signup"}
            style={{ textDecoration: "none", marginRight: "20px" }}
          >
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: "#7b57c2" }}
            >
              Sign Up
            </Button>
          </Link>
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: "#7b57c2" }}
            >
              Log In
            </Button>
          </Link>
        </div>
      );
    }
  };
  const shoppingCartIcon = () => {
    if (isFetchingProfile) {
      return <SimpleBackdrop />;
    } else {
      return (
        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
        >
          <Badge badgeContent={profile.shoppingCart.length} color="error">
            <React.Fragment key={"right"}>
              <ShoppingCartIcon onClick={toggleDrawer("right", true)} />
              <Drawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
              >
                <Button
                  style={{
                    color: "#52489C",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  onClick={toggleDrawer("right", false)}
                >
                  {"<"} Close Cart{" "}
                </Button>
                <CartBtn btnShow={true} toggleDrawer={toggleDrawer}/>
              </Drawer>
            </React.Fragment>
          </Badge>
        </IconButton>
      );
    }
  };

  // Show Profile/Cart btns when user is active
  const showProfile = () => {
    return (
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {shoppingCartIcon()}
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Box>
    );
  };
  // Show Profile/Cart btns when user is active
  const showProfileMobile = () => {
    return (
      <div>
        <MenuItem>
          {shoppingCartIcon()}
          <p>Shopping Cart</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </div>
    );
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isUserActive && (
        <div>
          <Link
            to={`/profile/${profile?._id}/my-profile`}
            style={{ textDecoration: "none", color: "#52489C" }}
          >
            <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
          </Link>
          <Link
            to={`/profile/${profile?._id}/wish-list`}
            style={{ textDecoration: "none", color: "#52489C" }}
          >
            <MenuItem onClick={handleMenuClose}>Wish List</MenuItem>
          </Link>
          <Link
            to={`/profile/${profile?._id}/purchase-history`}
            style={{ textDecoration: "none", color: "#52489C" }}
          >
            <MenuItem onClick={handleMenuClose}>Purchase History</MenuItem>
          </Link>
          <Link
            to={`/profile/${profile?._id}/edit-profile`}
            style={{ textDecoration: "none", color: "#52489C" }}
          >
            <MenuItem onClick={handleMenuClose}>Edit Profile</MenuItem>
          </Link>
          <MenuItem onClick={handleLogout} style={{ color: "red" }}>
            Logout
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isUserActive && showProfileMobile()}
      {!isUserActive && (
        <div>
          <MenuItem style={{ color: "#52489C" }}>
            <Link to={"/signup"} style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </MenuItem>
          <MenuItem style={{ color: "#52489C" }}>
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              Log In
            </Link>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#52489C" }}>
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Build NooK
            </Typography>
          </Link>
          <MediaQuery maxWidth={1024}>
            <Sidenav />
          </MediaQuery>
          <Search style={{ marginRight: "auto" }}></Search>

          <Box />
          {isUserActive && showProfile()}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          <MediaQuery minWidth={900}>{showAuthBtns()}</MediaQuery>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
