// src/data/papers.js
const papers = [
    {
        title: "CoRAG: Chain of Retrieval Augmented Generation",
        description:"This paper introduces CoRAG, a dynamic retrieval framework that improves retrieval-augmented generation (RAG) by iteratively refining retrieval steps based on the reasoning process. Unlike traditional RAG models that use a fixed retrieval step, CoRAG trains LLMs to retrieve and reason step by step, leading to better multi-hop question answering. It achieves state-of-the-art performance on the KILT benchmark by optimizing retrieval strategies through rejection sampling, tree search, and best-of-N decoding. CoRAG enhances retrieval efficiency, reduces errors, and adapts dynamically to query complexity, making it a significant advancement in knowledge-intensive tasks.",
        tags: ["AI", "Machine Learning", "NLP"],
        markdownFile: "", // Path to the Markdown file
        htmlFile:"/src/routes/PaperDiveIns/papers/CoRAG_Chain of Retrieval Augmented Generation.html",
        img: {
            src:"/src/routes/PaperDiveIns/papers/assets/CoRAG_Chain of Retrieval Augmented Generation_0.png",
            alt:"Research Paper"
        }
    },
    {
        title: "Titans: Learning to Memorize at Test Time",
        description:"This paper dives deep into the architecture and functioning of transformers, a key component in modern AI systems.",
        tags: ["AI", "Machine Learning", "NLP"],
        markdownFile: "", // Path to the Markdown file
        htmlFile:"/src/routes/PaperDiveIns/papers/Titans_Learning to Memorize at Test Time.html",
        img: {
            src:"/src/routes/PaperDiveIns/papers/assets/Titans_Learning to Memorize at Test Time_0.png",
            alt:"Research Paper"
        }
    },
    {
        title: "COCONUT: Training Large Language Models to Reason in a Continuous Latent Space",
        description:"This paper dives deep into the architecture and functioning of transformers, a key component in modern AI systems.",
        tags: ["AI", "Machine Learning", "NLP"],
        markdownFile: "", // Path to the Markdown file
        htmlFile:"/src/routes/PaperDiveIns/papers/COCONUT_Training Large Language Models to Reason in a Continuous Latent Space.html",
        img: {
            src:"/src/routes/PaperDiveIns/papers/assets/COCONUT_Training Large Language Models to Reason in a Continuous Latent Space_0.png",
            alt:"COCONUT_Training Large Language Models to Reason in a Continuous Latent Space"
        }
    },
    {
        title: "DSPY: Compiling Declarative Language Model Calls into Self-Improving Pipelines",
        description:"This paper dives deep into the architecture and functioning of transformers, a key component in modern AI systems.",
        tags: ["AI", "Machine Learning", "NLP"],
        markdownFile: "", // Path to the Markdown file
        htmlFile:"/src/routes/PaperDiveIns/papers/DSPY_Compiling Declarative Language Model Calls into Self-Improving Pipelines.html",
        img: {
            src:"/src/routes/PaperDiveIns/papers/assets/DSPY_Compiling Declarative Language Model Calls into Self-Improving Pipelines_0.png",
            alt:"DSPY_Compiling Declarative Language Model Calls into Self-Improving Pipelines"
        }
    }
];

export default papers;