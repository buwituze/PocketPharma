import React from "react";
import { useState } from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";
import AppNavbar from "./AppBarP";
import "../../index.css";
import {
  Container,
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Card,
} from "@mui/material";
import {
  FormControl,
  TextField,
  InputLabel,
  Select,
  Typography,
  CardContent,
  CardMedia,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function MedsStock() {
  const handleChange = (value: string | null | undefined) => {
    console.log(value);
  };

  const [filter, setFilter] = useState<string>("");

  return (
    <>
      <ResponsiveDrawer />
      <AppNavbar />

      <Box>
        <Typography
          variant="h5"
          component="h6"
          sx={{ mt: "6rem", ml: "12rem", textAlign: "center" }}
        >
          Over-the-Counter Drugs Orders
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            margin: "1rem 3rem 2rem 27rem",
          }}
        >
          <Box>
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              sx={{
                width: "300px",
                height: "43px",
                paddingTop: "4px",
                ml: 5,
                backgroundColor: "white",
                borderRadius: "100px",
                "& .MuiOutlinedInput-root": {
                  "& input": { color: "black" },
                  "& input::placeholder": { color: "#A0AEC0" },
                  "& fieldset": {
                    borderColor: "#A0AEC0",
                    borderRadius: "100px",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "black" }} />
                  </InputAdornment>
                ),
              }}
              // value={searchQuery}
              // onChange={handleSearchChange}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          ml: "19rem",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            <Card sx={{ width: "290px" }}>
              <CardMedia sx={{ height: 130 }} image="" title="" />
              <CardContent>
                <Typography variant="h5" component="h5">
                  Breh
                </Typography>
                <Typography variant="body1" component="p">
                  Des
                </Typography>
              </CardContent>
              <Button size="small">Order</Button>
              <Button size="small">Learn More</Button>
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
}
