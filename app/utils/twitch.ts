export function getThumbnailUrl(url: string, width: number, height: number) {
  return url
    .replace('%{width}', width.toString())
    .replace('%{height}', height.toString());
}
