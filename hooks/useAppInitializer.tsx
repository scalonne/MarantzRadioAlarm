import { useStorageFetch } from "./useStorageFetch";
import MarantzController from "../services/MarantzController";
import { AlarmDayType } from "../types/AlarmDayType";
import { AlarmTimeType } from "../types/AlarmTimeType";
import { RadioItemType } from "../types/RadioItemType";
import { IContextData } from "../types/IContextData";
import { AlarmItemData } from "../models/AlarmItemData";
import { useEffect, useRef, useState } from "react";

export const useAppInitializer = (): [isLoading: boolean, context: IContextData | null] => {
  const [isLoading, setIsLoading] = useState(true);
  const marantzController = useRef<MarantzController | null>(null);
  const context = useRef<IContextData | null>(null);

  const defaultDays: AlarmDayType[] = [
    { label: 'Lundi', isActive: true, weekDay: 2 },
    { label: 'Mardi', isActive: true, weekDay: 3 },
    { label: 'Mercredi', isActive: true, weekDay: 4 },
    { label: 'Jeudi', isActive: true, weekDay: 5 },
    { label: 'Vendredi', isActive: true, weekDay: 6 },
    { label: 'Samedi', isActive: false, weekDay: 7 },
    { label: 'Dimanche', isActive: false, weekDay: 1 },
  ];

  const daysStorage = useStorageFetch<AlarmDayType[]>("STORAGE_ALARM_DAYS", defaultDays);
  const timeStorage = useStorageFetch<AlarmTimeType>("STORAGE_ALARM_TIME", { hours: 6, minutes: 0 });
  const radioStorage = useStorageFetch<RadioItemType | null>("STORAGE_ALARM_RADIO", null);
  const isActiveStorage = useStorageFetch<boolean>("STORAGE_ALARM_ISACTIVE", true);
  const storageArray = [daysStorage, radioStorage, timeStorage, isActiveStorage];

  useEffect(() => {
    marantzController.current = new MarantzController();
    marantzController.current.init();
  }, []);

  useEffect(() => {
    if (storageArray.find(o => o.isLoading))
      return;

    context.current = {
      marantzController: marantzController.current!,
      alarm: {
        days: new AlarmItemData(daysStorage),
        time: new AlarmItemData(timeStorage),
        radio: new AlarmItemData(radioStorage),
        isActive: new AlarmItemData(isActiveStorage),
      }
    }
    
    setIsLoading(false);
  }, storageArray.map(o => o.isLoading));

  return [isLoading, context.current];
}