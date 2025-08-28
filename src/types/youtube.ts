export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  channelTitle?: string;
}

export interface YouTubeFeedResponse {
  videos: YouTubeVideo[];
  error?: string;
}
