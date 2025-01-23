import React, { StrictMode, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { HomeScreen } from './screens/HomeScreen';
import * as SplashScreen from "expo-splash-screen";
import { NotificationsController } from './services/NotificationsController';
import { useAppInitializer } from './hooks/useAppInitializer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './globals/backgroundTask';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { MarantzController } from './services/MarantzController';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();
NotificationsController.configureNotifications();

const TASK_NAME = "MARANTZ_RADIO_ALARM_TASK";

TaskManager.defineTask(TASK_NAME, async ({ data, error }: { data: any, error: TaskManager.TaskManagerError | null }) => {
  console.log('Received a notification in the background!');

  fetch("http://192.168.1.69:5295/", {
    method: 'POST',
    body: JSON.stringify({ Content: "notification received from background task" }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (error) {
    console.error("Erreur dans la tâche de fond :", error);
    return;
  }

  console.log('Received a notification in the background!');

  if (data?.radio.streamUri) {
    console.log("Lecture de la radio :", data.radio.streamUri);

    var controller = MarantzController.getInstance();

    controller.init();
    controller.play(data.radio.streamUri);
  }
});

Notifications.registerTaskAsync(TASK_NAME)
  .then(() => {
    console.log(
      `Notifications.registerTaskAsync success: ${TASK_NAME}`,
    );
  })
  .catch((reason) => {
    console.log(`Notifications registerTaskAsync failed: ${reason}`);
  });

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