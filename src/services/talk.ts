import { Callback } from '@types';
import Talk from 'talkjs';
import { User, UserOptions } from 'talkjs/all';
export default class TalkService {
  private static _instance: TalkService = new TalkService();
  private _isTalkReady: boolean = false;
  private appId: string = process.env.NEXT_PUBLIC_TALK_APP_ID;
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
      appId: this.appId,
      me: user,
    });
  }

  public createOneOnOneConversation({
    currentUser,
    otherUser,
  }: {
    currentUser: User;
    otherUser: User;
  }) {
    return Talk.oneOnOneId(currentUser, otherUser);
  }

  public history() {
    return Talk.getAppMetadata(this.appId);
  }
}
export const talkInstance = TalkService.Instance;
