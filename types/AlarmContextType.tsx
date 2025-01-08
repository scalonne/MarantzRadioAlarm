import { AlarmDayType } from "./AlarmDayType";
import { AlarmTimeType } from "./AlarmTimeType";
import { RadioItemType } from "./RadioItemType";

export type AlarmContextType = {
    days: AlarmDayType[];
    dayChanged: (day: AlarmDayType) => void;
    time: AlarmTimeType;
    timeChanged: (time: AlarmTimeType) => void;
    radio: RadioItemType | null,
    radioChanged: (radio: RadioItemType) => void;
    isActive: boolean;
    isActiveChanged: (isActive: boolean) => void;
};