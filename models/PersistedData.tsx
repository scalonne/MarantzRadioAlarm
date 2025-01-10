import { IPersistedData } from "../types/IPersistedData";
import { IStorageItem } from "../types/IStorageItem";
import { EventEmitter } from 'expo-modules-core';

export class PersistedData<T> implements IPersistedData<T> {	
  private eventEmitter = new EventEmitter<Record<string, (value:T) => void>>();
  private _value: T;
  private storageItem: IStorageItem<T>;

  constructor(storageItem: IStorageItem<T>) {
    this.storageItem = storageItem;
    this._value = storageItem.value;
  }

  get value() {
    return this._value;
  }

  set value(newValue: T) {
    this._value = newValue;
    this.storageItem.save(newValue);
    this.eventEmitter.emit("onValueChanged", newValue);
  }

  subscribeOnChange(listener: (value: T) => void) {
     this.eventEmitter.addListener("onValueChanged", listener);
  }

  unsubscribeOnChange(listener: (value: T) => void) {
    this.eventEmitter.removeListener("onValueChanged", listener);
  }
}
