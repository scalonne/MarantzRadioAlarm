import * as React from 'react';

import { RadioAlarmSchedulerViewProps } from './RadioAlarmScheduler.types';

export default function RadioAlarmSchedulerView(props: RadioAlarmSchedulerViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
