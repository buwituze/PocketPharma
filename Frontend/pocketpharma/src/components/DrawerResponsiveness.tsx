import { useState, useEffect } from "react";
import {
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Box,
} from "@mui/material";
import DrawerComponent from "./Drawer";
import { Icon } from "@iconify/react";

export default function ResponsiveDrawer() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const [isOpen, setIsOpen] = useState(() => {
    try {
      const savedState = localStorage.getItem("drawerState");
      return savedState ? JSON.parse(savedState) : isLargeScreen;
    } catch {
      return isLargeScreen;
    }
  });
  const [loading, setLoading] = useState(true);
  const [showMenuIcon, setShowMenuIcon] = useState(false); // New state for showing the menu icon

  const toggleDrawer = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem("drawerState", JSON.stringify(newState));

    if (!newState) {
      setTimeout(() => {
        setShowMenuIcon(true); // Show menu icon after a delay
      }, 300); // Adjust the timeout as needed
    } else {
      setShowMenuIcon(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // New effect to handle showing the menu icon based on isOpen
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setShowMenuIcon(true);
      }, 300); // Adjust the timeout as needed

      return () => clearTimeout(timer); // Clean up the timer
    } else {
      setShowMenuIcon(false);
    }
  }, [isOpen]); // Run this effect whenever isOpen changes

  return (
    <>
      {!isOpen && showMenuIcon && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            top: 24,
            left: 60,
            zIndex: 1300,
            transition: "transition 0.6s all ease",
            color: "black",
          }}
        >
          <Icon
            icon="heroicons-outline:menu-alt-1"
            width="1.7rem"
            height="1.7rem"
          />
        </IconButton>
      )}

      <Drawer
        variant={isLargeScreen ? "permanent" : "temporary"}
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: isOpen ? 280 : 0,
            transition: "width 0.4s ease",
            boxSizing: "border-box",
            overflowX: "hidden",
          },
        }}
      >
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <DrawerComponent isOpen={isOpen} toggleDrawer={toggleDrawer} />
        )}
      </Drawer>
    </>
  );
}
