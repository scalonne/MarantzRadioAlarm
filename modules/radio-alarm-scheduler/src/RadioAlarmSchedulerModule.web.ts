import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './RadioAlarmScheduler.types';

type RadioAlarmSchedulerModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class RadioAlarmSchedulerModule extends NativeModule<RadioAlarmSchedulerModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(RadioAlarmSchedulerModule);
