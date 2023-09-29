import { createContext, useContext, useMemo, useState } from "react";

export const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [selectedEntry, setSelectedEntry] = useState(false);

  const setEntry = (entry) => {
    setSelectedEntry(entry);
  };

  const value = useMemo(
    () => ({
        selectedEntry,
        setEntry
    }),
    [selectedEntry]
  );
  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => {
  return useContext(DashboardContext);
};