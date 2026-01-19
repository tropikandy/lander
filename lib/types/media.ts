export interface MediaItem {
  id: string;
  title: string;
  type: 'movie' | 'episode' | 'track';
  state: 'playing' | 'paused' | 'buffering' | 'downloading';
  progress: number; // 0-100
  art?: string; // URL to poster/backdrop
  subtitle?: string; // "S01E05 - The Heist" or Artist Name
  user?: string; // Who is watching
}

export interface MediaAdapter {
  getNowPlaying(): Promise<MediaItem | null>;
  getDownloads(): Promise<MediaItem[]>;
}
