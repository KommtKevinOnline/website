import sharp from "sharp";

export default defineEventHandler(async (event) => {
  if (!event.context.params) {
    throw new Error('Missing Params')
  }

  const overlays = useStorage('assets:server:overlays')
  const overlay = await overlays.getItemRaw(`${event.context.params.id}.png`)

  return overlay
})