// Instagram Types - הגדרות טיפוסים עבור Instagram API

export interface InstagramPost {
  id: string;
  caption: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url: string;
  permalink: string;
  timestamp: string;
}

export interface InstagramApiPost {
  id: string;
  caption?: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

export interface InstagramApiResponse {
  data: InstagramApiPost[];
  paging?: {
    cursors?: {
      before: string;
      after: string;
    };
    next?: string;
    previous?: string;
  };
}

export interface InstagramConfig {
  username: string;
  accessToken?: string;
  userId?: string;
  postsToShow: number;
  cacheExpiryMinutes: number;
}

export interface ApiStatus {
  connected: boolean;
  message: string;
  lastCheck?: Date;
}