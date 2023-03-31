import { Callback } from '@types';
import Talk from 'talkjs';
import { UserOptions } from 'talkjs/all';
export default class TalkService {
  constructor() {}
  public async loadModule(callback?: Callback) {
    await Talk.ready;
    callback && callback();
  }

  public createUser(options: UserOptions) {
    return new Talk.User(options);
  }
}
new TalkService().loadModule();
