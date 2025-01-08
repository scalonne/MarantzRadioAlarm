export interface IStorageItem<T> {
    value: T | null;
    save: ((v: T) => Promise<void>) | null;
    //fetchingPromise: Promise<void>;
    isLoading: boolean;
}