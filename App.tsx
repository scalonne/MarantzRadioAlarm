import React, { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import { MarantzProvider } from './providers/MarantzProvider';
import * as SplashScreen from "expo-splash-screen";
import NotificationsController from './services/NotificationsController';
import { AppContext } from './contexts/AppContext';
import { useAppInitializer } from './hooks/useAppInitializer';

SplashScreen.preventAutoHideAsync();
NotificationsController.configureNotifications();

export default function App() {
  console.log("\n\nApp()\n");

  const [isLoading, context] = useAppInitializer();

  useEffect(() => {
    if (!isLoading)
      SplashScreen.hideAsync()
  }, [isLoading]);

  if (isLoading)
    return null;

  console.log(JSON.stringify(context?.alarm));

  return (
    <AppContext.Provider value={context}>
      <MarantzProvider>
        <HomeScreen />
      </MarantzProvider>
    </AppContext.Provider>
  );
}