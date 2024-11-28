import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import ResponsiveDrawer from "../DrawerResponsiveness";
import AppNavbar from "../AppBar";
import {
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GET_MEDICINES = gql`
  query GetMedicines {
    getMedicines {
      id
      name
      description
      category
      picture
      type
      amount
      sideEffects
    }
  }
`;

interface Medicine {
  id: string;
  name: string;
  description: string;
  category: string;
  picture: string | null;
  type: string;
  amount: number;
  sideEffects: string;
}

export default function Medicine() {
  const [filter, setFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const { data, loading, error } = useQuery(GET_MEDICINES);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  const medicines: Medicine[] = data.getMedicines;

  const filteredData = medicines.filter((medicine) => {
    const matchesCategory =
      filter === "ALL" ||
      (filter === "OTC" && medicine.type === "OTC") ||
      (filter === "PRESCRIPTION" && medicine.type === "PRESCRIPTION");
    const matchesSearch = medicine.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLearnMore = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMedicine(null);
  };

  const handleAddToCart = (medicine: Medicine) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, medicine];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Product added to cart!");
  };

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
        <Typography variant="h5" component="h6">
          Medicine List
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            gap: "16px",
            mr: 5,
          }}
        >
          <Box sx={{ display: "flex", gap: "16px" }}>
            <TextField
              variant="outlined"
              placeholder="Search Medicine..."
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
                <MenuItem value="OTC">Over-The-Counter Medicine</MenuItem>
                <MenuItem value="PRESCRIPTION">Prescription Medicine</MenuItem>
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
                  height: "340px",
                  boxShadow: "none",
                  borderRadius: "10px",
                  border: "1px solid #E9EAEC",
                }}
              >
                <Box
                  component="img"
                  src={medicine.picture ?? "https://via.placeholder.com/150"}
                  alt={medicine.name}
                  sx={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderTopLeftRadius: "4px",
                    borderTopRightRadius: "4px",
                  }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://media.istockphoto.com/id/1220591958/vector/medicine.jpg?s=612x612&w=0&k=20&c=5zy2UM6JexVPpiOBOwnhGLkCyxwy_pal6-7-6N22TZU=";
                  }}
                />
                <CardContent>
                  <Typography variant="h6">{medicine.name}</Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {medicine.description}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Amount: {medicine.amount} RWF
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    // mt: 2,
                    // mb: 2,
                    display: "flex",
                    p: 2,
                    justifyContent: "space-between",
                    alignItems: "center",
                    // position: "fixed",
                    // bottom: "-13px",
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleLearnMore(medicine)}
                    sx={{ borderRadius: "10px", height: "35px" }}
                  >
                    Learn More
                  </Button>
                  <IconButton
                    color="success"
                    onClick={() => handleAddToCart(medicine)}
                    sx={{ mt: -0.5 }}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Box>
          {filteredData.length === 0 && (
            <Typography>No results found</Typography>
          )}
        </Box>
      </Box>

      {/* Learn More Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedMedicine?.name}</DialogTitle>
        <DialogContent>
          <Box
            component="img"
            src={selectedMedicine?.picture ?? "https://via.placeholder.com/150"}
            alt={selectedMedicine?.name}
            sx={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              mb: 2,
            }}
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/150";
            }}
          />
          <DialogContentText>{selectedMedicine?.description}</DialogContentText>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Category: {selectedMedicine?.category}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Side Effects: {selectedMedicine?.sideEffects}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
            Amount: ${selectedMedicine?.amount}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </>
  );
}
