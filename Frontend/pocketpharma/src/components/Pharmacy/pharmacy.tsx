import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  CardContent,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useQuery } from "@apollo/client";
import { GET_USERS, GET_MEDICINE } from "../graphql/queries";
import AppBar from "../AppBar";
import ResponsiveDrawer from "../DrawerResponsiveness";

export default function Pharmacy() {
  const [filter, setFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userInsurance, setUserInsurance] = useState<string[]>([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState<any>(null);
  const [openLearnMore, setOpenLearnMore] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);

  const { data: usersData } = useQuery(GET_USERS);
  const { data: medicinesData } = useQuery(GET_MEDICINE);

  useEffect(() => {
    // Hardcoded insurance data (famous in Rwanda)
    setUserInsurance([
      "Radiant Insurance",
      "Sonarwa",
      "Soras",
      "Sanlam",
      "MediPlan",
      "Britam",
      "UAP",
      "Prime Insurance",
      "RADIANT",
      "Cogebanque Insurance",
    ]);
  }, []);

  const handleLearnMore = (pharmacy: any) => {
    setSelectedPharmacy(pharmacy);
    setOpenLearnMore(true);
  };

  const handleOrder = () => {
    setOpenOrder(true);
  };

  const closeDialog = () => {
    setOpenLearnMore(false);
    setOpenOrder(false);
  };

  const filteredPharmacies = (usersData?.getUsers || []).filter((user: any) => {
    if (user.role !== "PHARMACY") return false;
    const matchesSearch = `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return (
      matchesSearch &&
      (filter === "ALL" ||
        filter === "Nearby" ||
        filter === "Insurance Aligned")
    );
  });

  return (
    <>
      <ResponsiveDrawer />
      <AppBar />
      <Box sx={{ marginLeft: "18rem", padding: "2rem", mt: 10 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Typography variant="h5">Pharmacies List</Typography>
          <Box sx={{ display: "flex", gap: "16px" }}>
            <TextField
              placeholder="Search Pharmacies..."
              size="small"
              sx={{
                width: "300px",
                backgroundColor: "white",
                borderRadius: "100px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderRadius: "100px" },
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

            <FormControl sx={{ minWidth: 130, backgroundColor: "white" }}>
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                sx={{
                  borderRadius: "10px",
                  color: "black",
                  height: "45px",
                }}
                label="Filter"
              >
                <MenuItem value="ALL">ALL</MenuItem>
                <MenuItem value="Nearby">Nearby</MenuItem>
                <MenuItem value="Insurance Aligned">Insurance Aligned</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
          {filteredPharmacies.map((pharmacy: any) => (
            <Card key={pharmacy.id} sx={{ width: "300px" }}>
              <Box
                component="img"
                src="https://img.freepik.com/premium-vector/pharmacy-building-line-medicine-concept-illustration_501173-512.jpg"
                alt={pharmacy.firstName}
                sx={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography variant="h6">
                  {pharmacy.firstName} {pharmacy.lastName}
                </Typography>
                <Typography variant="body2">123 Main St, Kigali</Typography>
                <Typography variant="body2">Accepts 10+ Insurances</Typography>
              </CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
              >
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleOrder()}
                >
                  Order
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleLearnMore(pharmacy)}
                >
                  Learn More
                </Button>
              </Box>
            </Card>
          ))}
        </Box>

        {/* Learn More Dialog */}
        <Dialog open={openLearnMore} onClose={closeDialog}>
          <DialogTitle>About {selectedPharmacy?.firstName}</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              High-quality medicines and great service.
            </Typography>
            <Typography variant="body2">Insurances Accepted:</Typography>
            <List>
              {userInsurance.map((insurance) => (
                <ListItem key={insurance}>
                  <ListItemText primary={insurance} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>

        {/* Order Medicines Dialog */}
        <Dialog open={openOrder} onClose={closeDialog}>
          <DialogTitle>Available Medicines</DialogTitle>
          <DialogContent>
            <List>
              {medicinesData?.getMedicine.map((medicine: any) => (
                <ListItem key={medicine.id}>
                  <ListItemText
                    primary={medicine.name}
                    secondary={medicine.category}
                  />
                  <IconButton>
                    <ShoppingCartIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
