import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StationType } from "../types/StationType";
import { AlarmTimeType } from "../types/AlarmTimeType";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type ApplicationStoreProps = {
  stations: StationType[];
  selectedStation: StationType | null;
  alarmDays: boolean[];
  alarmTime: AlarmTimeType;
  alarmRadio: StationType | null;
  alarmIsActive: boolean;
};

interface ApplicationStoreActions {
  setStations: (stations: StationType[]) => void;
  setSelectedStation: (station: StationType | null) => void;
  setAlarmDays: (days: boolean[]) => void;
  setAlarmTime: (time: AlarmTimeType) => void;
  setAlarmRadio: (station: StationType | null) => void;
  setAlarmIsActive: (isActive: boolean) => void;
}

interface StoreHydration {
  _hasHydrated: boolean;
  setHydrate: (val: boolean) => void;
}

type ApplicationStore = ApplicationStoreProps & ApplicationStoreActions & StoreHydration;

const DEFAULT_PROPS: ApplicationStoreProps = {
  stations: [],
  selectedStation: null,
  alarmDays: [true, true, true, true, true, false, false],
  alarmTime: { hours: 7, minutes: 0 },
  alarmRadio: null,
  alarmIsActive: false,
}

export const useStore = create<ApplicationStore>()(
  devtools(
    persist<ApplicationStore>(
      (set) => ({
        ...DEFAULT_PROPS,
        _hasHydrated: false,
        setHydrate: (val) =>
          set((state) => {
            state._hasHydrated = val;
            return state;
          }),
        setStations: (stations) => {
          set({ stations });
        },
        setSelectedStation: (station) => {
          set({ selectedStation: station });
        },
        setAlarmDays: (days) => {
          set({ alarmDays: days });
        },
        setAlarmTime: (time) => {
          set({ alarmTime: time });
        },
        setAlarmRadio: (station) => {
          set({ alarmRadio: station });
        },
        setAlarmIsActive: (isActive) => {
          set({ alarmIsActive: isActive });
        },
      }),
      {
        name: "application-storage",
        storage: createJSONStorage(() => AsyncStorage),
        onRehydrateStorage: () => (state) => {
          state?.setHydrate(true)
        }
      }
    )
  )
);