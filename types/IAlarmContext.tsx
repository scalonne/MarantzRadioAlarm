import { IPersistedData } from "./IPersistedData";
import { AlarmDayType } from "./AlarmDayType";
import { AlarmTimeType } from "./AlarmTimeType";
import { StationType } from "./StationType";

export interface IAlarmContext {
  days: IPersistedData<AlarmDayType[]>;
  time: IPersistedData<AlarmTimeType>;
  radio: IPersistedData<StationType | null>;
  isActive: IPersistedData<boolean>;
}
