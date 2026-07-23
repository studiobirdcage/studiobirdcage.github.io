import sharp from "sharp";

/**
 * Reads the intrinsic dimensions of an image stored under `public/`.
 * Used to supply `width`/`height` to Astro's `<Image />` component for
 * images that live in the `public/` directory (which Astro cannot infer).
 */
export async function imageSize(publicPath: string) {
  const meta = await sharp(`public${publicPath}`).metadata();
  return { width: meta.width ?? 0, height: meta.height ?? 0 };
}
