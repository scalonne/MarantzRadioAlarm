import React, { createContext, useContext, useEffect, useState } from 'react';
import { AlarmDayType } from '../types/AlarmDayType';
import { AlarmTimeType } from '../types/AlarmTimeType';
import { StationType } from '../types/StationType';
import { NotificationsController } from '../services/NotificationsController';
import hello from '../modules/radio-alarm-scheduler';
import { useStore } from '../hooks/useAlarmStore';

export const NotificationsContext = createContext(null);

export const useAlarmContext = () => {
    const context = useContext(NotificationsContext);
    if (!context) throw new Error('useAlarm must be used within an AlarmProvider');
    return context;
};

export const NotificationsProvider = ({ children }: { children: any }) => {
    const days = useStore((state) => state.alarmDays);
    const time = useStore((state) => state.alarmTime);
    const isActive = useStore((state) => state.alarmIsActive);
    const station = useStore((state) => state.alarmRadio);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const init = async () => {
            //if (canNotify(currentIsActive, currentRadio, days))
            //await NotificationsController.createManyAsync(days, time, radio);
            setIsLoaded(true);
        }

        init();
    }, []);

    const canNotify = (isActive: boolean, radio: StationType | null, days: AlarmDayType[]) =>
        isActive && radio && days && days.find(o => o.isActive);

    useEffect(() => {
        if (isActive && station)
            NotificationsController.createManyAsync(days, time, station);
        else
            NotificationsController.cancelAllAsync();
    }, [isActive]);

    useEffect(() => {
        if (isActive && station)
            NotificationsController.createManyAsync(days, time, station);
    }, [days]);

    useEffect(() => {
        if (isActive && station)
            NotificationsController.createManyAsync(days, time, station);
    }, [time]);

    useEffect(() => {
        console.log("radio changed: " + station?.name);

        if (isActive && station)
            NotificationsController.createManyAsync(days, time, station);
        else
            NotificationsController.cancelAllAsync();
    }, [station]);

    return (
        <NotificationsContext.Provider value={ null }>
            {children}
        </NotificationsContext.Provider>
    );
};