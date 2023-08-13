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
  columns: Object;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  setColumns: React.Dispatch<React.SetStateAction<any>>;
};
