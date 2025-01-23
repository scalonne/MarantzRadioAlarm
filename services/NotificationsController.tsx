import { AlarmDayType } from "../types/AlarmDayType";
import { StationType } from "../types/StationType";
import { AlarmTimeType } from "../types/AlarmTimeType";
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from "expo-notifications";
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from "react-native";
import { AmplifierState, MarantzController } from "./MarantzController";

export class NotificationsController {
  private constructor() {
  }

  destroy() {
  }

  public static configureNotifications() {
    Notifications.setNotificationHandler({      
      handleNotification: async () => ({
        priority: Notifications.AndroidNotificationPriority.MAX,
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
      })
    });

    Notifications.getLastNotificationResponseAsync().then((response) => {
      fetch("http://192.168.1.69:5295/", {
        method: 'POST',
        body: JSON.stringify({Content: "last notification = " + JSON.stringify(response)}),
        headers: {'Content-Type': 'application/json'}
      });      
    });

    const subscription = Notifications.addNotificationReceivedListener((response) => {
      fetch("http://192.168.1.69:5295/", {
        method: 'POST',
        body: JSON.stringify({Content: "notification received"}),
        headers: {'Content-Type': 'application/json'}
      });      

      console.log('notification received bbbb');
      console.log(JSON.stringify(response));
      return;
      if (response.request.content.data?.action === 'playRadio') {



        var amplifier = MarantzController.getInstance();
        if (amplifier.state == AmplifierState.Disconnected) {
          amplifier.init().then(() => {
            amplifier.play(response.request.content.data.radio.streamUri);
          });
        }
      }
    });

    function handleRegistrationError(errorMessage: string) {
      alert(errorMessage);
      throw new Error(errorMessage);
    }

    const test = async () => {
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      if (Device.isDevice) {
        console.log('device');
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        console.log('A');
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          console.log('B');

          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        console.log('C');

        if (finalStatus !== 'granted') {
          handleRegistrationError('Permission not granted to get push token for push notification!');
          return;
        }
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
          handleRegistrationError('Project ID not found');
        }
        try {
          //const pushTokenString = (
          //  await Notifications.getExpoPushTokenAsync({
          //    projectId,
          //  })
          //).data;
          //console.log(pushTokenString);
          //return pushTokenString;
          return "";
        } catch (e: unknown) {
          handleRegistrationError(`${e}`);
        }
      } else {

        handleRegistrationError('Must use physical device for push notifications');
      }
    }

    //test();
  };

  private static getNotificationId = (day: number) => `marantz-alarm-${day}`;

  public static async cancelAsync(day: number) {
    await Notifications.cancelScheduledNotificationAsync(NotificationsController.getNotificationId(day));
  }

  public static async cancelAllAsync() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  public static async createManyAsync(days: boolean[], time: AlarmTimeType, radio: StationType) {
    await Promise.all(days
      .map((active, index) => ({ index, active }))
      .filter(day => day.active)
      .map(async (day) => await NotificationsController.createAsync(day.index, time, radio)));
    var x = await Notifications.getAllScheduledNotificationsAsync();
    console.log('notifications count: ' + x.length);
  }

  public static async createAsync(day: number, time: AlarmTimeType, radio: StationType) {
    const notificationId = NotificationsController.getNotificationId(day);

    console.log('create notif ' + day + ' ' + time.hours + ':' + time.minutes);

    Notifications.dismissNotificationAsync(notificationId)
    .then(() => console.log('notification cancelled' + notificationId))
    .catch((error) => console.log('notification not cancelled' + error));

    Notifications.cancelScheduledNotificationAsync(notificationId)
    .then(() => console.log('notification cancelled' + notificationId))
    .catch((error) => console.log('notification not cancelled' + error));

    let date = new Date();
    date.setSeconds(date.getSeconds() + 10);

    try {
      const response = await fetch("http://192.168.1.69:5295/", {
        method: 'POST',
        body: JSON.stringify({Content: "notification created"}),
        headers: {'Content-Type': 'application/json'}
      });
      if (!response.ok) {
        console.error("Erreur côté serveur :", response.status, response.statusText);
      } else {
        console.log("Requête réussie !");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }  

    await Notifications.scheduleNotificationAsync({
      content: {
        //title: 'HELLO',
        //body: `Alarm for ${radio.name} at ${time.hours}:${time.minutes}`,
        data: { action: 'playRadio', radio: radio },
      },
      trigger: {
        //channelId: 'default',        
        type: SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 10,
        //date: date
      },
      //trigger: {
      //  channelId: 'default',
      //  type: SchedulableTriggerInputTypes.WEEKLY,
      //  weekday: day.weekDay,
      //  hour: time.hours,
      //  minute: time.minutes,
      //},
      identifier: notificationId
    }).then(o => console.log('success: ' + o))
      .catch(e => console.error('error: ' + e));
  };
}

