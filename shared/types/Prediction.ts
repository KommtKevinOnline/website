export interface Prediction {
  id: number;
  clipId: string;
  type: null;
  source: 'twitch' | 'whatsapp';
  date: string;
  topic: string;
  eventType: 'live' | 'offday';
  createdAt: string;
}

export interface TodayPredictionResponse {
  prediction: Prediction | null;
  nextLivePrediction: Prediction | null;
  hasStreamedToday: boolean;
}
