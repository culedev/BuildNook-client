import * as React from "react";
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
import { Link } from "react-router-dom";

const data = [
  { icon: <ArrowRightIcon />, label: "POWER SUPPLY", path: "/products/power-supply" },
  { icon: <ArrowRightIcon />, label: "MOTHERBOARD", path: "/products/motherboard"  },
  { icon: <ArrowRightIcon />, label: "HDD", path: "/products/HDD"  },
  { icon: <ArrowRightIcon />, label: "SSD", path: "/products/SSD"  },
  { icon: <ArrowRightIcon />, label: "GRAPHIC CARDS", path: "/products/graphic-cards"  },
  { icon: <ArrowRightIcon />, label: "RAM", path: "/products/ram"  },
  { icon: <ArrowRightIcon />, label: "PC TOWER", path: "/products/pc-tower"  },
  { icon: <ArrowRightIcon />, label: "FAN", path: "/products/fan"  },
  { icon: <ArrowRightIcon />, label: "LIQUID REFRIGERATION", path: "/products/liquid-refrigeration"  },
];

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
  const [open, setOpen] = React.useState(true);
  return (
    <MediaQuery minWidth={730}>
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
            background: { paper: "#52489C" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 256 }}>
          <FireNav component="nav" disablePadding>
            <Box
              sx={{
                bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
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
                  primary="CATEGORIES"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    mb: "2px",
                  }}
                  secondary="POWER SUPPLY, MOTHERBOARD, HDD, SSD, GRAPHIC CARDS, RAM, PC TOWER, FAN, LIQUID REFRIGERATION"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: open ? "rotate(-180deg)" : "rotate(0)",
                    transition: "0.2s",
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
                        color: "rgba(255,255,255,.8)",
                      }}
                    >
                      <ListItemIcon sx={{ color: "inherit" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: "medium",
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
