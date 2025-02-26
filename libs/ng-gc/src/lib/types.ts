export type NgGCConfig = {
  apiKey: string;
}

export type NGGCSentimentResponse = {
  sentiment: string;
  rating: number;
  emoji: string;
  category: "positive" | "negative"
}