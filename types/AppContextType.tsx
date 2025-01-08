import MarantzController from "../services/MarantzController";
import StorageController from "../services/StorageController";
import { AlarmDayType } from "./AlarmDayType";
import { AlarmTimeType } from "./AlarmTimeType";
import { RadioItemType } from "./RadioItemType";

export type AppContextType = {
    defaultValues: {
        days: AlarmDayType[],
        daysUpdate: (v: AlarmDayType[]) => Promise<void>,
        time: AlarmTimeType,
        timeUpdate: (v: AlarmTimeType) => Promise<void>,
        radio: RadioItemType | null,
    },
    storageController: StorageController,
    marantzController: MarantzController
};