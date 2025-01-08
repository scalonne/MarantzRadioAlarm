import { useEffect, useState } from 'react';
import { AlarmDayType } from '../types/AlarmDayType';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useDays() {
    const [days, setDays] = useState<AlarmDayType[]>([
        { label: 'Lundi', isActive: true, weekDay: 2 },
        { label: 'Mardi', isActive: true, weekDay: 3 },
        { label: 'Mercredi', isActive: true, weekDay: 4 },
        { label: 'Jeudi', isActive: true, weekDay: 5 },
        { label: 'Vendredi', isActive: true, weekDay: 6 },
        { label: 'Samedi', isActive: false, weekDay: 7 },
        { label: 'Dimanche', isActive: false, weekDay: 1 },
    ]);

    const ALARM_DAYS_KEY = 'alarm-days';

    useEffect(() => {
        const init = async () => {
            const daysRaw = await AsyncStorage.getItem(ALARM_DAYS_KEY);
        }

        init();
    });

    return null;
}