/**
 * Fetch top posts from a Substack newsletter RSS feed.
 * Used at build time on the newsletter page.
 */

const SUBSTACK_FEED_URL = 'https://inthemarginsofai.substack.com/feed';

/** Max length for subtitle shown on the card */
const SUBTITLE_MAX_LENGTH = 160;

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  /** Short excerpt for card subtitle */
  subtitle?: string;
  /** Featured image URL, from enclosure or first img in content */
  imageUrl?: string;
}

function extractImageUrl(item: { enclosure?: { url?: string; type?: string }; content?: string }): string | undefined {
  if (item.enclosure?.url && (!item.enclosure.type || item.enclosure.type.startsWith('image/'))) {
    return item.enclosure.url;
  }
  const content = item.content || '';
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : undefined;
}

function truncateSubtitle(text: string | undefined, maxLen: number): string | undefined {
  if (!text || !text.trim()) return undefined;
  const trimmed = text.trim();
  if (trimmed.length <= maxLen) return trimmed;
  return trimmed.slice(0, maxLen).trim() + '…';
}

export interface SubstackFeedInfo {
  /** Publication/logo image from the feed, if present */
  feedImageUrl?: string;
  posts: SubstackPost[];
}

/**
 * Fetch Substack RSS feed once. Returns feed image URL (for header) and up to `limit` posts.
 */
export async function getSubstackFeedInfo(limit = 5): Promise<SubstackFeedInfo> {
  try {
    const Parser = (await import('rss-parser')).default;
    const parser = new Parser();
    const feed = await parser.parseURL(SUBSTACK_FEED_URL);
    const feedImageUrl =
      (feed as { image?: { url?: string } }).image?.url ||
      NEWSLETTER_HEADER_IMAGE_FALLBACK;
    const items = (feed.items || []).slice(0, limit).map((item) => ({
      title: item.title || 'Untitled',
      link: item.link || item.guid || '#',
      pubDate: item.pubDate || '',
      subtitle: truncateSubtitle(item.contentSnippet, SUBTITLE_MAX_LENGTH),
      imageUrl: extractImageUrl(item),
    }));
    return { feedImageUrl, posts: items };
  } catch {
    return { feedImageUrl: NEWSLETTER_HEADER_IMAGE_FALLBACK, posts: [] };
  }
}

/**
 * Fetch and parse Substack RSS feed. Returns up to `limit` most recent posts.
 * Prefer getSubstackFeedInfo() when you also need the feed image for the header.
 */
export async function getSubstackPosts(limit = 5): Promise<SubstackPost[]> {
  const { posts } = await getSubstackFeedInfo(limit);
  return posts;
}

/** Base URL for the newsletter (subscribe page, etc.) */
export const SUBSTACK_NEWSLETTER_URL = 'https://inthemarginsofai.substack.com';

/** Optional: path to a local header image if the feed doesn't provide one (e.g. /assets/newsletter-logo.png) */
export const NEWSLETTER_HEADER_IMAGE_FALLBACK: string | undefined = undefined;
