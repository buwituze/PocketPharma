import { useState } from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";
import AppNavbar from "./AppBarP";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Card,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import {
  FormControl,
  TextField,
  InputLabel,
  Select,
  Typography,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function MedsStock() {
  const [filter, setFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [medicines, setMedicines] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [detailsMedicine, setDetailsMedicine] = useState<any>(null);
  const [newMedicine, setNewMedicine] = useState<any>({
    name: "",
    category: "",
    type: "",
    image: "",
    sideEffects: "",
    description: "",
    amount: "",
  });

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "ALL" || medicine.type === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAddMedicine = () => {
    setMedicines((prev) => [...prev, { ...newMedicine }]);
    setNewMedicine({
      name: "",
      category: "",
      type: "",
      image: "",
      sideEffects: "",
      description: "",
      amount: "",
    });
    setIsModalOpen(false);
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
        <Typography variant="h5" component="h6" sx={{ fontSize: "30px" }}>
          Stock
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
          <TextField
            variant="outlined"
            placeholder="Search Medicine..."
            size="small"
            sx={{
              width: "300px",
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

          <FormControl sx={{ m: 1, minWidth: 130, backgroundColor: "white" }}>
            <InputLabel id="filter-label">Filter</InputLabel>
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
              <MenuItem value="Over-The-Counter">Over-The-Counter</MenuItem>
              <MenuItem value="Prescription">Prescription</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{ borderRadius: "10px", height: "45px" }}
            onClick={() => setIsModalOpen(true)}
          >
            Add Medicine
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2rem", ml: "21rem" }}>
        {filteredMedicines.map((medicine, index) => (
          <Card sx={{ width: "290px" }} key={index}>
            <CardMedia
              sx={{
                height: "130px",
                width: "100%",
                objectFit: "contain", // Ensures the image fits well within the card
              }}
              image={medicine.image || ""}
              title={medicine.name}
            />

            <CardContent>
              <Typography variant="h5">{medicine.name}</Typography>
              <Typography variant="body2">Amount: {medicine.amount}</Typography>
              <Typography variant="body2">
                Category: {medicine.category}
              </Typography>
              <Button
                size="small"
                onClick={() => {
                  setDetailsMedicine(medicine);
                  setIsDetailsModalOpen(true);
                }}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "500px",
            }}
          >
            <Typography variant="h6" textAlign="center">
              Add Medicine
            </Typography>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Grid container spacing={2}>
                {/* Row 1: Name and Amount */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Medicine Name"
                    value={newMedicine.name}
                    onChange={(e) =>
                      setNewMedicine({ ...newMedicine, name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Amount"
                    value={newMedicine.amount}
                    onChange={(e) =>
                      setNewMedicine({ ...newMedicine, amount: e.target.value })
                    }
                  />
                </Grid>

                {/* Row 2: Category and Type */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Category"
                    value={newMedicine.category}
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        category: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                      labelId="type-label"
                      value={newMedicine.type}
                      onChange={(e) =>
                        setNewMedicine({ ...newMedicine, type: e.target.value })
                      }
                    >
                      <MenuItem value="Over-The-Counter">
                        Over-The-Counter
                      </MenuItem>
                      <MenuItem value="Prescription">Prescription</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Row 3: Image URL and Upload Button */}
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    value={newMedicine.image}
                    onChange={(e) =>
                      setNewMedicine({ ...newMedicine, image: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    component="label"
                    sx={{ height: "100%" }}
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setNewMedicine({
                            ...newMedicine,
                            image: URL.createObjectURL(file),
                          });
                        }
                      }}
                    />
                  </Button>
                </Grid>

                {/* Row 4: Side Effects */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Side Effects"
                    value={newMedicine.sideEffects}
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        sideEffects: e.target.value,
                      })
                    }
                  />
                </Grid>

                {/* Row 5: Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={newMedicine.description}
                    multiline
                    rows={3}
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        description: e.target.value,
                      })
                    }
                  />
                </Grid>

                {/* Row 6: Cancel and Save Buttons */}
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleAddMedicine}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isDetailsModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
              borderRadius: "10px",
              width: "400px",
            }}
          >
            {detailsMedicine && (
              <>
                <Typography variant="h6" textAlign="center" gutterBottom>
                  {detailsMedicine.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Amount:</strong> {detailsMedicine.amount}
                </Typography>
                <Typography variant="body2">
                  <strong>Category:</strong> {detailsMedicine.category}
                </Typography>
                <Typography variant="body2">
                  <strong>Type:</strong> {detailsMedicine.type}
                </Typography>
                <CardMedia
                  sx={{
                    height: "130px",
                    width: "100%",
                    objectFit: "contain",
                    marginTop: "10px",
                  }}
                  image={detailsMedicine.image || ""}
                  title={detailsMedicine.name}
                />
                <Typography variant="body2" sx={{ marginTop: "10px" }}>
                  <strong>Side Effects:</strong> {detailsMedicine.sideEffects}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "10px" }}>
                  <strong>Description:</strong> {detailsMedicine.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => setIsDetailsModalOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setMedicines((prev) =>
                        prev.filter((medicine) => medicine !== detailsMedicine)
                      );
                      setIsDetailsModalOpen(false);
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
