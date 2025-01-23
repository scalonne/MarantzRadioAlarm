import { NativeModule, requireNativeModule } from 'expo';

import { RadioAlarmSchedulerModuleEvents } from './RadioAlarmScheduler.types';

declare class RadioAlarmSchedulerModule extends NativeModule<RadioAlarmSchedulerModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<RadioAlarmSchedulerModule>('RadioAlarmScheduler');
