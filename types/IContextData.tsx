import { IAmplifierController, MarantzController } from "../services/MarantzController";
import { IAlarmContext } from "./IAlarmContext";
import { IRadioContext } from "./IRadioContext";

export interface IContextData {
  amplifierController: IAmplifierController;
  radio: IRadioContext
  alarm: IAlarmContext;
}
