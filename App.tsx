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
  const [appInitialized] = useAppInitializer();

  useEffect(() => {
    if (appInitialized) {
      SplashScreen.hideAsync();
    }
  }, [appInitialized]);

  console.debug(" - App: appInitialized ", appInitialized);

  return !appInitialized ? null : (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <GestureHandlerRootView >
          <HomeScreen />
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});