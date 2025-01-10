import { AlarmDayType } from "./AlarmDayType";
import { AlarmTimeType } from "./AlarmTimeType";
import { StationType } from "./StationType";

export type AlarmContextType = {
    days: AlarmDayType[];
    dayChanged: (day: AlarmDayType) => void;
    time: AlarmTimeType;
    timeChanged: (time: AlarmTimeType) => void;
    radio: StationType | null,
    radioChanged: (radio: StationType) => void;
    isActive: boolean;
    isActiveChanged: (isActive: boolean) => void;
};