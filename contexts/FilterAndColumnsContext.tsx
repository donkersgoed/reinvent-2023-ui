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
    roles: {
      name: "Roles",
      options: {},
    },
  },
  // columns: {},
  setFilters: () => {},
  // setColumns: () => {},
};

console.log("-- Create Context");
const FilterAndColumnsContext = React.createContext<FilterAndColumnsContextValue>(
  defaultFilterAndColumnsContextValue
);

const filterkeys: string[] = Object.keys(defaultFilterAndColumnsContextValue.filters);

const FilterAndColumnsProvider = ({ children }: { children: React.ReactNode }) => {
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
    roles: {
      name: "Roles",
      options: {},
    },
  });

  return (
    <FilterAndColumnsContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterAndColumnsContext.Provider>
  );
};

export { FilterAndColumnsContext, FilterAndColumnsProvider, filterkeys };
