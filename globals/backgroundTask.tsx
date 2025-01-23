import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { MarantzController } from '../services/MarantzController';
import { StationType } from '../types/StationType';

// const TASK_NAME = "MARANTZ_RADIO_ALARM_TASK";

// TaskManager.defineTask(TASK_NAME, async ({ data, error } : { data: { action: string, radio: StationType }, error: TaskManager.TaskManagerError | null }) => {
//     console.log('Received a notification in the background!');

//     fetch("http://192.168.1.69:5295/", {
//         method: 'POST',
//         body: JSON.stringify({Content: "notification received from background task"}),
//         headers: {'Content-Type': 'application/json'}
//       });      

//     if (error) {
//         console.error("Erreur dans la tâche de fond :", error);
//         return;
//     }

//     console.log('Received a notification in the background!');
    
//     if (data?.radio.streamUri) {
//         console.log("Lecture de la radio :", data.radio.streamUri);

//         var controller = MarantzController.getInstance();

//         controller.init();
//         controller.play(data.radio.streamUri);
//     }
// });

// Notifications.registerTaskAsync(TASK_NAME);