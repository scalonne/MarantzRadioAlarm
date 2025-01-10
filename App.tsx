import React, { createContext, useContext, useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import { MarantzProvider } from './providers/MarantzProvider';
import * as SplashScreen from "expo-splash-screen";
import { NotificationsController } from './services/NotificationsController';
import { useAppInitializer } from './hooks/useAppInitializer';
import { IContextData } from './types/IContextData';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();
NotificationsController.configureNotifications();

export const AppContext = createContext<IContextData | null>(null);
export const useAppContext = () => useContext(AppContext)!;

export default function App() {
  const [isLoading, context] = useAppInitializer();

  useEffect(() => {
    if (!isLoading)
      SplashScreen.hideAsync();
  }, [isLoading]);

  return isLoading ? null : (
    <AppContext.Provider value={context}>
      <MarantzProvider>
        <GestureHandlerRootView >
          <HomeScreen />
        </GestureHandlerRootView>
      </MarantzProvider>
    </AppContext.Provider>
  );
}