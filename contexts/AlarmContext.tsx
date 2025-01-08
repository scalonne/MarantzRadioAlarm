import { createContext, useContext } from "react";
import { AlarmContextType } from "../types/AlarmContextType";

export const AlarmContext = createContext<AlarmContextType | null>(null);

export const useAlarmContextx = () => {
    const context = useContext(AlarmContext);
    if (!context) throw new Error('useAlarm must be used within an AlarmProvider');
    return context;
};