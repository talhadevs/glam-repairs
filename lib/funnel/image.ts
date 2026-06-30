// Compress an uploaded image into a small JPEG data URL so it can be persisted
// in the funnel store (localStorage) and reused on later steps / the report.
export async function fileToCompressedDataUrl(
  file: File,
  maxSize = 640,
  quality = 0.72,
): Promise<string> {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = objectUrl;
    });

    const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
    const width = Math.round(image.width * scale);
    const height = Math.round(image.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return objectUrl;

    ctx.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", quality);
  } catch {
    return objectUrl;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
