import MarantzController from "../services/MarantzController";
import { IAlarmData } from "./IAlarmData";

export interface IContextData {
  marantzController: MarantzController;
  alarm: IAlarmData;
}
