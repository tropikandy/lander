import { MediaAdapter, MediaItem } from '@/lib/types/media';

export class MockMediaAdapter implements MediaAdapter {
  async getNowPlaying(): Promise<MediaItem | null> {
    // Simulate a random state: 50% chance of nothing playing
    if (Math.random() > 0.5) return null;

    return {
      id: 'mock-1',
      title: 'Interstellar',
      type: 'movie',
      state: 'playing',
      progress: 45,
      subtitle: 'Christopher Nolan',
      user: 'Tropi',
      // Placeholder art
      art: 'https://image.tmdb.org/t/p/w500/gEU2QniL6C971PNJySlKVOTfbuv.jpg' 
    };
  }

  async getDownloads(): Promise<MediaItem[]> {
    return [
      {
        id: 'dl-1',
        title: 'Severance',
        type: 'episode',
        state: 'downloading',
        progress: 78,
        subtitle: 'S02E01',
      }
    ];
  }
}
