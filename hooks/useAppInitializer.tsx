import { MarantzController } from "../services/MarantzController";
import { AlarmDayType } from "../types/AlarmDayType";
import { StationType } from "../types/StationType";
import { useEffect, useRef, useState } from "react";
import * as FileSystem from 'expo-file-system';
import { useStore } from "./useAlarmStore";
import { useShallow } from "zustand/react/shallow";

export const useAppInitializer = (): [isLoading: boolean] => {
  const hasHydrated = useStore(useShallow((state) => state._hasHydrated));
  const [appInitialized, setAppInitialized] = useState(false);

  // to delete
  const marantzController = useRef<MarantzController | null>(null);

  const defaultDays: AlarmDayType[] = [
    { label: 'Lundi', isActive: true, weekDay: 2 },
    { label: 'Mardi', isActive: true, weekDay: 3 },
    { label: 'Mercredi', isActive: true, weekDay: 4 },
    { label: 'Jeudi', isActive: true, weekDay: 5 },
    { label: 'Vendredi', isActive: true, weekDay: 6 },
    { label: 'Samedi', isActive: false, weekDay: 7 },
    { label: 'Dimanche', isActive: false, weekDay: 1 },
  ];

  const defaultStations: StationType[] = [
    {
      id: 1,
      uid: "33960c43-0464-44b4-abfa-73591ebf647f",
      name: 'France Inter',
      streamUri: 'https://stream.radiofrance.fr/franceinter/franceinter_hifi.m3u8?id=radiofrance',
      iconUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/France_Inter_logo_2021.svg/1200px-France_Inter_logo_2021.svg.png',
      localIconUri: null
    },
    {
      id: 2,
      uid: "6a1440b2-e6f0-11e9-a96c-52543be04c81",
      name: 'France Culture',
      streamUri: 'http://icecast.radiofrance.fr/franceculture-hifi.aac',
      iconUri: 'https://upload.wikimedia.org/wikipedia/fr/thumb/c/c9/France_Culture_-_2008.svg/1024px-France_Culture_-_2008.svg.png',
      localIconUri: null
    },
    {
      id: 3,
      uid: "932eb148-e6f6-11e9-a96c-52543be04c81",
      name: 'FIP',
      streamUri: 'http://direct.fipradio.fr/live/fip-hifi.aac',
      iconUri: 'https://upload.wikimedia.org/wikipedia/fr/thumb/d/d5/FIP_logo_2005.svg/1024px-FIP_logo_2005.svg.png',
      localIconUri: null
    },
  ];

  const downloadIcons = async () => {
    const stations = useStore.getState().stations;
    const STATIONS_FOLDER = 'stations';

    await FileManager.createDirectoryAsync(STATIONS_FOLDER);

    const stationFolders = await FileManager.getSubDirectoriesAsync(STATIONS_FOLDER);

    console.log("stationFolders: ", JSON.stringify(stationFolders));
    console.log("stationsStorage: ", stations);

    const toRemove = stationFolders.filter(o => !stations.find(p => p.uid === o));
    const toDownload = stations.filter(o => o.iconUri && (!o.localIconUri || !stationFolders.find(p => p === o.uid)));

    console.log("toRemove: ", JSON.stringify(toRemove));
    console.log("toDownload: ", JSON.stringify(toDownload));

    await Promise.all(toRemove.map(async o =>
      await FileManager.deleteFileAsync(`${STATIONS_FOLDER}/${o}`)
    ));

    if (toDownload.length > 0) {
      await Promise.all(toDownload.map(async o =>
        await FileManager
          .downloadImage(o.iconUri!, `${STATIONS_FOLDER}/${o.uid}`, "icon")
          .then((iconLocalPath) => { o.localIconUri = iconLocalPath; })
      )).then(() => {
        useStore.setState({ stations: stations });
      });
    }
  }

  useEffect(() => {
    if (!hasHydrated)
      return;

    downloadIcons()
      .catch((error) => console.error("Error downloading icons: ", error))
      .finally(() => {
        setAppInitialized(true);
      });
  }, [hasHydrated]);

  return [appInitialized];
}

export class FileManager {
  static ROOT_DIRECTORY = FileSystem.documentDirectory;

  private constructor() {
  }

  public static async createDirectoryAsync(directory: string): Promise<void> {
    const path = `${this.ROOT_DIRECTORY}${directory}`;
    const pathFi = await FileSystem.getInfoAsync(path);

    if (!pathFi.exists || !pathFi.isDirectory) {
      await FileSystem.makeDirectoryAsync(path, { intermediates: true });

      console.log(`directory ${directory} created at ${path}`);
    }
  }

  public static async getSubDirectoriesAsync(directory: string): Promise<string[]> {
    const path = `${this.ROOT_DIRECTORY}${directory}`;
    const pathFi = await FileSystem.getInfoAsync(path);

    if (!pathFi.exists || !pathFi.isDirectory) {
      console.error(`directory ${directory} not found`);
      return [];
    }

    const content = await FileSystem.readDirectoryAsync(path);
    const subDirectories = content.filter(async (o) => {
      const fi = await FileSystem.getInfoAsync(o);

      return fi.exists && fi.isDirectory;
    });

    console.log(`- ${path}`);
    subDirectories.forEach(o => console.log(`-- ${o}`));

    return subDirectories;
  }

  public static async deleteFileAsync(fileUri: string): Promise<void> {
    const path = `${this.ROOT_DIRECTORY}${fileUri}`;

    await FileSystem.deleteAsync(path)
      .then(() => console.log(`file ${fileUri} removed`))
      .catch((error) => console.error("Error deleting file: ", error));
  }

  public static async getFileInfoAsync(fileUri: string): Promise<FileSystem.FileInfo> {
    return await FileSystem.getInfoAsync(fileUri);
  }

  private static async getMimeType(url: string): Promise<string | null> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('Content-Type');

      return contentType;
    } catch (error) {
      console.error("Failed to fetch MIME type:", error);
      return null;
    }
  }

  public static async downloadImage(imageUrl: string, relativePath: string, fileNameWithoutExtension: string): Promise<string | null> {
    try {
      const mime = await this.getMimeType(imageUrl);
      const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg'];

      if (!mime || !allowedMimes.includes(mime) || fileNameWithoutExtension.includes('.')) {
        return null;
      }

      const extension = mime.split('/')[1];
      const directory = `${FileSystem.documentDirectory}${relativePath}`;
      const filePath = `${directory}/${fileNameWithoutExtension}.${extension}`;

      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      await FileSystem.downloadAsync(imageUrl, filePath);

      console.log(`image downloaded: ${filePath}`);

      return filePath;
    } catch (error) {
      console.error("Error downloading the image: ", error);

      return null;
    }
  }
}
