// Instagram Service - שירות לטעינה אוטומטית של פוסטים מאינסטגרם
import type { InstagramPost, InstagramApiResponse } from '../types/instagram';

class InstagramService {
  private readonly baseUrl = 'https://graph.instagram.com';
  private readonly accessToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
  private readonly userId = import.meta.env.VITE_INSTAGRAM_USER_ID;
  private readonly postsToShow = parseInt(import.meta.env.VITE_POSTS_TO_SHOW || '6');

  // Cache למניעת קריאות מיותרות ל-API
  private cache: {
    posts: InstagramPost[];
    lastFetch: number;
    expiryTime: number;
  } = {
    posts: [],
    lastFetch: 0,
    expiryTime: 5 * 60 * 1000, // 5 דקות
  };

  /**
   * בדיקה אם יש הגדרות API תקינות
   */
  private isConfigured(): boolean {
    return !!(this.accessToken && this.userId);
  }

  /**
   * בדיקה אם ה-cache עדיין תקף
   */
  private isCacheValid(): boolean {
    const now = Date.now();
    return (now - this.cache.lastFetch) < this.cache.expiryTime;
  }

  /**
   * טעינת פוסטים מ-Instagram API
   */
  async fetchPosts(): Promise<InstagramPost[]> {
    // אם לא מוגדר API או cache תקף - החזר cache
    if (!this.isConfigured()) {
      console.warn('Instagram API לא מוגדר. מציג placeholders.');
      return this.getFallbackPosts();
    }

    if (this.isCacheValid() && this.cache.posts.length > 0) {
      console.log('מחזיר פוסטים מ-cache');
      return this.cache.posts;
    }

    try {
      console.log('טוען פוסטים חדשים מאינסטגרם...');
      
      const url = `${this.baseUrl}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${this.accessToken}&limit=${this.postsToShow}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Instagram API Error: ${response.status}`);
      }

      const data: InstagramApiResponse = await response.json();
      
      // סינון פוסטים (רק תמונות ווידאו)
      const filteredPosts: InstagramPost[] = data.data
        .filter(post => ['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'].includes(post.media_type))
        .slice(0, this.postsToShow)
        .map(post => ({
          id: post.id,
          caption: post.caption || '',
          media_type: post.media_type as 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM',
          media_url: post.media_url,
          thumbnail_url: post.thumbnail_url || post.media_url,
          permalink: post.permalink,
          timestamp: post.timestamp,
        }));

      // עדכון cache
      this.cache = {
        posts: filteredPosts,
        lastFetch: Date.now(),
        expiryTime: this.cache.expiryTime,
      };

      console.log(`נטענו ${filteredPosts.length} פוסטים מאינסטגרם`);
      return filteredPosts;

    } catch (error) {
      console.error('שגיאה בטעינת פוסטים מאינסטגרם:', error);
      return this.getFallbackPosts();
    }
  }

  /**
   * פוסטים לדוגמה כשאין חיבור ל-API
   */
  private getFallbackPosts(): InstagramPost[] {
    return Array.from({ length: this.postsToShow }, (_, index) => ({
      id: `placeholder-${index + 1}`,
      caption: `פוסט ${index + 1} - יתעדכן אוטומטי מאינסטגרם`,
      media_type: 'IMAGE',
      media_url: '',
      thumbnail_url: '',
      permalink: `https://instagram.com/${import.meta.env.VITE_INSTAGRAM_USERNAME || 'bulla.studio'}`,
      timestamp: new Date().toISOString(),
    }));
  }

  /**
   * רענון מאולץ של הפוסטים
   */
  async refreshPosts(): Promise<InstagramPost[]> {
    this.cache.lastFetch = 0; // איפוס cache
    return this.fetchPosts();
  }

  /**
   * בדיקת סטטוס החיבור ל-API
   */
  async checkApiStatus(): Promise<{ connected: boolean; message: string }> {
    if (!this.isConfigured()) {
      return {
        connected: false,
        message: 'Instagram API לא מוגדר. נדרשות הגדרות ACCESS_TOKEN ו-USER_ID'
      };
    }

    try {
      const url = `${this.baseUrl}/me?access_token=${this.accessToken}`;
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        return {
          connected: true,
          message: `מחובר בהצלחה לחשבון: ${data.username || 'unknown'}`
        };
      } else {
        return {
          connected: false,
          message: `שגיאת חיבור: ${response.status} - ${response.statusText}`
        };
      }
    } catch (error) {
      return {
        connected: false,
        message: `שגיאה: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}

// יצוא singleton
export const instagramService = new InstagramService();
export default instagramService;