import papers from '../data/papers.ts';

type Paper = (typeof papers)[number];

const WORDS_PER_MINUTE = 200;

export function getPaperSlug(paper: Paper): string {
  return paper.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  papers.forEach((paper) => paper.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export function getPapersByTag(tagOrSlug: string): Paper[] {
  const normalized = tagOrSlug.toLowerCase().replace(/-/g, ' ');
  return papers.filter((paper) =>
    paper.tags.some(
      (t) =>
        t.toLowerCase() === tagOrSlug.toLowerCase() ||
        t.toLowerCase().replace(/\s+/g, '-') === tagOrSlug.toLowerCase() ||
        t.toLowerCase() === normalized
    )
  );
}

/** Parse display date (e.g. "2024", "Jan 2025", "March 2024") to YYYY-MM-DD for range filtering */
export function parseDateForFilter(dateStr: string): string | null {
  if (!dateStr || !dateStr.trim()) return null;
  const s = dateStr.trim();
  // Year only: "2024" -> 2024-01-01
  if (/^\d{4}$/.test(s)) return `${s}-01-01`;
  // Month name + day + year: "Feb 2, 2025", "March 15, 2024"
  const months: Record<string, string> = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
  const matchDay = s.match(/^([a-zA-Z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (matchDay) {
    const monthKey = matchDay[1].toLowerCase().slice(0, 3);
    const day = matchDay[2].padStart(2, '0');
    const year = matchDay[3];
    const month = months[monthKey] || '01';
    return `${year}-${month}-${day}`;
  }
  // Month name + year: "Jan 2025", "March 2024"
  const match = s.match(/^([a-zA-Z]+)\s+(\d{4})$/);
  if (match) {
    const monthKey = match[1].toLowerCase().slice(0, 3);
    const year = match[2];
    const month = months[monthKey] || '01';
    return `${year}-${month}-01`;
  }
  // YYYY-MM or YYYY-MM-DD already
  if (/^\d{4}-\d{2}(-\d{2})?$/.test(s)) return s.length === 10 ? s : `${s}-01`;
  return null;
}

/** Parse display date to ISO 8601 for schema.org (e.g. "Jan 2025" -> "2025-01-01"). Returns null if unparseable. */
export function parseDateToISO(dateStr: string | undefined): string | null {
  const ymd = parseDateForFilter(dateStr || '');
  return ymd ? `${ymd}T00:00:00.000Z` : null;
}

export function getTagDisplayName(tagSlug: string): string {
  const tags = getAllTags();
  const found = tags.find(
    (t) => t.toLowerCase().replace(/\s+/g, '-') === tagSlug.toLowerCase()
  );
  return found || tagSlug;
}

export function getRelatedPapers(currentPaper: Paper, limit = 3): Paper[] {
  const currentSlug = getPaperSlug(currentPaper);
  return papers
    .filter((p) => getPaperSlug(p) !== currentSlug)
    .filter((p) =>
      p.tags.some((t) =>
        currentPaper.tags.some((ct) => ct.toLowerCase() === t.toLowerCase())
      )
    )
    .slice(0, limit);
}

export function estimateReadingTime(htmlContent: string): number {
  const text = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export interface TocEntry {
  id: string;
  text: string;
  level: number; // 1 = h1, 2 = h2, 3 = h3
}

export function extractHeadingsAndAddIds(html: string): { content: string; toc: TocEntry[] } {
  const toc: TocEntry[] = [];
  let counter = 0;

  const content = html.replace(
    /<h([1-3])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_, level, attrs, text) => {
      const existingId = attrs.match(/id=["']([^"']+)["']/i);
      const id = existingId ? existingId[1] : `heading-${++counter}`;
      const textOnly = text.replace(/<[^>]+>/g, '').trim();
      toc.push({
        id,
        text: textOnly || `Section ${toc.length + 1}`,
        level: parseInt(level, 10),
      });
      const newAttrs = existingId ? attrs : `${attrs} id="${id}"`.trim();
      return `<h${level} ${newAttrs}>${text}</h${level}>`;
    }
  );

  return { content, toc };
}

export { papers };
