export interface Lab {
  slug: string;
  title: string;
  description: string;
  /** Card image (e.g. for labs index) */
  image: string;
  /** Path to Markdown file relative to project root */
  mdFile: string;
  /** Created date (e.g. "Mar 5, 2025") */
  createdDate: string;
  /** Last updated date (e.g. "Mar 5, 2025") */
  updatedDate: string;
}

const labs: Lab[] = [
  {
    slug: "scholar-scout",
    title: "ScholarScout",
    description:
      "Multi-agent AI system for research discovery and analysis. Find, filter, and engage with relevant academic papers using advanced AI techniques.",
    image: "/labs/assets/ScholarScout_0.png",
    mdFile: "src/content/labs/scholar-scout.md",
    createdDate: "Mar 5, 2025",
    updatedDate: "Mar 5, 2025",
  },
  {
    slug: "tutor-ai",
    title: "tutorAI",
    description:
      "AI-powered course creation and lesson planning. Generate structured outlines and translate educational materials into native Indian languages.",
    image: "/labs/assets/tutorAI_0.png",
    mdFile: "src/content/labs/tutor-ai.md",
    createdDate: "Oct 3, 2024",
    updatedDate: "Oct 3, 2024",
  },
];

export function getLabBySlug(slug: string): Lab | undefined {
  return labs.find((lab) => lab.slug === slug);
}

export default labs;
