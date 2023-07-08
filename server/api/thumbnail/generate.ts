import sharp from "sharp";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { originalThumbnail, overlayId, flipX } = body

  const overlays = useStorage('assets:overlays')

  const thumbnail = await fetch(originalThumbnail);
  const overlay = await overlays.getItemRaw(`${overlayId}.png`)

  const overlayImg = sharp(overlay).flop(flipX)
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