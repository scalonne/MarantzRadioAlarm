import { useStorageFetch } from "./useStorageFetch";
import { MarantzController } from "../services/MarantzController";
import { AlarmDayType } from "../types/AlarmDayType";
import { AlarmTimeType } from "../types/AlarmTimeType";
import { StationType } from "../types/StationType";
import { IContextData } from "../types/IContextData";
import { PersistedData } from "../models/PersistedData";
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

  const defaultStations: StationType[] = [
    {
      id: 1,
      uid: "33960c43-0464-44b4-abfa-73591ebf647f",
      name: 'France Inter',
      url: 'https://stream.radiofrance.fr/franceinter/franceinter_hifi.m3u8?id=radiofrance',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/France_Inter_logo_2021.svg/1200px-France_Inter_logo_2021.svg.png'
    },
    {
      id: 2,
      uid: "6a1440b2-e6f0-11e9-a96c-52543be04c81",
      name: 'France Culture',
      url: 'http://icecast.radiofrance.fr/franceculture-hifi.aac',
      icon: 'https://upload.wikimedia.org/wikipedia/fr/thumb/c/c9/France_Culture_-_2008.svg/1024px-France_Culture_-_2008.svg.png'
    },
    {
      id: 3,
      uid: "932eb148-e6f6-11e9-a96c-52543be04c81",
      name: 'FIP',
      url: 'http://direct.fipradio.fr/live/fip-hifi.aac',
      icon: 'https://upload.wikimedia.org/wikipedia/fr/thumb/d/d5/FIP_logo_2005.svg/1024px-FIP_logo_2005.svg.png'
    },
  ];

  // radio
  const stationsStorage = useStorageFetch<StationType[]>("STORAGE_RADIO_STATIONS", defaultStations);
  const stationStorage = useStorageFetch<StationType | null>("STORAGE_RADIO_STATION", defaultStations[0]);

  // alarm
  const daysStorage = useStorageFetch<AlarmDayType[]>("STORAGE_ALARM_DAYS", defaultDays);
  const timeStorage = useStorageFetch<AlarmTimeType>("STORAGE_ALARM_TIME", { hours: 6, minutes: 0 });
  const radioStorage = useStorageFetch<StationType | null>("STORAGE_ALARM_RADIO", null);
  const isActiveStorage = useStorageFetch<boolean>("STORAGE_ALARM_ISACTIVE", true);

  const storageArray = [stationStorage, stationStorage, daysStorage, radioStorage, timeStorage, isActiveStorage];

  useEffect(() => {
    marantzController.current = new MarantzController();
    marantzController.current.init();
  }, []);

  useEffect(() => {
    if (storageArray.find(o => o.isLoading))
      return;

    context.current = {
      amplifierController: marantzController.current!,
      radio: {
        stations: new PersistedData(stationsStorage),
        station: new PersistedData(stationStorage)
      },
      alarm: {
        days: new PersistedData(daysStorage),
        time: new PersistedData(timeStorage),
        radio: new PersistedData(radioStorage),
        isActive: new PersistedData(isActiveStorage),
      }
    }

    setIsLoading(false);
  }, storageArray.map(o => o.isLoading));

  return [isLoading, context.current];
}