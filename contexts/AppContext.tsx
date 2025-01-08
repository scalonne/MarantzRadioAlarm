import { createContext, useContext } from "react";
import { IContextData } from "../types/IContextData";

export const AppContext = createContext<IContextData | null>(null);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used within a MarantzProvider");
    return context;
};