import { useEffect, useRef, useState } from "react";
import { storage } from "../services/StorageController";
import { IStorageItem } from "../types/IStorageItem";

export const useStorageFetch = <T,>(key: string, defaultValue: T): IStorageItem<T> => {
    const value = useRef<T>(defaultValue);
    const setter = useRef<(v: T) => Promise<void>>();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        async function fetch() {
            const { storageValue, storageSetterAsync } = await storage.GetAsync<T>(key);
    
            if (storageValue)
                value.current = storageValue;

            setter.current = storageSetterAsync;
            setIsLoading(false);
        }

        fetch();
    }, []); 

    return { value: value.current, save: setter.current!, isLoading };
}