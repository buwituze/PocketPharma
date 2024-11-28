import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Box, Tabs, Tab, Button } from "@mui/material";

function Navbar() {
  const [value, setValue] = useState(0);

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
          height: "96px",
          paddingLeft: "10px",
          paddingTop: "16px",
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", gap: "300px" }}>
            <Box
              sx={{
                paddingTop: "5px",
              }}
            >
              <img
                src="/pocketpharmalogo-removebg-preview.png"
                alt="Logo"
                style={{ height: "75px", width: "250px" }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "120px" }}>
              <Box>
                <Tabs
                  sx={{ marginLeft: "auto", textAlign: "left" }}
                  value={value}
                  onChange={(_, newValue) => setValue(newValue)}
                  indicatorColor="secondary"
                >
                  {["Home", "About", "Services", "Contact"].map((label) => (
                    <Tab
                      key={label}
                      label={label}
                      sx={{
                        color: "#111827",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    />
                  ))}
                </Tabs>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: "40px",
                  alignItems: "center",
                  marginRight: "10px",
                  marginLeft: "auto",
                  color: "black",
                }}
              >
                <Link to="/signIn">
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#030f54",
                      borderColor: "#030f54",
                      "&:hover": { borderColor: "lightblue" },
                    }}
                  >
                    Sign in
                  </Button>
                </Link>
                <Link to="/signUp">
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#030f54",
                      borderColor: "#030f54",
                      "&:hover": { borderColor: "lightblue" },
                    }}
                  >
                    Sign up
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Navbar;
