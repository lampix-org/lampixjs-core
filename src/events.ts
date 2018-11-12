export enum LampixEvents {
  WatcherRemoved = 'lx/watcher-removed',
  WatcherAdded = 'lx/watcher-added',
  WatcherPaused = 'lx/watcher-paused',
  WatcherResumed = 'lx/watcher-resumed',
  WatcherUpdated = 'lx/watcher-updated',
  LampixInfo = 'lx/lampix-info',
  GetApps = 'lx/get-apps',
  TransformCoordinates = 'lx/transform-coordinates',
  AppConfig = 'lx/app-config',
  Classification = 'lx/classification',
  Location = 'lx/location',
  FileWritten = 'lx/file-written',
  FileRead = 'lx/file-read'
}

export const eventToCallbackMap = {
  [LampixEvents.WatcherAdded]: 'onWatcherAdded',
  [LampixEvents.WatcherRemoved]: 'onWatcherRemoved',
  [LampixEvents.WatcherPaused]: 'onWatcherPaused',
  [LampixEvents.WatcherResumed]: 'onWatcherResumed',
  [LampixEvents.WatcherUpdated]: 'onWatcherUpdated',
  [LampixEvents.Classification]: 'onClassification',
  [LampixEvents.Location]: 'onLocation',
  [LampixEvents.LampixInfo]: 'onLampixInfo',
  [LampixEvents.GetApps]: 'onGetApps',
  [LampixEvents.AppConfig]: 'onAppConfig',
  [LampixEvents.TransformCoordinates]: 'onTransformCoordinates',
  [LampixEvents.FileRead]: 'onFileRead',
  [LampixEvents.FileWritten]: 'onFileWritten'
};
