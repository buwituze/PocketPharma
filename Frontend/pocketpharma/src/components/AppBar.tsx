import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Popover,
  Link,
} from "@mui/material";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Icon } from "@iconify/react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./graphql/queries";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppNavbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsEl, setSettingsEl] = useState<null | HTMLElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [openPopover, setOpenPopover] = useState(false);
  const open = Boolean(anchorEl);
  const settingsOpen = Boolean(settingsEl);

  const { data } = useQuery(GET_USERS);
  const userName = data?.getUsers[0]?.firstName ?? "P";

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsOpen = (event: React.MouseEvent<any>) => {
    setSettingsEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsEl(null);
  };

  const handleNavigate = (role: string) => {
    switch (role) {
      case "patient":
        window.location.href = "/pharmacy";
        break;
      case "pharmacy":
        window.location.href = "/report";
        break;
      case "admin":
        window.location.href = "/dashboard";
        break;
      default:
        break;
    }
    handleSettingsClose();
  };

  const handlePopoverOpen = () => {
    setOpenPopover(true);
  };

  const handlePopoverClose = () => {
    setOpenPopover(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Upload Failed. Please review instructions.");
      return;
    }
    toast.success("Prescription uploaded successfully!");
    setOpenPopover(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/signIn";
  };

  return (
    <React.Fragment>
      <AppBar
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid #E9EAEC",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "76px",
          paddingLeft: "290px",
          paddingTop: "6px",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "60%",
            }}
          >
            <Box>
              <TextField
                variant="outlined"
                placeholder="Search Stock..."
                size="small"
                sx={{
                  width: "400px",
                  height: "43px",
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
                    "&.Mui-focused fieldset": { border: "1px solid #A0AEC0" },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "black" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "black",
                gap: { xs: 0.5, sm: 1.3, md: 3, lg: 3 },
              }}
            >
              <Icon
                icon="rivet-icons:settings"
                width="1.7rem"
                height="1.7rem"
                color="#525151"
                onClick={handleSettingsOpen}
                style={{ cursor: "pointer" }}
              />
              <Link href="/Cart">
                <Icon
                  icon="bx:cart"
                  width="1.9rem"
                  height="1.9rem"
                  style={{ color: "black" }}
                />
              </Link>
              <Icon
                icon="hugeicons:notification-01"
                width="1.7rem"
                height="1.7rem"
              />

              <Menu
                anchorEl={settingsEl}
                open={settingsOpen}
                onClose={handleSettingsClose}
                sx={{ mt: 1.3 }}
              >
                <MenuItem onClick={() => handleNavigate("patient")}>
                  Patient
                </MenuItem>
                <MenuItem onClick={() => handleNavigate("pharmacy")}>
                  Pharmacy
                </MenuItem>
                <MenuItem onClick={() => handleNavigate("admin")}>
                  Admin
                </MenuItem>
              </Menu>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                }}
                onClick={handleMenuOpen}
              >
                <Box
                  sx={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#003159",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {userName.charAt(0).toUpperCase()}
                </Box>
                <KeyboardArrowDownOutlinedIcon />
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                sx={{ mt: 1.3 }}
              >
                <MenuItem onClick={handlePopoverOpen}>
                  <Typography>Upload Prescription</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </Box>
          </Box>

          <Popover
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            sx={{ mt: 6.3, padding: "10px" }}
          >
            <Typography variant="body2" sx={{ marginBottom: "8px" }}>
              Upload your prescription. Both image files and documents are
              allowed.
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: "12px" }}>
              Max image size: 5MB.
            </Typography>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              style={{ marginBottom: "8px", display: "block" }}
            />
            <Button variant="outlined" onClick={handleUpload}>
              Upload
            </Button>
          </Popover>
        </Toolbar>
      </AppBar>

      {/* Toast Notifications */}
      <ToastContainer />
    </React.Fragment>
  );
}

export default AppNavbar;
