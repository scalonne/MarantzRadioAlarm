import * as Notifications from 'expo-notifications';
import { playRadioAtAlarm } from '../providers/MarantzProvider';

// Configure le gestionnaire global des notifications
export const configureNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: false,
      shouldPlaySound: false,
      shouldSetBadge: false,
    })
  });

  Notifications.addNotificationResponseReceivedListener((response) => {
    if (response.notification.request.content.data?.action === 'playRadio') {
      playRadioAtAlarm();
    }
  });
};
