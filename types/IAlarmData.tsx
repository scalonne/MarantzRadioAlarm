import { IAlarmItemData } from "./IAlarmItemData";
import { AlarmDayType } from "./AlarmDayType";
import { AlarmTimeType } from "./AlarmTimeType";
import { RadioItemType } from "./RadioItemType";

export interface IAlarmData {
  days: IAlarmItemData<AlarmDayType[]>;
  time: IAlarmItemData<AlarmTimeType>;
  radio: IAlarmItemData<RadioItemType | null>;
  isActive: IAlarmItemData<boolean>;
}
