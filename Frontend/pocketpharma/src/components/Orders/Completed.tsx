import React, { useState, useEffect } from "react";
import ResponsiveDrawer from "../DrawerResponsiveness";
import AppNavbar from "../AppBar";
import "../../index.css";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  Modal,
  Rating,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";

export default function CompletedOrder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [currentPharmacy, setCurrentPharmacy] = useState<string>("");
  const [completedOrders, setCompletedOrders] = useState<any[]>([]);

  useEffect(() => {
    const storedCompletedOrders = JSON.parse(
      localStorage.getItem("completedOrders") || "[]"
    );

    // Assign unique IDs to each order if not already present.
    const ordersWithIds = storedCompletedOrders.map(
      (order: any, index: number) => ({
        ...order,
        id: order.id || index + 1, // Use existing id or fallback to index-based id.
      })
    );

    setCompletedOrders(ordersWithIds);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleRateClick = (pharmacyName: string) => {
    setCurrentPharmacy(pharmacyName);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentRating(null);
    setReviewText("");
    setCurrentPharmacy("");
  };

  const handleSubmitReview = () => {
    console.log("Pharmacy:", currentPharmacy);
    console.log("Rating:", currentRating);
    console.log("Review:", reviewText);
    handleModalClose();
  };

  const handleDeleteOrder = (orderId: number) => {
    const updatedOrders = completedOrders.filter(
      (order) => order.id !== orderId
    );
    localStorage.setItem("completedOrders", JSON.stringify(updatedOrders));
    setCompletedOrders(updatedOrders);
  };

  const filteredRows = completedOrders.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(searchQuery)
  );

  const columns: GridColDef[] = [
    { field: "name", headerName: "Medicine Name", width: 200 },
    { field: "category", headerName: "Category", width: 160 },
    { field: "amount", headerName: "Amount", width: 130 },
    { field: "pharmacy", headerName: "Pharmacy", width: 190 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: () => (
        <Icon
          icon="material-symbols-check-circle-outline"
          color="green"
          width="1.5rem"
        />
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "70px",
              backgroundColor: "#00072d",
              color: "white",
              boxShadow: "none",
              height: "30px",
              mt: 1,
            }}
            onClick={() => handleRateClick(params.row.pharmacy)}
          >
            Rate
          </Button>
          {/* <span title="0798426485">
            <Icon
              icon="fluent:call-20-regular"
              width="1.5rem"
              color="blue"
              style={{ cursor: "pointer" }}
            />
          </span> */}
          <Icon
            icon="material-symbols-light:delete-outline"
            width="1.5rem"
            color="red"
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteOrder(params.row.id)}
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <ResponsiveDrawer />
      <AppNavbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          ml: "16rem",
          mt: "7rem",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Completed Orders
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          sx={{
            width: "300px",
            ml: 5,
            backgroundColor: "white",
            borderRadius: "20px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "black" }} />
              </InputAdornment>
            ),
          }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Paper sx={{ height: "auto", width: "95%", ml: "2rem" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ height: "20px" }}>
            Rate {currentPharmacy}
          </Typography>
          <Rating
            value={currentRating}
            onChange={(_, newValue) => setCurrentRating(newValue)}
            precision={0.5}
            sx={{ mt: 2 }}
          />
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              onClick={handleModalClose}
              sx={{ mr: 1 }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
