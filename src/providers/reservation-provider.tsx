"use client";
import { createContext, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

type ReservationStateType = DateRange | undefined;

type ReservationContextType = {
  range: ReservationStateType;
  setRange: React.Dispatch<React.SetStateAction<ReservationStateType>>;
  resetRange: () => void;
};

const initialState = {
  from: undefined,
  to: undefined,
};

const ReservationContext = createContext<ReservationContextType>({
  range: initialState,
  setRange: () => {},
  resetRange: () => {},
});

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<ReservationStateType>(initialState);

  const resetRange = () => {
    setRange(initialState);
  };

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);

  if (context === undefined)
    throw new Error("Context was used outside provider");

  return context;
}

export { ReservationProvider, useReservation };
