import { useEffect, useRef, useState } from "react";

const ASSETS_TO_PRELOAD = [
  "/models/bottle.obj",
  "/models/bottle/color.jpg",
  "/models/bottle/alpha.jpg",
  "/models/bottle/bump.jpg",
  "/models/bottle/roughness.jpg",
  "/models/bottle/env.jpg",
];

export function usePreloadAssets() {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const totalAssets = ASSETS_TO_PRELOAD.length;

    // Track individual asset progress (bytes loaded / total)
    const assetProgress = new Array<number>(totalAssets).fill(0);

    function updateOverallProgress() {
      const overall =
        assetProgress.reduce((sum, p) => sum + p, 0) / totalAssets;
      setProgress(Math.round(overall * 100));
    }

    const promises = ASSETS_TO_PRELOAD.map((url, index) => {
      return new Promise<void>((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob";

        xhr.onprogress = (event) => {
          if (event.lengthComputable) {
            assetProgress[index] = event.loaded / event.total;
          } else {
            // If length isn't computable, use a rough estimate
            assetProgress[index] = Math.min(assetProgress[index] + 0.1, 0.9);
          }
          updateOverallProgress();
        };

        xhr.onload = () => {
          assetProgress[index] = 1;
          updateOverallProgress();

          // Pre-decode images so they're in browser cache
          if (url.endsWith(".jpg") || url.endsWith(".png")) {
            const blob = xhr.response as Blob;
            const objectUrl = URL.createObjectURL(blob);
            const img = new Image();
            let didFinish = false;
            let timeoutId = 0;

            const finishImagePreload = () => {
              if (didFinish) return;

              didFinish = true;
              window.clearTimeout(timeoutId);
              URL.revokeObjectURL(objectUrl);
              resolve();
            };

            timeoutId = window.setTimeout(finishImagePreload, 3000);
            img.decoding = "async";
            img.onload = finishImagePreload;
            img.onerror = finishImagePreload;
            img.src = objectUrl;
          } else {
            resolve();
          }
        };

        xhr.onerror = () => {
          // Don't block preloader on failed assets
          assetProgress[index] = 1;
          updateOverallProgress();
          resolve();
        };

        xhr.send();
      });
    });

    Promise.all(promises).then(() => {
      setProgress(100);
      setIsReady(true);
    });
  }, []);

  return { progress, isReady };
}
