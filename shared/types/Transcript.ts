export type Transcript = {
  text: string;
  segments: [
    {
      id: number;
      seek: number;
      start: number;
      end: number;
      text: string;
      tokens: number[];
      temperature: number;
      avg_logprob: number;
      compression_ratio: number;
      no_speech_prob: number;
      language?: 'de';
    },
  ];
};
