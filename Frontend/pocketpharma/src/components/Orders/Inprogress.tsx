import React, { useState } from "react";
import ResponsiveDrawer from "../DrawerResponsiveness";
import AppNavbar from "../AppBar";
import "../../index.css";
import {
  Box,
  Button,
  InputAdornment,
  Popover,
  Typography,
  TextField,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";

const rows = [
  {
    id: 1,
    pharmacy: "Snow Pharmacy",
    medecineName: "Painkiller",
    category: "Analgesics",
    amount: "500 rwf",
    phone: "123-456-789",
  },
  {
    id: 2,
    pharmacy: "Lannister Pharmacy",
    medecineName: "Cough Syrup",
    category: "Respiratory",
    amount: "200 rwf",
    phone: "987-654-321",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function InprogressOrder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [phone, setPhone] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCallClick = (event: React.MouseEvent<unknown>, phone: string) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setPhone(phone);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setPhone("");
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "pharmacy", headerName: "Pharmacy", type: "string", width: 200 },
    { field: "medecineName", headerName: "Medicine", width: 170 },
    { field: "category", headerName: "Category", width: 190 },
    { field: "amount", headerName: "Amount", type: "string", width: 170 },
    {
      field: "action",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "1rem",
          }}
        >
          <Icon
            icon="fluent:call-20-regular"
            width="1.5rem"
            height="1.5rem"
            color="blue"
            onClick={(event) => handleCallClick(event, params.row.phone)}
            style={{ cursor: "pointer" }}
          />
          <Icon
            icon="tabler:dots"
            width="1.5rem"
            height="1.5rem"
            color="gray"
          />
        </div>
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
          marginLeft: "16rem",
          mt: "4rem",
        }}
      >
        <Typography
          variant="h5"
          component="h6"
          sx={{ marginTop: "2rem", textAlign: "center" }}
        >
          In-Progress Orders
        </Typography>

        <Box sx={{ display: "flex", gap: "16px" }}>
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
            sx={{ border: 0 }}
          />
        </Paper>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography sx={{ padding: "1rem" }}>{phone}</Typography>
        </Popover>
      </Box>
    </>
  );
}
