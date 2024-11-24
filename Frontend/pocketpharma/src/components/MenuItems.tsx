import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface MenuItem {
  path: string;
  icon?: JSX.Element;
  name: string;
  children?: MenuItem[];
}

interface MenuItemsProps {
  items: MenuItem[];
}

const MenuItems: React.FC<MenuItemsProps> = ({ items }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleToggle = (name: string) => {
    if (openMenu === name) {
      setOpenMenu(null);
      setActiveMenu(null);
    } else {
      setOpenMenu(name);
      setActiveMenu(name);
    }
  };

  return (
    <List>
      {items.map((item) => (
        <React.Fragment key={item.name}>
          <ListItemButton
            data-test-id={`menu-item-${item.name}`}
            sx={{
              width: "247px",
              margin: "auto 2rem auto auto",
              paddingBottom: "0.75rem",
              paddingTop: "0.75rem",
              display: "flex",
              alignItems: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              gap: "0px",
              "& .MuiListItemIcon-root": {
                color:
                  openMenu === item.name || activeMenu === item.name
                    ? "#FFBF00"
                    : "#cccc",
                fontSize: "1.25rem",
                marginRight: "-0.875rem",
              },
            }}
            onClick={() => handleToggle(item.name)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.name}
              sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
              }}
            />
            {item.children &&
              (openMenu === item.name ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>

          {item.children && (
            <Collapse in={openMenu === item.name} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children.map((child) => (
                  <ListItemButton
                    key={child.name}
                    sx={{
                      pl: 7,
                      width: "190px",
                      marginLeft: "2.5rem",
                      padding: "0.5rem",
                      marginRight: "1.25rem",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      backgroundColor:
                        activeMenu === child.name ? "#FFFFFF" : "transparent", // Change background to white for active
                      color: activeMenu === child.name ? "#00072d" : "#FFFFFF", // Change color for active submenu
                      borderRadius: "5px",
                      "&:hover": {
                        backgroundColor:
                          activeMenu === child.name
                            ? "#FFFFFF" // Maintain white background on hover
                            : "rgba(0, 0, 0, 0.05)",
                      },
                    }}
                    onClick={() => {
                      setActiveMenu(child.name);
                      console.log(`Navigating to ${child.name}`);
                    }}
                  >
                    <ListItemText
                      primary={child.name}
                      sx={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 400,
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default MenuItems;
