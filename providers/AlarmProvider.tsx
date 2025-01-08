import React, { useEffect, useState } from 'react';
import { AlarmDayType } from '../types/AlarmDayType';
import { AlarmTimeType } from '../types/AlarmTimeType';
import { RadioItemType } from '../types/RadioItemType';
import NotificationsController from '../services/NotificationsController';
import { useAppContext } from '../contexts/AppContext';
import { AlarmContext } from '../contexts/AlarmContext';

export const AlarmProvider = ({ children }: { children: any }) => {
    const context = useAppContext();

    const [days, setDays] = useState<AlarmDayType[]>(context.alarm.days.defaultValue);
    const [time, setTime] = useState(context.alarm.time.defaultValue);
    const [isActive, setIsActive] = useState(context.alarm.isActive.defaultValue);
    const [radio, setRadio] = useState<RadioItemType | null>(context.alarm.radio.defaultValue);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const init = async () => {
            //if (canNotify(currentIsActive, currentRadio, days))
            //await NotificationsController.createManyAsync(days, time, radio);
            setIsLoaded(true);
        }

        init();
    }, []);

    const canNotify = (isActive: boolean, radio: RadioItemType | null, days: AlarmDayType[]) =>
        isActive && radio && days && days.find(o => o.isActive);

    useEffect(() => {
        context.alarm.isActive.updateDefaultValue(isActive);
    }, [isActive]);

    useEffect(() => {
        context.alarm.days.updateDefaultValue(days);
    }, [days]);

    useEffect(() => {
        context.alarm.time.updateDefaultValue(time);
    }, [time]);

    useEffect(() => {
        context.alarm.radio.updateDefaultValue(radio);
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

    const radioChanged = (radio: RadioItemType) => {
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