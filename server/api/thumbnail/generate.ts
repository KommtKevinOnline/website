import sharp from "sharp";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { originalThumbnail, overlayId, flipX } = body

  const thumbnail = await fetch(originalThumbnail);
  const overlay = await fetch(`${process.env.AUTH_ORIGIN}/overlays/${overlayId}.png`);

  const overlayImg = sharp(await overlay.arrayBuffer()).flop(flipX)
  const metadata = await overlayImg.metadata()

  const image = await sharp(await thumbnail.arrayBuffer())
    .resize(metadata.width, metadata.height)
    .composite([{ 
      input: await overlayImg.toBuffer()
    }])
  .toBuffer()

  setHeader(event, 'Content-Type', 'image/jpg')

  return image
})