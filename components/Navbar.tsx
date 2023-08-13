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
import Checkbox from "@mui/material/Checkbox";
import Drawer from "@mui/material/Drawer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TableRow } from "@mui/material";
import { FilterAndColumnsContext } from "@/contexts/FilterAndColumnsContext";
import { Filters } from "@/types/filtersAndColumns";

interface AppBarProps {
  title: string;
}

export default function ButtonAppBar({ title }: AppBarProps) {
  const { filters, setFilters } = React.useContext(FilterAndColumnsContext);

  const handleFilterCheckboxChange = (filterKey: string, option: string) => {
    setFilters((prevFilters: Filters) => {
      const updatedFilters = {
        ...prevFilters,
        [filterKey]: {
          ...prevFilters[filterKey],
          options: {
            ...prevFilters[filterKey].options,
            [option]: !prevFilters[filterKey].options[option],
          },
        },
      };
      return updatedFilters;
    });
  };

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

          {/* <IconButton
            size="large"
            aria-label="settings"
            color="inherit"
            onClick={handleSettingsMenu}
          >
            <Settings />
          </IconButton> */}

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

          {/* Filter Drawer */}
          <Drawer anchor={"right"} open={Boolean(filterMenuAnchorEl)} onClose={handleClose}>
            <Typography variant="h6" component="div" sx={{ px: 2, py: 1 }}>
              Filters
            </Typography>

            {Object.keys(filters).map((filterKey) => {
              const filter = filters[filterKey];
              return (
                <Accordion key={filterKey} disableGutters={true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${filterKey}-content`}
                    id={`${filterKey}-header`}
                  >
                    <Typography>{filter.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {Object.keys(filter.options).map((option) => (
                      <TableRow key={option}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={filter.options[option]}
                              onChange={() => handleFilterCheckboxChange(filterKey, option)}
                            />
                          }
                          label={option}
                        />
                      </TableRow>
                    ))}
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
