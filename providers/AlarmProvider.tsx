import React, { createContext, useContext, useEffect, useState } from 'react';
import { AlarmDayType } from '../types/AlarmDayType';
import { AlarmTimeType } from '../types/AlarmTimeType';
import { StationType } from '../types/StationType';
import { NotificationsController } from '../services/NotificationsController';
import { AlarmContextType } from '../types/AlarmContextType';
import { useAppContext } from '../App';

export const AlarmContext = createContext<AlarmContextType | null>(null);

export const useAlarmContext = () => {
    const context = useContext(AlarmContext);
    if (!context) throw new Error('useAlarm must be used within an AlarmProvider');
    return context;
};

export const AlarmProvider = ({ children }: { children: any }) => {
    const context = useAppContext();

    const [days, setDays] = useState<AlarmDayType[]>(context.alarm.days.value);
    const [time, setTime] = useState(context.alarm.time.value);
    const [isActive, setIsActive] = useState(context.alarm.isActive.value);
    const [radio, setRadio] = useState<StationType | null>(context.alarm.radio.value);
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
        context.alarm.isActive.value = isActive;
    }, [isActive]);

    useEffect(() => {
        context.alarm.days.value = days;
    }, [days]);

    useEffect(() => {
        context.alarm.time.value = time;
    }, [time]);

    useEffect(() => {
        context.alarm.radio.value = radio;
    }, [radio]);

    const isActiveChanged = (isActive: boolean) => {
        setIsActive(isActive);

        if (isActive && radio)
            NotificationsController.createManyAsync(days, time, radio);
        else
            NotificationsController.cancelAllAsync();
    }

    const dayChanged = (day: AlarmDayType) => {
        setDays((days) =>
            days.map((oldDay) =>
                oldDay.weekDay === day.weekDay ? day : oldDay
            ));

        if (!isActive || !radio)
            return;

        if (day.isActive)
            NotificationsController.createAsync(day, time, radio)
        else
            NotificationsController.cancelAsync(day);
    };

    const timeChanged = (time: AlarmTimeType) => {
        setTime(time);

        if (isActive && radio)
            NotificationsController.createManyAsync(days, time, radio);
    }

    const radioChanged = (radio: StationType) => {
        console.log("radio changed: " + radio.name);
        setRadio(radio);

        if (isActive && radio)
            NotificationsController.createManyAsync(days, time, radio);
        else
            NotificationsController.cancelAllAsync();
    }

    if (!isLoaded) {
        return null;
    }

    return (
        <AlarmContext.Provider value={{
            days, dayChanged,
            time, timeChanged,
            radio, radioChanged,
            isActive, isActiveChanged
        }}>
            {children}
        </AlarmContext.Provider>
    );
};