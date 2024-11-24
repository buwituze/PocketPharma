import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Icon } from "@iconify/react";

interface HelpCenterSettingsProps {
  openMenus: string[];
  handleToggle: (menu: string) => void;
}

const HelpCenterSettings: React.FC<HelpCenterSettingsProps> = ({
  openMenus,
  handleToggle,
}) => {
  return (
    <List>
      <ListItemButton
        data-test-id="settings"
        sx={{
          padding: "0.5rem",
          width: "180px",
          marginLeft: openMenus.includes("Help Center") ? "3rem" : "1.56rem",
          marginRight: "1.25rem",
          marginTop: "12.5rem",
          borderRadius: "0.63rem",
          transition: "margin-left 0.3s ease",
          backgroundColor: openMenus.includes("Help Center")
            ? "#FFFFFF"
            : "transparent",
          color: openMenus.includes("Help Center") ? "#00072d" : "#white",
          "& .MuiListItemIcon-root": {
            color: openMenus.includes("Help Center") ? "orange" : "#cccc",
          },
          "&:hover": {
            backgroundColor: openMenus.includes("Help Center")
              ? "#FFFFFF"
              : "rgba(0, 0, 0, 0.1)",
          },
        }}
        onClick={() => handleToggle("Help Center")}
      >
        <ListItemIcon>
          <Icon icon="ri:question-line" width="1.4rem" height="1.4rem" />
        </ListItemIcon>
        <ListItemText primary="Help Center" />
      </ListItemButton>

      <ListItemButton
        sx={{
          padding: "0.5rem",
          width: "180px",
          marginLeft: openMenus.includes("Settings") ? "3rem" : "1.56rem",
          marginRight: "1.25rem",
          borderRadius: "0.63rem",
          transition: "margin-left 0.3s ease",
          backgroundColor: openMenus.includes("Settings")
            ? "#FFFFFF"
            : "transparent",
          color: openMenus.includes("Settings") ? "#00072d" : "#white",
          "& .MuiListItemIcon-root": {
            color: openMenus.includes("Settings") ? "#FFBF00" : "#cccc",
          },
          "&:hover": {
            backgroundColor: openMenus.includes("Settings")
              ? "#FFFFFF"
              : "rgba(0, 0, 0, 0.1)",
          },
        }}
        onClick={() => handleToggle("Settings")}
      >
        <ListItemIcon>
          <Icon icon="tabler:settings" width="1.2rem" height="1.2rem" />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </List>
  );
};
export default HelpCenterSettings;
