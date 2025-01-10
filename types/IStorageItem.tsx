export interface IStorageItem<T> {
    value: T;
    save: (v: T) => Promise<void>;
    isLoading: boolean;
}