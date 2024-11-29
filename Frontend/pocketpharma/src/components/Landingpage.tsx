import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import { Card, CardContent, TextField } from "@mui/material";
import MedicationIcon from "@mui/icons-material/Medication";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import Navbar from "./Navbar";
import Footer from "./footer";

export default function Landingpage() {
  return (
    <div>
      <Navbar />
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            padding: "20px",
            margin: "5rem 3rem 0 10rem",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              component="h3"
              sx={{ marginTop: "8rem", marginBottom: "1rem" }}
            >
              Welcome To
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{ marginBottom: "2rem", color: "orange" }}
            >
              PocketPharma
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ marginBottom: "3rem" }}
            >
              Your go-to platform for easy access to pharmaceutical information
              and services, designed to empower your health journey.
            </Typography>
            <Box>
              <Link to="/signIn">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#030f54", marginBottom: "1rem" }}
                >
                  Get Started
                </Button>
              </Link>
            </Box>
          </Box>
          <Box>
            <img
              src="/telepharmacyrl-removebg-preview.png"
              alt=""
              style={{ width: "650px", height: "530px" }}
            />
          </Box>
        </Box>
        <Container id="about" maxWidth="md" sx={{ margin: "auto" }}>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              color: "#030f54",
              textAlign: "center",
              margin: "3rem 0 4rem 0",
            }}
          >
            About
          </Typography>
          <Box sx={{ display: "flex", gap: "60px", marginBottom: "5rem" }}>
            <img
              src="/OnlineMeds-removebg-preview.png"
              alt="About"
              style={{ width: "300px", height: "170px" }}
            />
            <Box>
              <Typography
                variant="h5"
                component="h5"
                sx={{ marginBottom: "1rem" }}
              >
                What is Pocket Pharma?
              </Typography>
              <Typography variant="body1" component="p">
                PocketPharma is a user-friendly platform designed to provide
                quick and easy access to pharmaceutical information and
                services. Whether you need to search for medications, learn
                about their side effects, or find nearby pharmacies,
                PocketPharma empowers you to manage your health confidently and
                conveniently.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "60px" }}>
            <Box>
              <Typography
                variant="h5"
                component="h5"
                sx={{ marginBottom: "1rem" }}
              >
                Our Mission
              </Typography>
              <Typography variant="body1" component="p">
                Our mission is to bridge the gap between people and essential
                pharmaceutical resources by offering accessible, reliable, and
                accurate information. We aim to promote better health outcomes
                through technology, helping individuals make informed decisions
                about their well-being.
              </Typography>
            </Box>
            <img
              src="/project-planning.png"
              alt="Mission"
              style={{ width: "300px", height: "200px" }}
            />
          </Box>
        </Container>
        <Typography
          variant="h3"
          component="h3"
          sx={{
            color: "#030f54",
            textAlign: "center",
            margin: "3rem 0 3rem 0",
          }}
        >
          Services
        </Typography>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Card sx={{ maxWidth: 280 }}>
            <CardContent>
              <MedicationIcon
                sx={{ fontSize: 40, paddingBottom: "0.4rem", color: "orange" }}
              />
              <Typography variant="h5" component="h5" sx={{ color: "#030f54" }}>
                Order Medication
              </Typography>
              <br />
              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 1.5,
                  paddingBottom: "1.3rem",
                }}
              >
                Get you medecine easily from anywhere, anytime.
              </Typography>
            </CardContent>
          </Card>
          {/* </Grid> */}
          {/* <Grid item xs={5} md={4} lg={3}> */}
          <Card sx={{ maxWidth: 280 }}>
            <CardContent>
              <LocalPharmacyIcon
                sx={{ fontSize: 40, paddingBottom: "0.4rem", color: "orange" }}
              />
              <Typography variant="h5" component="h5" sx={{ color: "#030f54" }}>
                Heal Affordably!
              </Typography>
              <br />
              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 1.5,
                  paddingBottom: "1.3rem",
                }}
              >
                Visit a pharmacy that aligns with your insurance.
              </Typography>
            </CardContent>
          </Card>
          {/* </Grid> */}
          {/* <Grid item xs={5} md={4} lg={3}> */}
          <Card sx={{ maxWidth: 280 }}>
            <CardContent>
              <ForkRightIcon
                sx={{
                  fontSize: 40,
                  paddingBottom: "0.4rem",
                  color: "orange",
                }}
              />
              <Typography variant="h5" component="h5" sx={{ color: "#030f54" }}>
                Near You!
              </Typography>
              <br />
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                Get your medeicine within minutes! Order from a pharmacy nearest
                to you.
              </Typography>
            </CardContent>
          </Card>
          {/* </Grid>
            </Grid> */}
        </Container>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "7rem",
            marginBottom: "7rem",
            gap: "50px",
          }}
        >
          <Typography variant="h3" component="h3" sx={{ color: "#030f54" }}>
            Contact Us
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "30px",
              border: "1px solid #E9EAEC",
              borderRadius: "20px",
              width: "50%",
              boxSizing: "border-box",
              padding: "40px",
            }}
          >
            <Typography
              variant="h6"
              component="p"
              sx={{ float: "left", fontSize: "17px", marginLeft: "-10rem" }}
            >
              Got an Inquiry? <br />
              <span style={{ color: "lightgray" }}>
                Please, Fill out the form below
              </span>
            </Typography>
            <TextField
              label=" Full Name"
              type="name"
              variant="outlined"
              size="small"
              sx={{ width: "90%" }}
            />
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              size="small"
              sx={{ width: "90%" }}
            />
            <TextField
              type="text"
              label="Subject"
              variant="outlined"
              size="small"
              sx={{ width: "90%" }}
            />
            <TextField
              type="text"
              label="Message/Inquiry"
              variant="outlined"
              size="small"
              sx={{ width: "90%" }}
            />
            <Button
              variant="contained"
              sx={{ width: "45%", backgroundColor: "orange" }}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </div>
  );
}
