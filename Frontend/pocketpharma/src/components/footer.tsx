import { Box, Typography, Link, IconButton, Divider } from "@mui/material";
import { Facebook, Twitter, Instagram, Email } from "@mui/icons-material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      width: "95%",
      backgroundColor: "black",
      color: "white",
      padding: "1rem 2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
    }}
  >
    <Box
      sx={{ display: "flex", gap: "1rem", height: "12px", marginLeft: "70%" }}
    >
      <IconButton href="#" target="_blank" color="inherit">
        <Facebook />
      </IconButton>
      <IconButton href="#" target="_blank" color="inherit">
        <Twitter />
      </IconButton>
      <IconButton href="#" target="_blank" color="inherit">
        <Instagram />
      </IconButton>
      <IconButton href="mailto:support@pocketpharma.com" color="inherit">
        <Email />
      </IconButton>
    </Box>
    <Divider
      sx={{ width: "98%", borderColor: "#cccc", margin: "0 4rem 0 0" }}
    ></Divider>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "1200px",
        flexWrap: "wrap",
        gap: "2rem",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <img
          src="/footer-logo.png"
          alt="PocketPharma Logo"
          style={{ width: "100px" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "13px",
        }}
      >
        <Link href="#" color="inherit" underline="hover">
          Home
        </Link>
        <Link href="#about" color="inherit" underline="hover">
          About
        </Link>
        <Link href="#services" color="inherit" underline="hover">
          Services
        </Link>
        <Link href="#contact" color="inherit" underline="hover">
          Contact
        </Link>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "13px",
        }}
      >
        <Typography variant="body2">Phone: +250 123 456 789</Typography>
        <Typography variant="body2">Email: support@pocketpharma.com</Typography>
        <Link
          href="#learn-more"
          color="inherit"
          underline="hover"
          sx={{ marginTop: "0.5rem" }}
        >
          Learn More
        </Link>
      </Box>
    </Box>
  </Box>
);

export default Footer;
