import { Callback } from '@types';
import { DependencyList, useCallback, useEffect, useState } from 'react';
import { talkInstance } from 'services';
interface UseTalkProps {
  fn?: Callback;
}
export function useTalk({ fn }: UseTalkProps = {}, deps: DependencyList = []) {
  const [isTalkLoaded, setIsTalkLoaded] = useState(talkInstance.isTalkReady);

  talkInstance.ready(() => {
    setIsTalkLoaded(true);
  });

  const savedFnCallback = useCallback(() => fn, []);

  useEffect(() => {
    if (isTalkLoaded) {
      console.log('🚀 ~ isTalkLoaded:', isTalkLoaded);
      // Safe to use the SDK here
      savedFnCallback && savedFnCallback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTalkLoaded, ...deps]);

  return isTalkLoaded;
}
