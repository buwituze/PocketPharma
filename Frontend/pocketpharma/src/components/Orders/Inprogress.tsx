import React, { useState, useEffect } from "react";
import ResponsiveDrawer from "../DrawerResponsiveness";
import AppNavbar from "../AppBar";
import "../../index.css";
import {
  Box,
  InputAdornment,
  Popover,
  Typography,
  TextField,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";

export default function InprogressOrder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [openConfirmPopover, setOpenConfirmPopover] = useState(false);

  useEffect(() => {
    const storedOrders = JSON.parse(
      localStorage.getItem("checkedOutItems") || "[]"
    );

    const initializedOrders = storedOrders.map((order: any) => ({
      ...order,
      pharmacy: "Belle Vie Pharmacy LTD",
      status: "Pending",
    }));

    setOrders(initializedOrders);

    setTimeout(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.status === "Pending"
            ? { ...order, status: "Pending to Approval" }
            : order
        )
      );
    }, 4000);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCallClick = (
    event: React.MouseEvent<unknown>,
    phone: "0798564453"
  ) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setPhone(phone);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setPhone("");
  };

  const handleRowSelection = (selectedRows: any) => {
    const selectedRow = orders.find((order) => order.id === selectedRows[0]);
    setSelectedOrder(selectedRow);
    setOpenConfirmPopover(true);
  };

  const handleConfirmDelivery = () => {
    const updatedOrders = orders.filter(
      (order) => order.id !== selectedOrder?.id
    );
    const completedOrder = { ...selectedOrder, status: "Completed" };

    // Update local storage
    localStorage.setItem("checkedOutItems", JSON.stringify(updatedOrders));
    localStorage.setItem(
      "completedOrders",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("completedOrders") || "[]"),
        completedOrder,
      ])
    );

    setOrders(updatedOrders);
    setOpenConfirmPopover(false);
  };

  const handleCancelDelivery = () => {
    setOpenConfirmPopover(false);
  };

  const filteredRows = orders.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: "name", headerName: "Medicine Name", width: 230 },
    { field: "pharmacy", headerName: "Pharmacy", width: 270 },
    { field: "amount", headerName: "Amount", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const status = params.row.status;
        return status === "Pending" ? (
          <Icon
            icon="tabler:dots-circle-horizontal"
            color="yellow"
            width="1.5rem"
            style={{ marginLeft: "1.7rem" }}
          />
        ) : (
          <Icon
            icon="tabler:dots-circle-horizontal"
            color="green"
            width="1.5rem"
            style={{ marginLeft: "1.7rem" }}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Icon
          icon="fluent:call-20-regular"
          width="1.5rem"
          color="blue"
          onMouseEnter={(event) => handleCallClick(event, params.row.phone)}
          style={{ cursor: "pointer", marginLeft: "1.7rem" }}
        />
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
          In-Progress Orders
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
            onRowSelectionModelChange={(newSelection: any) =>
              handleRowSelection(newSelection)
            }
          />
        </Paper>

        {openConfirmPopover && (
          <Popover open={openConfirmPopover} onClose={handleCancelDelivery}>
            <Box sx={{ padding: "1rem" }}>
              <Typography variant="h6">Mark as delivered?</Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
              >
                <button onClick={handleCancelDelivery}>Cancel</button>
                <button onClick={handleConfirmDelivery}>Yes</button>
              </Box>
            </Box>
          </Popover>
        )}

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
        >
          <Typography sx={{ padding: "1rem" }}>{phone}</Typography>
        </Popover>
      </Box>
    </>
  );
}
