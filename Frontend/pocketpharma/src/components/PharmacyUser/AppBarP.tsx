import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import { TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Icon } from "@iconify/react";

function AppNavbar() {
  const handleChange = (value: string | null | undefined) => {
    console.log(value);
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
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Box>
              <TextField
                variant="outlined"
                placeholder="Search Stock..."
                onChange={(e) => handleChange(e.target.value)}
                size="small"
                sx={{
                  width: "500px",
                  height: "43px",
                  paddingTop: "4px",
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
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="outlined"
                        sx={{
                          width: "80px",
                          height: "30px",
                          color: "#030f54",
                          backgroundColor: "rgba(173, 216, 230, 0.3)",
                          float: "right",
                          position: "relative",
                          left: "0.5rem",
                          right: "1rem",
                          borderRadius: "20px",
                          borderColor: "transparent",
                          "&:hover": { borderColor: "transparent" },
                        }}
                      >
                        Search
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "1.4rem",
                alignItems: "center",
                marginRight: "10px",
                marginLeft: "auto",
                color: "black",
              }}
            >
              <Icon icon="basil:add-outline" width="1.7rem" height="1.7rem" />
              <Icon
                icon="hugeicons:notification-01"
                width="1.7rem"
                height="1.7rem"
              />

              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  marginRight: "10px",
                  color: "black",
                  fontWeight: "200",
                }}
              >
                <img
                  src="/public/pfpavatar.png"
                  alt="Pfp"
                  width="50px"
                  height="50px"
                />
                <KeyboardArrowDownOutlinedIcon />
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default AppNavbar;
