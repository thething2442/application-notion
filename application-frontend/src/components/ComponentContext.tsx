// src/context/ComponentContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ComponentContextType = {
  selectedComponent: ReactNode | null;
  setSelectedComponent: (component: ReactNode | null) => void;
};

const ComponentContext = createContext<ComponentContextType | undefined>(undefined);

export const ComponentProvider = ({ children }: { children: ReactNode }) => {
  const [selectedComponent, setSelectedComponent] = useState<ReactNode | null>(null);

  return (
    <ComponentContext.Provider value={{ selectedComponent, setSelectedComponent }}>
      {children}
    </ComponentContext.Provider>
  );
};

export const useComponentContext = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error("useComponentContext must be used within a ComponentProvider");
  }
  return context;
};
