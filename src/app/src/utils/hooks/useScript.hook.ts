import { useState, useEffect } from 'react';

export interface ScriptProps {
  src: HTMLScriptElement['src'];
}

type ScriptError = ErrorEvent | null;

export const useScript = (src: HTMLScriptElement['src']): [boolean, ScriptError] => {
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const [scriptError, setScriptError] = useState<ScriptError>(null);

  useEffect(() => {
    const isBrowser: boolean = typeof window !== 'undefined' && typeof window.document !== 'undefined';;

    if (!isBrowser) {
      return;
    }

    const scriptElement: HTMLScriptElement = document.createElement('script');
    scriptElement.setAttribute('src', src);

    const handleLoad = () => {
      setIsScriptLoaded(true);
    };

    const handleError = (error: ErrorEvent) => {
      setScriptError(error);
    };

    scriptElement.addEventListener('load', handleLoad);
    scriptElement.addEventListener('error', handleError);

    document.body.appendChild(scriptElement);

    return () => {
      scriptElement.removeEventListener('load', handleLoad);
      scriptElement.removeEventListener('error', handleError);
    };
    // we need to ignore the attributes as they're a new object per call, so we'd never skip an effect call
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return [isScriptLoaded, scriptError];
}