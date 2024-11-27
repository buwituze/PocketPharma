import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Icon } from "@iconify/react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries";

function AppNavbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Query to fetch user data (assuming you're fetching only the first user for simplicity)
  const { data } = useQuery(GET_USERS);
  const userName = data?.getUsers[0]?.firstName ?? "P"; // Default to "User" if no data

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the auth token
    window.location.href = "/signIn"; // Redirect to sign-in page
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
              gap: "20px",
              width: "100%",
            }}
          >
            {/* Search Bar */}
            <TextField
              variant="outlined"
              placeholder="Search Stock..."
              onChange={(e) => console.log(e.target.value)}
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
                  "&:hover fieldset": { borderColor: "#A0AEC0" },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #A0AEC0",
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

            {/* Right side icons and user dropdown */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "black",
                gap: { xs: 0.5, sm: 1.3, md: 3 },
              }}
            >
              <Icon icon="bx:cart" width="1.7rem" height="1.7rem" />
              <Icon
                icon="hugeicons:notification-01"
                width="1.7rem"
                height="1.7rem"
              />

              {/* User profile and dropdown */}
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

              {/* Dropdown Menu */}
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

export default AppNavbar;
