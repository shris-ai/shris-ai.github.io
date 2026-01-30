export interface BlogPost {
  title: string;
  description: string;
  tags: string[];
  /** Path to HTML file (relative to project root) */
  htmlFile: string;
  /** Publication date (e.g. "Jan 2025") */
  publishedDate?: string;
  /** Optional image for card/OG */
  img?: {
    src: string;
    alt: string;
  };
}

const blogPosts: BlogPost[] = [
  {
    title: "Reasoning in LLMs: The Role of Test-Time Compute",
    description: "Concepts and techniques for reasoning in large language models—reasoning in LLMs vs reasoning LLMs, scaling, and search strategies.",
    tags: ["AI", "Reasoning Models", "Test-time Compute"],
    htmlFile: "src/routes/PaperDiveIns/papers/ReasoningModels.html",
    publishedDate: "Feb 2, 2025",
    img: {
      src: "/papers/assets/ReasoningModels/ReasoningModels_OpenAIo1.png",
      alt: "Reasoning in LLMs",
    },
  },
];

export function getBlogSlug(post: BlogPost): string {
  return post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default blogPosts;
