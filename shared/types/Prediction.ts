export interface Prediction {
  id: number;
  clipId: string;
  type: null;
  source: 'twitch' | 'whatsapp' | 'manual';
  date: string;
  day: string | null;
  topic: string;
  eventType: 'live' | 'offday';
  confidence: number | null;
  quote: string | null;
  quoteStart: number | null;
  createdAt: string;
}

export interface TodayPredictionResponse {
  prediction: Prediction | null;
  nextLivePrediction: Prediction | null;
  hasStreamedToday: boolean;
}

export interface PredictionInput {
  date: string;
  topic?: string | null;
  eventType: 'live' | 'offday';
}
