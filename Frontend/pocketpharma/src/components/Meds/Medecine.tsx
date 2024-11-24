import { useState } from "react";
import ResponsiveDrawer from "../DrawerResponsiveness";
import AppNavbar from "../AppBar";
import {
  Container,
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Card,
  FormControl,
  TextField,
  InputLabel,
  Select,
  Typography,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Medicine {
  id: number;
  image: string;
  name: string;
  description: string;
  category: string;
}

const medicineData: Medicine[] = [
  {
    id: 1,
    name: "Aspirin",
    description: "Pain reliever",
    category: "Over-The-Counter Medicine",
    image: "https://example.com/aspirin.jpg",
  },
  {
    id: 2,
    name: "Ibuprofen",
    description: "Anti-inflammatory",
    category: "Over-The-Counter Medicine",
    image: "https://example.com/ibuprofen.jpg",
  },
  {
    id: 3,
    name: "Metformin",
    description: "Diabetes treatment",
    category: "Prescription Medicine",
    image: "https://example.com/metformin.jpg",
  },
  {
    id: 4,
    name: "Lipitor",
    description: "Cholesterol control",
    category: "Prescription Medicine",
    image: "https://example.com/lipitor.jpg",
  },
];

export default function Medicine() {
  const [filter, setFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredData = medicineData.filter((medicine) => {
    const matchesCategory = filter === "ALL" || medicine.category === filter;
    const matchesSearch = medicine.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <ResponsiveDrawer />
      <AppNavbar />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          margin: "8rem 0rem 3rem 21rem",
        }}
      >
        <Typography variant="h5" component="h6" sx={{}}>
          Medicine List
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            gap: "16px",
            mr: 5,
            // margin: "8rem 0rem 0 0rem",
          }}
        >
          <Box sx={{ display: "flex", gap: "16px" }}>
            <TextField
              variant="outlined"
              placeholder="Search Medecine..."
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>

          <Box>
            <FormControl sx={{ m: 1, minWidth: 130, backgroundColor: "white" }}>
              <InputLabel
                id="filter-label"
                sx={{
                  marginTop: "-0.3rem",
                }}
              >
                Filter
              </InputLabel>
              <Select
                labelId="filter-label"
                id="filter"
                value={filter}
                label="Filter"
                sx={{
                  height: "45px",
                  borderRadius: "10px",
                }}
                onChange={(event) => setFilter(event.target.value)}
              >
                <MenuItem value="ALL">ALL</MenuItem>
                <MenuItem value="Over-The-Counter Medicine">
                  Over-The-Counter Medicine
                </MenuItem>
                <MenuItem value="Prescription Medicine">
                  Prescription Medicine
                </MenuItem>
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
          marginLeft: "21rem",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            {filteredData.map((medicine) => (
              <Card
                key={medicine.id}
                sx={{
                  width: "300px",
                  boxShadow: "none",
                  borderRadius: "10px",
                  border: "1px solid #E9EAEC",
                }}
              >
                <Box
                  component="img"
                  src={medicine.image}
                  alt={medicine.name}
                  sx={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderTopLeftRadius: "4px",
                    borderTopRightRadius: "4px",
                  }}
                />
                <CardContent>
                  <Typography variant="h6">{medicine.name}</Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {medicine.description}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    // justifyContent: "space-between",
                    p: 2,
                  }}
                >
                  <Button size="small" variant="contained" color="primary">
                    Order
                  </Button>
                  <Button size="small" variant="outlined">
                    Learn More
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
          {filteredData.length === 0 && (
            <Typography>No results found</Typography>
          )}
        </Box>
      </Box>
    </>
  );
}
