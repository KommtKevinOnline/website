export type Prediction = {
  id: number;
  clipId: string;
  type: null;
  source: 'twitch' | 'whatsapp';
  date: string;
  topic: string;
  eventType: 'live' | 'offday';
  createdAt: string;
};
