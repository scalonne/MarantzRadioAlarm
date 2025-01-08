import * as TaskManager from 'expo-task-manager';
import MarantzController from '../services/MarantzController';

const TASK_NAME = "RADIO_ALARM_TASK";

TaskManager.defineTask(TASK_NAME, async ({ data, error } : { data: { radioUrl: string }, error: TaskManager.TaskManagerError | null }) => {
    if (error) {
        console.error("Erreur dans la tâche de fond :", error);
        return;
    }

    if (data?.radioUrl) {
        console.log("Lecture de la radio :", data.radioUrl);

        var controller = new MarantzController();

        controller.init();
        controller.play(data.radioUrl);
    }
});