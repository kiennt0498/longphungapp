import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    search: "",
    boPhan: [],
    chucVu: [],
    tacVu: [],
    status: [],
    category: [],
    dateRange: null,
    month: null,
    day: null,
  });

  const updateFilters = (newValues) => {
    setFilters((prev) => ({ ...prev, ...newValues }));
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);
