import { Callback } from '@types';
import { useUserMeQuery } from 'queries';
import { DependencyList, useCallback, useEffect, useState } from 'react';
import { talkInstance } from 'services';
import { Session } from 'talkjs/all';
interface UseTalkProps {
  fn?: Callback;
}
export function useTalk({ fn }: UseTalkProps = {}, deps: DependencyList = []) {
  const [isTalkLoaded, setIsTalkLoaded] = useState(talkInstance.isTalkReady);

  useEffect(() => {
    talkInstance.ready(() => {
      setIsTalkLoaded(true);
    });
  }, []);

  const savedFnCallback = useCallback(() => fn, []);

  useEffect(() => {
    if (isTalkLoaded) {
      // Safe to use the SDK here
      savedFnCallback && savedFnCallback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTalkLoaded, ...deps]);

  return isTalkLoaded;
}

/**
 *
 * @deprecated useTalkContext instead.
 */
export function useTalkSession() {
  const userMeQuery = useUserMeQuery({ enabled: false });
  const [talkSession, setTalkSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!userMeQuery.data) return;

    const { id, name, personalMail, avatar, role } = userMeQuery.data;
    const currentUser = talkInstance.createUser({
      id: id,
      name,
      email: personalMail,
      // photoUrl: '',
      // welcomeMessage: 'Hello!',
      // role
    });

    const session = talkInstance.createSession(currentUser);
    console.log('🚀 ~ session:', session);
    setTalkSession(session);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => session.destroy();
  }, [userMeQuery.data]);

  return talkSession;
}
