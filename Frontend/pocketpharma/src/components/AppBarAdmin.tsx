import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Icon } from "@iconify/react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./graphql/queries";

function AppNavAdmin() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsEl, setSettingsEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const settingsOpen = Boolean(settingsEl);

  const { data } = useQuery(GET_USERS);
  const userName = data?.getUsers[0]?.firstName ?? "User";

  // Handlers for user menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handlers for settings menu
  const handleSettingsOpen = (event: React.MouseEvent<any>) => {
    setSettingsEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/signIn";
  };

  const handleNavigate = (role: string) => {
    const routes: { [key: string]: string } = {
      Patient: "/pharmacy",
      Pharmacy: "/report",
      Admin: "/dashboard",
    };
    window.location.href = routes[role];
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
          paddingLeft: "40px",
          paddingTop: "6px",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                paddingTop: "5px",
              }}
            >
              <img
                src="/pocketpharmalogo-removebg-preview.png"
                alt="Logo"
                style={{ height: "75px", width: "200px" }}
              />
            </Box>
            {/* Search Bar */}
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              sx={{
                width: { xs: "200px", sm: "400px" },
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

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: "black",
              }}
            >
              {/* Settings Icon */}
              <Icon
                icon="rivet-icons:settings"
                width="1.7rem"
                height="1.7rem"
                color="#525151"
                onClick={handleSettingsOpen}
                style={{ cursor: "pointer" }}
              />

              <Icon
                icon="hugeicons:notification-01"
                width="1.7rem"
                height="1.7rem"
              />

              {/* Settings Popover */}
              <Menu
                anchorEl={settingsEl}
                open={settingsOpen}
                onClose={handleSettingsClose}
                sx={{ mt: 1.3 }}
              >
                {["Patient", "Pharmacy", "Admin"].map((role) => (
                  <MenuItem
                    key={role}
                    onClick={() => {
                      handleNavigate(role);
                      handleSettingsClose();
                    }}
                  >
                    <Typography>{role}</Typography>
                  </MenuItem>
                ))}
              </Menu>

              {/* User Avatar and Menu */}
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
                <MenuItem onClick={handleLogout}>
                  <Typography>Log Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default AppNavAdmin;
