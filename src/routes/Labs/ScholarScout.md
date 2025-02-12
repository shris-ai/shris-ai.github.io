
# ScholarScout: Multi-Agent Scholar Assistant for Research Discovery

ScholarScout is a multi-agent AI system that simplifies research discovery and analysis. It helps you to find, filter, and engage with the most relevant academic papers using advanced AI techniques. Multiple agents work together to provide real-time research updates, in-depth paper analysis, and contextual conversations.

## How ScholarScout Works

ScholarScout is powered by three specialized AI agents, each handling a distinct aspect of the research process:

### **1. Scout Commander (BaseAgent)**

At the core of ScholarScout lies **ScoutCommander**, the master orchestrator that coordinates the research workflow. This agent ensures smooth interactions between other agents, optimizing query handling and reasoning processes.

### **2. ResearchExplorer – The AI Research Scout**

When you request the latest research on a topic, **ResearchExplorer** fetches the most recent papers from **arXiv**. It then evaluates relevance using a two-step process. First, it applies **TF-IDF** to the paper abstracts along with user-provided keywords to compute keyword scores. Next, it generates **query embeddings** and **paper embeddings** to calculate semantic similarity scores. These two scores are then combined to determine the overall relevance of each paper. To improve efficiency, **ScholarScout** semantically caches these results for a set duration, ensuring fast access without redundant searches.

### **3. ResearchRanger – Your Personal Research Assistant**

Once you've opened a research paper, **ResearchRanger** enables interactive exploration. This agent allows you to **chat with the paper**, providing context-aware responses and insights through advanced retrieval and reasoning models like **DeepSeek**. Whether you need summaries, clarifications, or cross-referencing, ResearchRanger ensures a deep understanding of the content.

## Key Features of ScholarScout

-   **AI-Powered Research Discovery** – Automatically fetch and rank the latest papers relevant to your topic.
-   **Real-Time Contextual Chat** – Interact with research papers through intelligent Q&A.
-   **Efficient Caching** – Save and access recent research instantly.
-   **Advanced Reasoning Models** – Utilize models like DeepSeek to enhance understanding and retrieval.
-   **Multi-Agent Collaboration** – Optimized AI agents work together for seamless research assistance.

## Architecture Components

ScholarScout's architecture consists of several key components that work together to fetch, rank, and cache research papers efficiently.

1.  **Research Fetcher** – Retrieves the latest papers from **arXiv** and other sources.
2.  **Keyword Scoring Module** – Uses **TF-IDF** to rank papers based on user-provided keywords and abstract analysis.
3.  **Embedding Module** – Computes **query embeddings** and **paper embeddings** to determine semantic similarity.
4.  **Ranking Engine** – Combines **TF-IDF scores** and **semantic scores** to rank papers by relevance.
5.  **Caching Layer** – Stores processed results for a set duration to optimize retrieval speed.
6.  **Contextual Retrieval** – When a user opens a paper and switches to **Chat** in the UI, the chat interface automatically switches to **"Chat with the Paper" mode**, enabling the user to ask questions based on the paper’s content. It leverages **Anthropic's Contextual RAG** to generate responses using the document’s context.

## Techniques used for increased performance

