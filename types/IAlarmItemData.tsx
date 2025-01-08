export interface IAlarmItemData<T> {
  defaultValue: T;
  updateDefaultValue: (v: T) => Promise<void>;
}
