import { requireNativeView } from 'expo';
import * as React from 'react';

import { RadioAlarmSchedulerViewProps } from './RadioAlarmScheduler.types';

const NativeView: React.ComponentType<RadioAlarmSchedulerViewProps> =
  requireNativeView('RadioAlarmScheduler');

export default function RadioAlarmSchedulerView(props: RadioAlarmSchedulerViewProps) {
  return <NativeView {...props} />;
}
