import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate, useLocation } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  // Helper to check if any child route matches current location
  const isChildActive = (children: MenuItem[]) =>
    children.some((child) => location.pathname === child.path);

  React.useEffect(() => {
    // Automatically open parent menu if any child is active
    const activeParent = items.find(
      (item) => item.children && isChildActive(item.children)
    );
    if (activeParent) {
      setOpenMenu(activeParent.name);
    }
  }, [location.pathname, items]);

  const handleToggle = (name: string) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  return (
    <List>
      {items.map((item) => {
        const isActive =
          location.pathname === item.path ||
          (item.children && isChildActive(item.children));

        return (
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
                  color: isActive ? "#FFBF00" : "#cccc",
                  fontSize: "1.25rem",
                  marginRight: "-0.875rem",
                },
              }}
              onClick={() => {
                if (item.children) {
                  handleToggle(item.name); // Toggle submenu
                } else {
                  navigate(item.path); // Navigate if no children
                }
              }}
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
              <Collapse
                in={openMenu === item.name}
                timeout="auto"
                unmountOnExit
              >
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
                          location.pathname === child.path
                            ? "#FFFFFF"
                            : "transparent",
                        color:
                          location.pathname === child.path
                            ? "#00072d"
                            : "#FFFFFF",
                        borderRadius: "5px",
                        "&:hover": {
                          backgroundColor:
                            location.pathname === child.path
                              ? "#FFFFFF"
                              : "rgba(0, 0, 0, 0.05)",
                        },
                      }}
                      onClick={() => navigate(child.path)}
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
        );
      })}
    </List>
  );
};

export default MenuItems;
