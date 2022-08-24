// STYLES
import "./Navs.css";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Link } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import HelpIcon from '@mui/icons-material/Help';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import BackupIcon from '@mui/icons-material/Backup';
import HistoryIcon from '@mui/icons-material/History';

const Footer = () => {
  const footerEl = {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
  };

  return (
    <footer>
      <Box
        px={{ xs: 1, sm: 1 }}
        py={{ xs: 1, sm: 1 }}
        bgcolor="#52489C"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <Link href="#" color="inherit" style={footerEl}>
                <ContactPageIcon />
                  Contact
                </Link>
              </Box>
              <Box>
                <Link href="#" color="inherit" style={footerEl}>
                <HelpIcon />
                  Support
                </Link>
              </Box>
              <Box>
                <Link href="#" color="inherit" style={footerEl}>
                <PrivacyTipIcon />
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>About me</Box>
              <Box>
                <Link
                  href="https://www.linkedin.com/in/ivan-culebra/"
                  target={"_blank"}
                  color="inherit"
                  style={footerEl}
                >
                  <LinkedInIcon /> Linkedin
                </Link>
              </Box>
              <Box>
                <Link
                  href="https://github.com/culedev"
                  target={"_blank"}
                  color="inherit"
                  style={footerEl}
                >
                  <GitHubIcon />
                  Github
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Messages</Box>
              <Box>
                <Link href="#" color="inherit" style={footerEl}>
                <BackupIcon />
                  Backup
                </Link>
              </Box>
              <Box>
                <Link href="#" color="inherit" style={footerEl}>
                <HistoryIcon />
                  History
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Build NooK &copy; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
