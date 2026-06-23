export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function waitForDomImages(): Promise<void> {
  const images = Array.from(document.images);

  if (images.length === 0) {
    return Promise.resolve();
  }

  return Promise.all(
    images.map(
      (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            }),
    ),
  ).then(() => undefined);
}

function promoteLazyImagesToEager() {
  document.querySelectorAll('img[loading="lazy"]').forEach((node) => {
    (node as HTMLImageElement).loading = "eager";
  });
}

export function waitForPreloadImages(urls: string[]): Promise<void> {
  return Promise.all(urls.map(preloadImage)).then(() => undefined);
}

export async function waitForAllPageImages(
  preloadUrls: string[] = [],
  pollIntervalMs = 200,
  stableChecksRequired = 3,
): Promise<void> {
  await Promise.all(preloadUrls.map(preloadImage));

  promoteLazyImagesToEager();

  let stableChecks = 0;
  let previousCount = -1;

  while (stableChecks < stableChecksRequired) {
    await waitForDomImages();

    const currentCount = document.images.length;

    if (currentCount === previousCount) {
      stableChecks += 1;
    } else {
      stableChecks = 0;
      previousCount = currentCount;
      promoteLazyImagesToEager();
    }

    if (stableChecks < stableChecksRequired) {
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    }
  }

  await Promise.all(preloadUrls.map(preloadImage));
  await waitForDomImages();
}
