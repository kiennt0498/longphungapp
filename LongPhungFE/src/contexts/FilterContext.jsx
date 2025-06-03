import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

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

  const updateFilters = useCallback((newValues) => {
    setFilters((prev) => {
      const next = { ...prev, ...newValues };
      return JSON.stringify(prev) === JSON.stringify(next) ? prev : next;
    });
  }, []);

  const value = useMemo(() => ({ filters, updateFilters }), [filters, updateFilters]);

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilters = () => useContext(FilterContext);