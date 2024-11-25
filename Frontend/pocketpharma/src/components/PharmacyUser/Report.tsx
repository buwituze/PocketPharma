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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Report() {
  const handleChange = (value: string | null | undefined) => {
    console.log(value);
  };

  const [filter, setFilter] = useState<string>("");

  return (
    <>
      <ResponsiveDrawer />
      <AppNavbar />

      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            margin: "8rem 3rem 0 25rem",
          }}
        >
          <Box sx={{ display: "flex", gap: "6px" }}>
            <Box>
              <TextField
                variant="outlined"
                placeholder="Search Pharmacies..."
                onChange={(e) => handleChange(e.target.value)}
                size="small"
                sx={{
                  width: "500px",
                  height: "43px",
                  paddingTop: "4px",
                  backgroundColor: "white",
                  borderRadius: "100px",

                  "& .MuiOutlinedInput-root": {
                    "& input": { color: "black" },
                    "& input::placeholder": { color: "#A0AEC0" },
                    "& fieldset": {
                      borderColor: "#A0AEC0",
                      borderRadius: "100px",
                    },
                    "&:hover fieldset": { borderColor: "#A0AEC0" },
                    "&.Mui-focused fieldset": {
                      border: "1px solid #A0AEC0",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "black" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="outlined"
                        sx={{
                          width: "80px",
                          height: "30px",
                          color: "#030f54",
                          backgroundColor: "rgba(173, 216, 230, 0.3)",
                          float: "right",
                          position: "relative",
                          left: "0.5rem",
                          right: "1rem",
                          borderRadius: "20px",
                          borderColor: "transparent",
                          "&:hover": { borderColor: "transparent" },
                        }}
                      >
                        Search
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>

          <Box>
            <FormControl sx={{ m: 1, minWidth: 130, backgroundColor: "white" }}>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  marginTop: "-0.3rem",
                }}
              >
                Filter
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Filter"
                sx={{
                  height: "45px",
                  borderRadius: "10px",
                }}
                onChange={(event) => setFilter(event.target.value)}
              >
                <MenuItem value={10}>ALL</MenuItem>
                <MenuItem value={20}>Nearby</MenuItem>
                <MenuItem value={30}>My Insurance</MenuItem>
              </Select>
            </FormControl>
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
          marginLeft: "16rem",
        }}
      >
        <Typography variant="h5" component="h6" sx={{ marginTop: "2rem" }}>
          All Pharmacies.
        </Typography>
        <Container maxWidth="md">
          <Box sx={{ display: "flex", gap: "2rem" }}>
            <Card sx={{ width: "330px" }}>
              <CardContent>breh</CardContent>
              <Button size="small">Order</Button>
              <Button size="small">Learn More</Button>
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
}
