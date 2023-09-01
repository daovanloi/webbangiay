import React, { useState } from "react";

// Type send Data
type TypeSumCartContext = {
  value: number;
  onHandleSumCart: (val: number) => void;
};
// Create SumCartContext
export const SumCartContext = React.createContext<TypeSumCartContext | null>(
  null
);

// Type children
type TProps = {
  children: React.ReactNode;
};

export const SumCartProvider = ({ children }: TProps) => {
  const [sum1, setSum] = useState<number>(0);
  const onHandleSumCart = (val: number) => {
    setSum(val);
  };
  return (
    <SumCartContext.Provider value={{ value: sum1, onHandleSumCart }}>
      {children}
    </SumCartContext.Provider>
  );
};
