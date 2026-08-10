"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ScheduleContextType {
  isOpen: boolean;
  openSchedule: () => void;
  closeSchedule: () => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSchedule = () => setIsOpen(true);
  const closeSchedule = () => setIsOpen(false);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <ScheduleContext.Provider value={{ isOpen, openSchedule, closeSchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
}
