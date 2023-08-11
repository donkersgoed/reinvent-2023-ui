import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Settings from "@mui/icons-material/Settings";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

interface AppBarProps {
  title: string;
}

export default function ButtonAppBar({ title }: AppBarProps) {
  const router = useRouter();

  const [mainMenuAnchorEl, setMainMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMainMenuAnchorEl(event.currentTarget);
  };
  const handleFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };
  const handleSettingsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMainMenuAnchorEl(null);
    setFilterMenuAnchorEl(null);
    setSettingsMenuAnchorEl(null);
  };

  const handleHomeMenuClick = () => {
    router.push("/");
  };

  const handleSessionsMenuClick = () => {
    router.push("/sessions");
  };

  const handleMutationsMenuClick = () => {
    router.push("/mutations");
  };

  return (
    <Box sx={{ flexGrow: 1, flexShrink: 0 }}>
      <AppBar position="static" style={{ background: "#2E3B55" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton size="large" aria-label="filter" color="inherit" onClick={handleFilterMenu}>
            <FilterAltIcon />
          </IconButton>

          <IconButton
            size="large"
            aria-label="settings"
            color="inherit"
            onClick={handleSettingsMenu}
          >
            <Settings />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={mainMenuAnchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(mainMenuAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleHomeMenuClick}>Home</MenuItem>
            <MenuItem onClick={handleSessionsMenuClick}>Sessions</MenuItem>
            <MenuItem onClick={handleMutationsMenuClick}>Mutations</MenuItem>
          </Menu>
          <Menu
            id="menu-filter"
            anchorEl={filterMenuAnchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(filterMenuAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem>Level</MenuItem>
            <MenuItem>Session Type</MenuItem>
            <MenuItem>Mutations</MenuItem>
          </Menu>
          <Menu
            id="menu-settings"
            anchorEl={settingsMenuAnchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(settingsMenuAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled>Select columns</MenuItem>
            <MenuItem>
              <Checkbox checked={true} />
              <ListItemText primary={"Session Type"} />
            </MenuItem>
            <MenuItem>
              <Checkbox checked={true} />
              <ListItemText primary={"Mutation Type"} />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
