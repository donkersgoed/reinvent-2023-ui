import { FilterAndColumnsContextValue } from "@/types/filtersAndColumns";
import React from "react";

const defaultFilterAndColumnsContextValue: FilterAndColumnsContextValue = {
  filters: {
    level: {
      name: "Level",
      options: {},
    },
    trackName: {
      name: "Session Type",
      options: {},
    },
    services: {
      name: "Services",
      options: {},
    },
    topics: {
      name: "Topics",
      options: {},
    },
    industries: {
      name: "Industries",
      options: {},
    },
    areasOfInterest: {
      name: "Areas of Interest",
      options: {},
    },
    roles: {
      name: "Roles",
      options: {},
    },
  },
  setFilters: () => {},
  filtersActive: 0,
  setFiltersActive: () => {},
};

const FilterAndColumnsContext = React.createContext<FilterAndColumnsContextValue>(
  defaultFilterAndColumnsContextValue
);

const filterkeys: string[] = Object.keys(defaultFilterAndColumnsContextValue.filters);

const FilterAndColumnsProvider = ({ children }: { children: React.ReactNode }) => {
  const [filtersActive, setFiltersActive] = React.useState(0);
  const [filters, setFilters] = React.useState({
    level: {
      name: "Level",
      options: {},
    },
    trackName: {
      name: "Session Type",
      options: {},
    },
    services: {
      name: "Services",
      options: {},
    },
    topics: {
      name: "Topics",
      options: {},
    },
    industries: {
      name: "Industries",
      options: {},
    },
    areasOfInterest: {
      name: "Areas of Interest",
      options: {},
    },
    roles: {
      name: "Roles",
      options: {},
    },
  });

  return (
    <FilterAndColumnsContext.Provider
      value={{ filters, setFilters, filtersActive, setFiltersActive }}
    >
      {children}
    </FilterAndColumnsContext.Provider>
  );
};

export { FilterAndColumnsContext, FilterAndColumnsProvider, filterkeys };
