// STYLES
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import MediaQuery from "react-responsive";
// COMPONENTS
import Sidenav from "./Sidenav";
// HOOKS
import { useContext, useEffect, useState } from "react";
// ROUTES
import { Link, useNavigate } from "react-router-dom";
// CONTEXT
import { AuthContext } from "../../context/auth.context";
import { ProfileContext } from "../../context/profile.context";
import SimpleBackdrop from "../SimpleBackdrop";

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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const { user, isUserActive, authenticateUser } = useContext(AuthContext);
  const { profile, getProfile, isFetchingShoppingCart } =
    useContext(ProfileContext);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    getProfile();
    authenticateUser();
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
    if (isFetchingShoppingCart) {
      return <SimpleBackdrop />;
    } else {
      return (
        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
        >
          <Badge badgeContent={profile.shoppingCart.length} color="error">
            <ShoppingCartIcon />
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
            to={`/profile/${user._id}/my-profile`}
            style={{ textDecoration: "none", color: "#52489C" }}
          >
            <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
          </Link>
          <Link
            to={`/profile/${user._id}/wish-list`}
            style={{ textDecoration: "none", color: "#52489C" }}
          >
            <MenuItem onClick={handleMenuClose}>Wish List</MenuItem>
          </Link>
          <Link
            to={`/profile/${user._id}/purchase-history`}
            style={{ textDecoration: "none", color: "#52489C" }}
          >
            <MenuItem onClick={handleMenuClose}>Purchase History</MenuItem>
          </Link>
          <Link
            to={`/profile/${user._id}/my-reviews`}
            style={{ textDecoration: "none", color: "#52489C" }}
          >
            <MenuItem onClick={handleMenuClose}>My Reviews</MenuItem>
          </Link>
          <Link
            to={`/profile/${user._id}/edit-profile`}
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
          <MediaQuery maxWidth={730}>
            <Sidenav />
          </MediaQuery>
          <Search style={{ marginRight: "auto" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

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
          {showAuthBtns()}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}