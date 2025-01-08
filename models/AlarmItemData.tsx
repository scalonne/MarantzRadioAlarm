import { IAlarmItemData } from "../types/IAlarmItemData";
import { IStorageItem } from "../types/IStorageItem";

export class AlarmItemData<T> implements IAlarmItemData<T> {
  defaultValue: T;
  updateDefaultValue: (v: T) => Promise<void>;

  constructor(storageItem: IStorageItem<T>) {
    this.defaultValue = storageItem.value!;
    this.updateDefaultValue = storageItem.save!;
  }
}
