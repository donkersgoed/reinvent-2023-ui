import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Checkbox from "@mui/material/Checkbox";
import Drawer from "@mui/material/Drawer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FilterAndColumnsContext } from "@/contexts/FilterAndColumnsContext";
import { Filters } from "@/types/filtersAndColumns";
import CloseIcon from "@mui/icons-material/Close";

interface AppBarProps {
  title: string;
  nofilters?: boolean;
}

export default function ButtonAppBar({ title, nofilters }: AppBarProps) {
  const { filters, setFilters, filtersActive, setFiltersActive } =
    React.useContext(FilterAndColumnsContext);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const storeFiltersInLocalStorage = (filters: Filters) => {
    let activeFilters = 0;
    for (const key in filters) {
      const disabledOptions = Object.keys(filters[key].options).filter(
        (option) => !filters[key].options[option]
      );
      localStorage.setItem(`filters.${key}.disabledOptions`, JSON.stringify(disabledOptions));
      if (disabledOptions.length > 0) activeFilters++;
    }
    setFiltersActive(activeFilters);
  };

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

      storeFiltersInLocalStorage(updatedFilters);
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

  const handleAccordeonChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleFilterSelectAll = (filterKey: string | null) => {
    // Create a copy of the filters state
    const updatedFilters = { ...filters };

    if (filterKey == null) {
      Object.keys(updatedFilters).forEach((filterKey) => {
        Object.keys(updatedFilters[filterKey].options).forEach((option) => {
          updatedFilters[filterKey].options[option] = true;
        });
      });
    } else {
      // Set all options for the specified filterKey to false
      Object.keys(updatedFilters[filterKey].options).forEach((option) => {
        updatedFilters[filterKey].options[option] = true;
      });
    }

    // Update the state with the new filters object
    storeFiltersInLocalStorage(updatedFilters);
    setFilters(updatedFilters);
  };

  const handleFilterSelectNone = (filterKey: string) => {
    // Create a copy of the filters state
    const updatedFilters = { ...filters };

    // Set all options for the specified filterKey to false
    Object.keys(updatedFilters[filterKey].options).forEach((option) => {
      updatedFilters[filterKey].options[option] = false;
    });

    // Update the state with the new filters object
    storeFiltersInLocalStorage(updatedFilters);
    setFilters(updatedFilters);
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
          {nofilters !== true ? (
            <IconButton size="large" aria-label="filter" color="inherit" onClick={handleFilterMenu}>
              <Badge badgeContent={filtersActive} color="primary">
                <FilterAltIcon />
              </Badge>
            </IconButton>
          ) : (
            <div />
          )}
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
          <Drawer
            anchor={"right"}
            open={Boolean(filterMenuAnchorEl)}
            onClose={handleClose}
            sx={{
              flexShrink: 0,
            }}
          >
            <Box display={"flex"} flexDirection={"row"}>
              <Typography
                variant="h6"
                component="div"
                sx={{ px: 2, py: 1, my: "auto", verticalAlign: "bottom" }}
              >
                Filters
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{ px: 0, py: 1, my: "auto", verticalAlign: "bottom" }}
                onClick={() => handleFilterSelectAll(null)}
                style={{ cursor: "pointer" }}
              >
                (reset)
              </Typography>
              <Box flexGrow={1} />
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="close-filters"
                sx={{ mr: 1 }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {Object.keys(filters).map((filterKey) => {
              const filter = filters[filterKey];
              return (
                <Accordion
                  expanded={expanded === filterKey}
                  key={filterKey}
                  disableGutters={true}
                  onChange={handleAccordeonChange(filterKey)}
                  TransitionProps={{
                    timeout: {
                      appear: 500,
                      enter: 300,
                      exit: 150,
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${filterKey}-content`}
                    id={`${filterKey}-header`}
                    sx={{
                      backgroundColor: "rgba(0, 0, 0, 0.03)",
                      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Typography>{filter.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ py: 1 }}>
                      <a
                        onClick={() => handleFilterSelectAll(filterKey)}
                        style={{ cursor: "pointer" }}
                      >
                        All
                      </a>{" "}
                      -{" "}
                      <a
                        onClick={() => handleFilterSelectNone(filterKey)}
                        style={{ cursor: "pointer" }}
                      >
                        None
                      </a>
                    </Typography>
                    {Object.keys(filter.options)
                      .sort((a, b) => a.localeCompare(b))
                      .map((option) => (
                        <Box key={option}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={filter.options[option]}
                                onChange={() => handleFilterCheckboxChange(filterKey, option)}
                              />
                            }
                            label={option}
                          />
                        </Box>
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
