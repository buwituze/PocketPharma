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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Icon } from "@iconify/react";
import { useState, useMemo } from "react";

export default function CompletedOrder() {
  const initialColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "medecineName", headerName: "Medicine", width: 160 },
    { field: "category", headerName: "Category", width: 160 },
    {
      field: "amount",
      headerName: "Amount",
      type: "string",
      width: 130,
    },
    {
      field: "pharmacy",
      headerName: "Pharmacy",
      type: "string",
      width: 190,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 190,
      renderCell: (params: any) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "70px",
                height: "30px",
                mr: "1rem",
                backgroundColor: "#00072d",
                color: "white",
                boxShadow: "none",
              }}
              onClick={() => handleRateClick(params.row.pharmacy)}
            >
              Rate
            </Button>

            <Icon
              icon="fluent:call-20-regular"
              width="1.5rem"
              height="1.5rem"
              color="blue"
            />
            <Icon
              icon="material-symbols-light:delete-outline"
              width="1.5rem"
              height="1.5rem"
              color="red"
            />
          </div>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      medecineName: "Snow",
      category: "Jon",
      amount: "500 rwf",
      pharmacy: "Snow Pharmacy",
    },
    {
      id: 2,
      medecineName: "Lannister",
      category: "Cersei",
      amount: "200 rwf",
      pharmacy: "Lannister Pharmacy",
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const handleRateClick = (pharmacyName: string) => {
    setCurrentPharmacy(pharmacyName);
    setModalOpen(true);
  };
  const [_, setSelectedRows] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [currentPharmacy, setCurrentPharmacy] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredRows = rows.filter(
    (row) =>
      row.medecineName.toLowerCase().includes(searchQuery) ||
      row.category.toLowerCase().includes(searchQuery) ||
      row.amount.toLowerCase().includes(searchQuery) ||
      row.pharmacy.toLowerCase().includes(searchQuery)
  );

  const columns = useMemo(() => {
    const columnsWithActions = [...initialColumns];
    columnsWithActions.forEach((col) => {
      if (col.field === "action") {
        col.renderCell = (params: any) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "70px",
                  height: "30px",
                  mr: "1rem",
                  backgroundColor: "#00072d",
                  color: "white",
                  boxShadow: "none",
                }}
                onClick={() => handleRateClick(params.row.pharmacy)}
              >
                Rate
              </Button>

              <Icon
                icon="fluent:call-20-regular"
                width="1.5rem"
                height="1.5rem"
                color="blue"
              />
              <Icon
                icon="material-symbols-light:delete-outline"
                width="1.5rem"
                height="1.5rem"
                color="red"
              />
            </div>
          );
        };
      }
    });
    return columnsWithActions;
  }, []);

  const handleSelectionChange = (newSelection: any) => {
    setSelectedRows(newSelection);
  };

  return (
    <>
      <ResponsiveDrawer />
      <AppNavbar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          marginLeft: "16rem",
          mt: "4rem",
        }}
      >
        <Typography
          variant="h5"
          component="h6"
          sx={{ marginTop: "2rem", textAlign: "center" }}
        >
          Completed Orders
        </Typography>

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
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>

        <Paper sx={{ height: "auto", width: "95%", ml: "2rem" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={(newSelection: any) =>
              handleSelectionChange(newSelection)
            }
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="rate-and-review"
        aria-describedby="rate-and-review-description"
      >
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
          <Typography id="rate-and-review" variant="h6" component="h2">
            Rate {currentPharmacy}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Rating
              value={currentRating}
              onChange={(_, newValue) => setCurrentRating(newValue)}
              precision={0.5}
            />
          </Box>
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
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
