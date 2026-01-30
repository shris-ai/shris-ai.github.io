export interface Paper {
  title: string;
  description: string;
  tags: string[];
  markdownFile?: string;
  htmlFile: string;
  img: {
    src: string;
    alt: string;
  };
  /** Publication date (e.g. "March 2024" or "2024-03") */
  publishedDate?: string;
  /** URL to paper source (arXiv, PDF, project page) */
  sourceUrl?: string;
  /** Label for source link (e.g. "arXiv", "PDF") */
  sourceLabel?: string;
  /** Date you reviewed/wrote the deep dive (e.g. "Jan 2025") */
  reviewedDate?: string;
  /** Status (e.g. "Complete", "In progress") */
  status?: string;
}

const papers: Paper[] = [
  {
    title: "CoRAG: Chain of Retrieval Augmented Generation",
    description: "This paper introduces CoRAG, a dynamic retrieval framework that improves retrieval-augmented generation (RAG) by iteratively refining retrieval steps based on the reasoning process. Unlike traditional RAG models that use a fixed retrieval step, CoRAG trains LLMs to retrieve and reason step by step, leading to better multi-hop question answering. It achieves state-of-the-art performance on the KILT benchmark by optimizing retrieval strategies through rejection sampling, tree search, and best-of-N decoding. CoRAG enhances retrieval efficiency, reduces errors, and adapts dynamically to query complexity, making it a significant advancement in knowledge-intensive tasks.",
    tags: ["AI", "Machine Learning", "NLP"],
    markdownFile: "",
    htmlFile: "src/routes/PaperDiveIns/papers/CoRAG_Chain of Retrieval Augmented Generation.html",
    img: {
      src: "/papers/assets/CoRAG_Chain of Retrieval Augmented Generation_0.png",
      alt: "Research Paper"
    },
    publishedDate: "2024",
    sourceUrl: "https://arxiv.org/abs/2402.13641",
    sourceLabel: "arXiv",
    reviewedDate: "Jan 2025",
    status: "Complete"
  },
  {
    title: "Titans: Learning to Memorize at Test Time",
    description: "This paper dives deep into the architecture and functioning of transformers, a key component in modern AI systems.",
    tags: ["AI", "Machine Learning", "NLP"],
    markdownFile: "",
    htmlFile: "src/routes/PaperDiveIns/papers/Titans_Learning to Memorize at Test Time.html",
    img: {
      src: "/papers/assets/Titans_Learning to Memorize at Test Time_0.png",
      alt: "Research Paper"
    },
    publishedDate: "2024",
    sourceUrl: "https://arxiv.org/abs/2406.05221",
    sourceLabel: "arXiv",
    reviewedDate: "Jan 2025",
    status: "Complete"
  },
  {
    title: "COCONUT: Training Large Language Models to Reason in a Continuous Latent Space",
    description: "This paper dives deep into the architecture and functioning of transformers, a key component in modern AI systems.",
    tags: ["AI", "Machine Learning", "NLP"],
    markdownFile: "",
    htmlFile: "src/routes/PaperDiveIns/papers/COCONUT_Training Large Language Models to Reason in a Continuous Latent Space.html",
    img: {
      src: "/papers/assets/COCONUT_Training Large Language Models to Reason in a Continuous Latent Space_0.png",
      alt: "COCONUT_Training Large Language Models to Reason in a Continuous Latent Space"
    },
    publishedDate: "2024",
    sourceUrl: "https://arxiv.org/abs/2406.05823",
    sourceLabel: "arXiv",
    reviewedDate: "Jan 2025",
    status: "Complete"
  },
  {
    title: "DSPY: Compiling Declarative Language Model Calls into Self-Improving Pipelines",
    description: "This paper dives deep into the architecture and functioning of transformers, a key component in modern AI systems.",
    tags: ["AI", "Machine Learning", "NLP"],
    markdownFile: "",
    htmlFile: "src/routes/PaperDiveIns/papers/DSPY_Compiling Declarative Language Model Calls into Self-Improving Pipelines.html",
    img: {
      src: "/papers/assets/DSPY_Compiling Declarative Language Model Calls into Self-Improving Pipelines_0.png",
      alt: "DSPY_Compiling Declarative Language Model Calls into Self-Improving Pipelines"
    },
    publishedDate: "2024",
    sourceUrl: "https://arxiv.org/abs/2310.05914",
    sourceLabel: "arXiv",
    reviewedDate: "Jan 2025",
    status: "Complete"
  },
  {
    title: "Program of Thoughts Prompting: Disentangling Computation from Reasoning for Numerical Reasoning Tasks",
    description: "PoT represents reasoning as Python code executed by an interpreter, disentangling computation from reasoning and improving accuracy on numerical tasks compared to chain-of-thought.",
    tags: ["AI", "Machine Learning", "NLP"],
    markdownFile: "",
    htmlFile: "src/routes/PaperDiveIns/papers/Program of Thoughts Prompting_Disentangling Computation from Reasoning for Numerical Reasoning Tasks.html",
    img: {
      src: "/papers/assets/Program of Thoughts Prompting_Disentangling Computation from Reasoning for Numerical Reasoning Tasks_0.png",
      alt: "Program of Thoughts Prompting"
    },
    publishedDate: "2024",
    sourceUrl: "https://arxiv.org/abs/2211.12588",
    sourceLabel: "arXiv",
    reviewedDate: "Jan 2025",
    status: "Complete"
  },
];

export default papers;
