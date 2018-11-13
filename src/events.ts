export enum LampixEvents {
  WatchersRemoved = 'lx/watchers-removed',
  WatchersAdded = 'lx/watchers-added',
  WatchersPaused = 'lx/watchers-paused',
  WatchersResumed = 'lx/watchers-resumed',
  WatcherUpdated = 'lx/watcher-updated',
  LampixInfo = 'lx/lampix-info',
  GetApps = 'lx/get-apps',
  TransformCoordinates = 'lx/transform-coordinates',
  AppConfig = 'lx/app-config',
  Classification = 'lx/classification',
  Location = 'lx/location',
  FileWritten = 'lx/file-written',
  FileRead = 'lx/file-read',
  SwitchToApp = 'lx/switch-to-app'
}

export const eventToCallbackMap = {
  [LampixEvents.WatchersAdded]: 'onWatchersAdded',
  [LampixEvents.WatchersRemoved]: 'onWatchersRemoved',
  [LampixEvents.WatchersPaused]: 'onWatchersPaused',
  [LampixEvents.WatchersResumed]: 'onWatchersResumed',
  [LampixEvents.WatcherUpdated]: 'onWatcherUpdated',
  [LampixEvents.Classification]: 'onClassification',
  [LampixEvents.Location]: 'onLocation',
  [LampixEvents.LampixInfo]: 'onLampixInfo',
  [LampixEvents.GetApps]: 'onGetApps',
  [LampixEvents.AppConfig]: 'onAppConfig',
  [LampixEvents.TransformCoordinates]: 'onTransformCoordinates',
  [LampixEvents.FileRead]: 'onFileRead',
  [LampixEvents.FileWritten]: 'onFileWritten',
  [LampixEvents.SwitchToApp]: 'onSwitchApp'
};
