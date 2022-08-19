import "./Navs.css"
import { Container } from "@mui/material";
import {Grid} from "@mui/material";
import {Box} from "@mui/material";
import {Link} from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Box
        px={{ xs: 2, sm: 2 }}
        py={{ xs: 2, sm: 2 }}
        bgcolor="#52489C"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <Link href="#" color="inherit">
                  Contact
                </Link>
              </Box>
              <Box>
                <Link href="#" color="inherit">
                  Support
                </Link>
              </Box>
              <Box>
                <Link href="#" color="inherit">
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Created by:</Box>
              <Box>
                <Link href="https://www.linkedin.com/in/ivan-culebra/" target={"_blank"} color="inherit">
                  Linkedin
                </Link>
              </Box>
              <Box>
                <Link href="https://github.com/culedev" target={"_blank"} color="inherit">
                  Github
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Messages</Box>
              <Box>
                <Link href="#" color="inherit">
                  Backup
                </Link>
              </Box>
              <Box>
                <Link href="#" color="inherit">
                  History
                </Link>
              </Box>
              <Box>
                <Link href="#" color="inherit">
                  Roll
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Build NooK &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
