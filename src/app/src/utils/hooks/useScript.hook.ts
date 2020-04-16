import { useEffect, useState } from 'react';

let cachedScripts: any[] = [];

export const useScript = (src: string) => {
  const [state, setState] = useState({
    isScriptLoaded: false,
    loadScriptError: false,
  });

  useEffect(
    () => {
      // If cachedScripts array already includes src that means another instance ...
      // ... of this hook already loaded this script, so no need to load again.
      if (cachedScripts.includes(src)) {
        setState({
          isScriptLoaded: true,
          loadScriptError: false,
        });
      } else {
        cachedScripts.push(src);

        let script = document.createElement('script');
        script.src = src;
        script.async = true;

        const onScriptLoad = () => {
          setState({
            isScriptLoaded: true,
            loadScriptError: false,
          });
        };

        const onScriptError = () => {
          // Remove from cachedScripts we can try loading again
          const index: number = cachedScripts.indexOf(src);

          if (index >= 0) {
            cachedScripts.splice(index, 1);
          }

          script.remove();

          setState({
            isScriptLoaded: true,
            loadScriptError: true,
          });
        };

        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptError);

        document.body.appendChild(script);

        // Remove event listeners on cleanup
        return () => {
          script.removeEventListener('load', onScriptLoad);
          script.removeEventListener('error', onScriptError);
        };
      }
    },
    [src] // Only re-run effect if script src changes
  );

  return [state.isScriptLoaded, state.loadScriptError];
};
