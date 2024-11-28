import { useState } from "react";
import { Box, Drawer } from "@mui/material";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import MenuItems from "./MenuItems";
import HelpCenterSettings from "./DrawerSettings";
import { Icon } from "@iconify/react";

const menuItems = [
  {
    path: "/pharmacy",
    icon: (
      <Icon
        icon="healthicons:pharmacy-alt-outline"
        width="1.8rem"
        height="1.8rem"
      />
    ),
    name: "Pharmacy",
  },
  {
    path: "/Medecine",
    icon: (
      <Icon icon="solar:jar-of-pills-broken" width="1.5rem" height="1.5rem" />
    ),
    name: "Medecine",
  },
  {
    path: "",
    icon: <Icon icon="tabler:calendar" width="1.5rem" height="1.5rem" />,
    name: "Order History",
    children: [
      { path: "/Completed", name: "Completed" },
      { path: "/Inprogress", name: "In-Progress" },
    ],
  },
];

interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

export default function DrawerComponent({ isOpen, toggleDrawer }: DrawerProps) {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  return (
    <Drawer
      data-test-id="drawer"
      variant="permanent"
      anchor="left"
      sx={{
        width: isOpen ? "21vw" : "0",
        maxWidth: "280px",
        "& .MuiDrawer-paper": {
          width: isOpen ? "21vw" : "0",
          backgroundColor: "#00072d",
          color: "#FFFFFF",
          transition: "width 0.3s ease",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          overflowY: isOpen ? "auto" : "hidden",
          boxSizing: "border-box",
          fontFamily: "DM Sans, sans-serif",

          "&::-webkit-scrollbar": {
            width: "0px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },

          "&:hover": {
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "5px",
            },
          },

          "@supports not (overflow: overlay)": {
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          },
        },
      }}
    >
      <Box
        data-cy="sidebar"
        sx={{
          padding: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "240px",
            // marginTop: "0.5rem",
            padding: "1rem 0.8rem 3rem 0.8rem",
            justifyContent: isOpen ? "space-between" : "center",
          }}
        >
          <Box
            sx={{
              padding: "4px 0",
            }}
          >
            <img
              src="/lightlogofull-removebg-preview.png"
              alt="SokoFund"
              style={{
                // backgroundColor: "#1F2937",
                height: "80px",
                width: "185px",
                transition: "width 0.3s ease",
              }}
            />
          </Box>
          <KeyboardDoubleArrowLeftOutlinedIcon
            onClick={toggleDrawer}
            sx={{
              color: "#cccccc",
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
          />
        </Box>
        {/* {isOpen && (
          <Box
            sx={{
              backgroundColor: "#FFBF00",
              padding: "15px 25px",
              margin: "20px auto 20px 13px",
              borderRadius: "10px",
              width: "216px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
              Dashboard
            </Typography>
            <GridViewOutlinedIcon sx={{ color: "#FFFFFF" }} />
          </Box>
        )} */}
        <MenuItems items={menuItems} />
        <HelpCenterSettings
          openMenus={openMenus}
          handleToggle={(menu) =>
            setOpenMenus((prev) => (prev.includes(menu) ? [] : [menu]))
          }
        />
      </Box>
    </Drawer>
  );
}
