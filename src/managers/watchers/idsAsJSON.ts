import {
  RegisteredWatcher
} from '../../types';

export const idsAsJSON = (rwList: RegisteredWatcher[]) => JSON.stringify(rwList.map((rw) => rw.state._id));
