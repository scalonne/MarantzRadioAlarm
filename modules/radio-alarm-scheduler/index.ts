// Reexport the native module. On web, it will be resolved to RadioAlarmSchedulerModule.web.ts
// and on native platforms to RadioAlarmSchedulerModule.ts
export { default } from './src/RadioAlarmSchedulerModule';
export { default as RadioAlarmSchedulerView } from './src/RadioAlarmSchedulerView';
export * from  './src/RadioAlarmScheduler.types';
