import { Callback } from '@types';
import Talk from 'talkjs';
import { User, UserOptions } from 'talkjs/all';
export default class TalkService {
  private static _instance: TalkService = new TalkService();
  private _isTalkReady: boolean = false;
  constructor() {
    if (TalkService._instance) {
      throw new Error('Error: Instantiation failed: Use Instance() instead of new.');
    }
    TalkService._instance = this;
  }

  public static get Instance() {
    return this._instance;
  }

  public get isTalkReady() {
    return this._isTalkReady;
  }

  public async ready(callback?: Callback) {
    if (!this.isTalkReady) {
      await Talk.ready;
      callback && callback();
    }
    this._isTalkReady = true;
  }

  public createUser(options: UserOptions) {
    return new Talk.User(options);
  }

  public createSession(user: User) {
    return new Talk.Session({
      appId: process.env.NEXT_PUBLIC_TALK_APP_ID,
      me: user,
    });
  }

  public createConversation({ currentUser, otherUser }: { currentUser: User; otherUser: User }) {
    return Talk.oneOnOneId(currentUser, otherUser);
  }
}
export const talkInstance = TalkService.Instance;
