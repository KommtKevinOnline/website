import sharp from "sharp";

function getFormItem(formData: any[], name: string) {
  return formData.find(item => item.name === name)
}

export default defineEventHandler(async (event) => {
  try {
    const data = await readMultipartFormData(event)

    if (data === undefined) {
      throw new Error('No data')
    }

    const overlayId = getFormItem(data, 'overlayId')?.data.toString()
    const flipX = getFormItem(data, 'flipX')?.data.toString() === 'true'

    const overlay = await fetch(`${process.env.AUTH_ORIGIN}/overlays/${overlayId}.png`);

    const overlayImg = sharp(await overlay.arrayBuffer()).flop(flipX)
    const metadata = await overlayImg.metadata()

    const imgBuffer = getFormItem(data, 'file')?.data || await (await fetch(getFormItem(data, 'originalThumbnail')?.data.toString())).arrayBuffer();

    const image = await sharp(imgBuffer)
      .resize(metadata.width, metadata.height)
      .composite([{
        input: await overlayImg.toBuffer()
      }])
      .toBuffer()

    setHeader(event, 'Content-Type', 'image/jpg')

    return image
  } catch (error) {
    return createError(error)
  }
})