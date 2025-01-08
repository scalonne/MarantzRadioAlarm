import { AlarmDayType } from "../types/AlarmDayType";
import { RadioItemType } from "../types/RadioItemType";
import { AlarmTimeType } from "../types/AlarmTimeType";
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from "expo-notifications";
import { playRadioAtAlarm } from '../providers/MarantzProvider';

export default class NotificationsController {
    private constructor() {
    }

    destroy() {
    }

    public static configureNotifications() {
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
      
    
    private static getNotificationId = (day: AlarmDayType) => `marantz-alarm-${day.weekDay}`;

    public static async cancelAsync(day: AlarmDayType) {
        await Notifications.cancelScheduledNotificationAsync(NotificationsController.getNotificationId(day));
    }

    public static async cancelAllAsync() {
        await Notifications.cancelAllScheduledNotificationsAsync();
    }

    public static async createManyAsync(days: AlarmDayType[], time: AlarmTimeType, radio: RadioItemType) {
        await Promise.all(days
            .filter(day => day.isActive)
            .map(async (day) => await NotificationsController.createAsync(day, time, radio)));
            var x = await Notifications.getAllScheduledNotificationsAsync();
            console.log('notifications count: ' + x.length);
    }

    public static async createAsync(day: AlarmDayType, time: AlarmTimeType, radio: RadioItemType) {
        const notificationId = NotificationsController.getNotificationId(day);

        await Notifications.scheduleNotificationAsync({
            content: {
                data: { action: 'playRadio', radio: radio },
            },
            trigger: {
                type: SchedulableTriggerInputTypes.WEEKLY,
                weekday: day.weekDay,
                hour: time.hours,
                minute: time.minutes,
            },
            identifier: notificationId
        }).then(o => console.log('success: ' + o))
            .catch(e => console.error('error: ' + e));
    };
}

