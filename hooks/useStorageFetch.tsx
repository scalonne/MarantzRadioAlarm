import { useEffect, useRef, useState } from "react";
import { storage } from "../services/StorageController";
import { IStorageItem } from "../types/IStorageItem";

// export const useStorageFetch = <T,>(key: string, defaultValue: T | null): IStorageItem<T> => {
//     const [value, setValue] = useState<T | null>(defaultValue);
//     const [setter, setSetter] = useState<(((v: T) => Promise<void>) | null)>(null);
//     const [isLoading, setIsLoading] = useState(true);
    
//     useEffect(() => {
//         async function fetch() {
//             const { storageValue, storageSetterAsync } = await storage.GetAsync<T>(key);
    
//             if (storageValue)
//                 setValue(storageValue);

//             //setSetter(storageSetterAsync);
//             setSetter(() => storageSetterAsync ?? (async (v: T) => console.warn('Setter not initialized')));
//             setIsLoading(false);

//             if (typeof storageSetterAsync === 'function') {
//                 console.log('storageSetterAsync is a function: ' + typeof storageSetterAsync);
//               } else {
//                 console.warn('storageSetterAsync is not a function:', storageSetterAsync);
//               }
//         }

//         fetch();
//     }, []); 

//     return { value, save: setter, isLoading };
// }

export const useStorageFetch = <T,>(key: string, defaultValue: T | null): IStorageItem<T> => {
    const value = useRef<T | null>(defaultValue);
    const setter = useRef<(((v: T) => Promise<void>) | null)>(null);
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

    return { value: value.current, save: setter.current, isLoading };
}