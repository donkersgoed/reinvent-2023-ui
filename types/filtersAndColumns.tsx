type FilterOptions = {
  [key: string]: boolean;
};

type Filter = {
  name: string;
  options: FilterOptions;
};

export type Filters = {
  [key: string]: Filter;
};

export type FilterAndColumnsContextValue = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  filtersActive: number;
  setFiltersActive: React.Dispatch<React.SetStateAction<any>>;
};
