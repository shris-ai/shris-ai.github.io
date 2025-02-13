// src/data/papers.js

const papers = [
    {
        title: "CoRAG: Chain of Retrieval Augmented Generation",
        description:"Introduces CoRAG, a dynamic retrieval framework that improves retrieval-augmented generation (RAG) by iteratively refining retrieval steps based on the reasoning process. Unlike traditional RAG models that use a fixed retrieval step, CoRAG trains LLMs to retrieve and reason step by step, leading to better multi-hop question answering. It achieves state-of-the-art performance on the KILT benchmark by optimizing retrieval strategies through rejection sampling, tree search, and best-of-N decoding. CoRAG enhances retrieval efficiency, reduces errors, and adapts dynamically to query complexity, making it a significant advancement in knowledge-intensive tasks.",
        tags: ["RAG", "Test Time Compute"],
        markdownFile: "", // Path to the Markdown file
        htmlFile:`/papers/CoRAG_Chain of Retrieval Augmented Generation.html`,
        img: {
            src:`/papers/assets/CoRAG_Chain of Retrieval Augmented Generation_0.png`,
            alt:"Research Paper"
        }
    },
    {
        title: "Titans: Learning to Memorize at Test Time",
        description:"The paper introduces Titans, a new class of deep learning architectures that enable learning and memorization at test time, addressing the limitations of Transformers in handling long-context reasoning. Unlike traditional models with fixed context windows, Titans incorporate a neural long-term memory module, allowing them to recall and update information dynamically. This architecture outperforms Transformers on needle-in-haystack tasks, long-sequence modeling (up to 2M tokens), and knowledge retrieval, making it highly effective for language modeling, reasoning, genomics, and time series forecasting.",
        tags: ["Test Time Compute", "Memory in LLMs"],
        markdownFile: "", // Path to the Markdown file
        htmlFile:"/papers/Titans_Learning to Memorize at Test Time.html",
        img: {
            src:"/papers/assets/Titans_Learning to Memorize at Test Time_0.png",
            alt:"Research Paper"
        }
    },
    {
        title: "COCONUT: Training Large Language Models to Reason in a Continuous Latent Space",
        description:"The paper introduces Coconut (Chain of Continuous Thought), a new reasoning approach for large language models (LLMs) that moves beyond traditional Chain-of-Thought (CoT) reasoning. Instead of generating reasoning steps as text, Coconut operates in a continuous latent space, allowing models to process multiple reasoning paths efficiently before producing an answer. This approach improves logical and mathematical reasoning, enables better backtracking, and reduces unnecessary token usage. By shifting AI reasoning beyond language constraints, Coconut enhances both accuracy and scalability in complex problem-solving tasks.",
        tags: ["Reasoning in LLMs"],
        markdownFile: "", // Path to the Markdown file
        htmlFile:"/papers/COCONUT_Training Large Language Models to Reason in a Continuous Latent Space.html",
        img: {
            src:"/papers/assets/COCONUT_Training Large Language Models to Reason in a Continuous Latent Space_0.png",
            alt:"COCONUT_Training Large Language Models to Reason in a Continuous Latent Space"
        }
    },
    {
        title: "DSPY: Compiling Declarative Language Model Calls into Self-Improving Pipelines",
        description:"The paper introduces DSPy, a programming framework that automates and optimizes language model (LM) pipelines. Instead of relying on manually crafted prompts, DSPy compiles declarative LM calls into self-improving pipelines, learning from data to enhance prompting, finetuning, and reasoning. It enables smaller models (like T5 and Llama2-13B) to achieve performance comparable to large proprietary models (like GPT-3.5) and outperforms expert-designed prompts in tasks like math reasoning, multi-hop retrieval, and question answering.",
        tags: ["Prompt Programming", "Framework", "Prompt Optimization"],
        markdownFile: "", // Path to the Markdown file
        htmlFile:"/papers/DSPY_Compiling Declarative Language Model Calls into Self-Improving Pipelines.html",
        img: {
            src:"/papers/assets/DSPY_Compiling Declarative Language Model Calls into Self-Improving Pipelines_0.png",
            alt:"DSPY_Compiling Declarative Language Model Calls into Self-Improving Pipelines"
        }
    }
];

export default papers;