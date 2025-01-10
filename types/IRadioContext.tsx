import { IPersistedData } from "./IPersistedData";
import { StationType } from "./StationType";

export interface IRadioContext {
  stations: IPersistedData<StationType[]>;
  station: IPersistedData<StationType | null>;
}
