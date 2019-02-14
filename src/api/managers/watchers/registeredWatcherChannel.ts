import {
  ResponsePayloads,
  WatcherID
} from '../../../types';

import { waitForAPI } from '../../waitForAPI';
import { LampixEvents } from '../../../events';
import { listen } from '../communication/settler';

const send = (watcherId: WatcherID, data: any) => {
  const { promise, request } = listen<ResponsePayloads.WatcherChannelUpdated>(LampixEvents.WatcherChannelUpdated, {
    data,
    watcher_id: watcherId
  });

  return waitForAPI()
    .then(() => {
      window._lampix_internal.watcher_channel_update(JSON.stringify(request));
      return promise;
    });
};

const registeredWatcherChannel = (watcherId: WatcherID) => {
  return {
    send: send.bind(null, watcherId)
  };
};

export { registeredWatcherChannel };
