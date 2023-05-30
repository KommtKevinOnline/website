export function use7tv() {
  const getEmoteUrl = (emoteId: string) => {
    return `https://cdn.7tv.app/emote/${emoteId}/4x.webp`;
  };

  return { getEmoteUrl }
}