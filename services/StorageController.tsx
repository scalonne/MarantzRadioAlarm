import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageController {
    private static instance: StorageController;

    constructor() {
        console.log("new StorageController");
    }

    static getInstance() {
        if (!StorageController.instance) {
            StorageController.instance = new StorageController();
        }

        return StorageController.instance;
    }

    public async GetAsync<T>(key: string): Promise<{ storageValue: T | undefined, storageSetterAsync: (value: T) => Promise<void> }> {
        const rawValue = await AsyncStorage.getItem(key);

        return { storageValue: rawValue ? JSON.parse(rawValue) : null, storageSetterAsync: (value: T) => this.SetAsync(key, value) };
    }

    public async SetAsync<T>(key: string, value: T) {
        console.log("setting " + key);
        await AsyncStorage.setItem(key, JSON.stringify(value));
    }
}

export const storage = StorageController.getInstance();