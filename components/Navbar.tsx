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

interface AppBarProps {
  title: string;
}

export default function ButtonAppBar({ title }: AppBarProps) {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleHomeMenuClick}>Home</MenuItem>
            <MenuItem onClick={handleSessionsMenuClick}>Sessions</MenuItem>
            <MenuItem onClick={handleMutationsMenuClick}>Mutations</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
