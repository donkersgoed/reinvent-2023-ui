import { FilterAndColumnsContextValue } from "@/types/filtersAndColumns";
import React from "react";

const defaultFilterAndColumnsContextValue: FilterAndColumnsContextValue = {
  filters: {},
  columns: {},
  setFilters: () => {},
  setColumns: () => {},
};

const FilterAndColumnsContext = React.createContext<FilterAndColumnsContextValue>(
  defaultFilterAndColumnsContextValue
);

const FilterAndColumnsProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = React.useState({
    level: {
      name: "Level",
      options: { "100": true, "200": true, "300": true, "400": true },
    },
    // sessionType: {
    //   name: "Session Type",
    //   options: { Tutorial: true, Practice: true, Exam: true, Exam2: true },
    // },
  });
  const [columns, setColumns] = React.useState({});

  return (
    <FilterAndColumnsContext.Provider value={{ filters, columns, setFilters, setColumns }}>
      {children}
    </FilterAndColumnsContext.Provider>
  );
};

export { FilterAndColumnsContext, FilterAndColumnsProvider };
