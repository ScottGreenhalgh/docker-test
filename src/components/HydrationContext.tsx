import React, { createContext, useState, useEffect } from "react";

export const HydrationContext = createContext({ hydrated: false });

type HydrationProviderProps = {
  children: React.ReactNode;
};

export const HydrationProvider: React.FC<HydrationProviderProps> = ({
  children,
}) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <HydrationContext.Provider value={{ hydrated }}>
      {children}
    </HydrationContext.Provider>
  );
};

export const useHydration = () => {
  const context = React.useContext(HydrationContext);
  if (context === undefined) {
    throw new Error("useHydration must be used within a HydrationProvider");
  }
  return context;
};
