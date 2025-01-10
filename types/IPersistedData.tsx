export interface IPersistedData<T> {
  value: T;
  subscribeOnChange(listener: (value: T) => void): void;
  unsubscribeOnChange(listener: (value: T) => void): void;
}