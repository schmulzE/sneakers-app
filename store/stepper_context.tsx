import React, { createContext, ReactNode, SetStateAction, useContext, useState, type Dispatch } from "react";

interface AppContextInterface {
  userData: string;
  setUserData: Dispatch<SetStateAction<string>>
}

export const cartContextDefaultValue: AppContextInterface = {
  userData: '',
  setUserData: () => ''
}

// const StepperContext = createContext({ userData: "", setUserData: null});
const StepperContext = createContext(cartContextDefaultValue);

export const UseContextProvider = ({ children }: {children : ReactNode}) => {
  const [userData, setUserData] = useState("");

  return (
    <StepperContext.Provider value={{ userData, setUserData }}>
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const { userData, setUserData } = useContext(StepperContext);

  return { userData, setUserData };
}