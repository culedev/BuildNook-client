// STYLES
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Paper from "@mui/material/Paper";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import MediaQuery from 'react-responsive'
// HOOKS
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
// ROUTES
import { Link } from "react-router-dom";

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export default function CustomizedList() {
  const {user} = useContext(AuthContext)
  
const data = [
  { label: "EDIT PROFILE", path: `/profile/${user._id}/edit-profile`},
  { label: "PURCHASE HISTORY", path: `/profile/${user._id}/purchase-history`},
  { label: "WISH LIST", path: `/profile/${user._id}/wish-list`},
  { label: "MY REVIEWS", path: `/profile/${user._id}/my-reviews`},
];

  const [open, setOpen] = useState(true);
  return (
    <MediaQuery minWidth={1024}>
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "20px", alignItems: "center"}}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "white" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 256 }}>
          <FireNav component="nav" disablePadding>
            <Box
              sx={{
                bgcolor: open ? "white" : null,
                pb: open ? 2 : 0,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },                
                }}
                
              >
                <ListItemText
                  primary="MY PROFILE"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    mb: "2px",
                    color: "#52489C",
                  }}
                  secondary="EDIT PROFILE, PURCHASE HISTORY, WISH LIST, MY REVIEWS"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: open ? "rgba(0,0,0,0)" : "#52489C",
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: open ? "rotate(-180deg)" : "rotate(0)",
                    transition: "0.2s",
                    color: "#52489C",
                  }}
                />
              </ListItemButton>
              {open &&
                data.map((item) => (
                  <Link to={item.path} style={{textDecoration: "none"}}>
                    <ListItemButton
                      key={item.label}
                      sx={{
                        py: 0,
                        minHeight: 32,
                        color: "#52489C",
                      }}
                    >
                      <ListItemIcon sx={{ color: "inherit" }}>
                        <ArrowRightIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: "medium",
                          color: "#52489C",
                        }}
                      />
                    </ListItemButton>
                  </Link>
                ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
    </MediaQuery>
  );
}