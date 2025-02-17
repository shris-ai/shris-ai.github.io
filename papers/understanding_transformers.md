  
- # Abstract
	- Large language models (LLMs) usually reason in natural language, following a step-by-step process called chain-of-thought (CoT). However, this approach can be inefficient because many words are unnecessary for reasoning, and some steps are hard for the model to handle.
	- Coconut (Chain of Continuous Thought) is a new method that moves reasoning to a "latent space." Instead of turning thoughts into words, it keeps them as hidden representations and feeds them back into the model.
	- This allows Coconut to explore multiple solutions at once, like a breadth-first search, instead of sticking to one path. It’s better at complex reasoning tasks that need backtracking and uses fewer steps. Coconut shows how reasoning outside language can improve LLMs.
- Large language models (LLMs) are powerful at reasoning, thanks to extensive training on human language. However, because they rely on predicting the next word, their reasoning must be expressed in words, such as in the chain-of-thought (CoT) approach, which generates step-by-step solutions in natural language.
- Human reasoning is different:
	- As studies show that the brain’s language areas are mostly inactive during reasoning tasks.
	- Human language is designed for communication, not reasoning, and LLMs face challenges because some reasoning steps need complex planning, while most words are included just for fluency.
	- Yet, LLMs use the same amount of processing power for all tokens, leading to inefficiencies.
- Efforts to improve this, like creating shorter reasoning chains or adding extra reasoning steps for important tokens, still stay limited to language-based reasoning. **A better approach would allow LLMs to reason freely without relying on language and only convert their findings into words when needed.**
-
- This work introduces **Coconut (Chain of Continuous Thought)**, a new method for reasoning in LLMs that shifts from language-based reasoning to a "latent space." Instead of converting hidden states into words, Coconut directly uses the model’s hidden state (continuous thought) as input for the next step. This approach allows reasoning to happen outside the constraints of language and can be optimized end-to-end using gradient descent.
	- expalian how instead of computing predicting the token for next time step, it feeds the hidden state as input to next steo
- To improve latent reasoning, Coconut uses a multi-stage training process that incorporates language reasoning chains for guidance. This leads to an efficient reasoning pattern: Coconut can explore multiple possible solutions at once, similar to a breadth-first search (BFS). It keeps various options open and gradually eliminates incorrect paths using implicit value functions, even without explicit training for this behavior.
	- explain what is bfs
- Experiments show Coconut enhances LLM performance, especially in tasks requiring complex reasoning, such as math problems (GSM8k) and logical reasoning (ProntoQA, ProsQA). It outperforms traditional chain-of-thought (CoT) methods while generating fewer tokens, highlighting the potential of latent reasoning for solving harder problems and guiding future research.
-
- ### CoT
	- CoT reasoning refers to methods where models generate intermediate reasoning steps in language before providing a final answer. This can involve:
		- Prompting models to reason step-by-step.
		- Training models with supervised fine-tuning or reinforcement learning to produce reasoning chains.
	- **Key Insights from Previous Work**:
		- CoT tokens (symbols, patterns, and text) can be analyzed to guide models toward more concise reasoning.
		- CoT improves the model's expressiveness and depth by feeding outputs back into the input, effectively making reasoning "deeper."
		- However, the reliance on token-by-token (autoregressive) generation makes it difficult for CoT to handle complex problems requiring planning or search (e.g., tree-based reasoning).
	- **Alternatives and Extensions**:
		- Some studies add explicit tree search algorithms or train models on search dynamics, enabling more flexible reasoning.
		- Removing the constraints of language space can result in a new reasoning pattern (similar to Breadth-First Search) without explicit training.
- ### Latent Reasoning in LLMs
	- Latent reasoning refers to the internal computations within large language models (LLMs) that happen in their hidden states, rather than the reasoning explicitly seen in their outputs. Key findings include:
	- **Recovering Hidden Information**:
		- Some studies have shown it’s possible to extract intermediate steps of reasoning (e.g., for multi-step problems) from a model’s hidden layers.
		- Researchers have also intervened in these hidden states to influence reasoning paths.
	- **Parallel Reasoning Paths**:
		- Models can follow multiple hidden reasoning paths at once, even when generating a single chain of thought (CoT). However, the CoT outputs don’t always align with the actual internal reasoning. This is called "unfaithfulness" of CoT reasoning.
	- **Enhancing Latent Reasoning**:
		- Adding special tokens (like `<pause>` or filler symbols such as "...") during training has improved task performance, especially for simpler problems. However, these methods don’t increase the model’s overall reasoning capability like CoT does.
		- Other methods, such as predicting a "planning token" or using knowledge distillation (training the model with complex reasoning outputs), help internalize reasoning into the hidden layers.
	- **Training Innovations**:
		- Breaking down reasoning into smaller stages (inspired by iterative CoT) has been effective for training.
		- "Looped transformers," which feed outputs back into the model, show promise for solving algorithmic tasks, though their primary focus has been reasoning in hidden states rather than explicit outputs.
- ### Coconut: Chain of Continuous Thought
	- **Background and Notation**:
		- The input sequence $x = (x_1, ..., x_T)$ is processed by a standard language model MM, where:
			- $E_t = [e(x_1), e(x_2), ..., e(x_t)]$ is the sequence of token embeddings for the first tt tokens.
			- $H_t$ is the matrix of hidden states for all tokens up to position $t$ .
			- $h_t$ is the hidden state for the token at position $t$ , i.e., the last row of $H_t$ .
			- The language model generates the next token $x_{t+1}$ using the formula:
			  $M(x_{t+1} | x_{\leq t}) = \text{softmax}(W h_t)$  
			- $e(\cdot)$ is the token embedding function, and $W$ is the model's parameters.
	- **Coconut Method Overview**:
		- **Switching Modes**: The Coconut method alternates between two modes:
			- **Language Mode**: The model works like a standard language model, generating the next token autoregressively.
			- **Latent Mode**: The model uses the last hidden state as the input for the next token, not token embeddings. This hidden state represents the current reasoning state, referred to as a "continuous thought."
		- **Special Tokens**:
			- `<bot>` marks the start of the latent thought mode.
			- `<eot>` marks the end of the latent thought mode.
		- **Latent Reasoning**:
			- Assume latent reasoning happens between positions $i$ and $j$ (i.e., $x_i = <bot>$ and $x_j = <eot>$ ).
			- In latent mode (when $i < t < j$ ), the model uses the hidden state from the previous token as the next input, replacing token embeddings:
			  $E_t = [e(x_1), e(x_2), ..., e(x_i), h_i, h_{i+1}, ..., h_{t-1}]$  
		- [:span]
		- **Reverting to Language Mode**: After the latent mode ends (when $\geq j$ ), the model reverts back to using token embeddings as input:
		  $E_t = [e(x_1), e(x_2), ..., e(x_i), h_i, h_{i+1}, ..., h_{j-1}, e(x_j), ..., e(x_t)]$  
		- **Hidden States**: The hidden states are processed by the final normalization layer, ensuring they don’t have too large magnitudes.
		- **Model Behavior**: During the latent mode (i < t < j), the model does not map the latent thought back to language space. However, it can still compute $\text{softmax}(W h_t)$ for analysis purposes.
-
-
-
- Test
	- ## Summary of the Coconut Paradigm
	    
	  In this section, we present a new approach called Coconut (Chain of Continuous Thought) for reasoning in a flexible way within a language model. Here’s a simplified breakdown:  
	- ### Background and Notation
	- **Input Sequence**: We denote an input sequence as $$ x = (x_1, ..., x_T) $$ .
	- **Language Model Description**: A large language model (LLM) is represented as:
$$
	  H_t = \text{Transformer}(E_t)
	  $$ $$
	  M(x_{t+1} | x_{\leq t}) = \text{softmax}(W h_t)
	  $$ 	  where:  
		-
$$ E_t = [e(x_1), e(x_2), ..., e(x_t)] $$ : This is the list of token embeddings up to position $$ t $$ .  
		-
$$ H_t \in \mathbb{R}^{t \times d} $$ : This matrix contains the hidden states for all tokens up to position $$ t $$ .  
		-
$$ h_t $$ : The hidden state for the token at position $$ t $$ .  
		-
$$ e(\cdot) $$ : A function that converts tokens into embeddings.  
		-
$$ W $$ : Parameters for the language model head.  
	- ### Overview of the Coconut Method
	    
	  The Coconut method allows the model to switch between two modes:  
	    
		1. **Language Mode**: In this mode, the model behaves like a typical language model, generating the next token based on previous tokens.  
		2. **Latent Mode**: Here, the model uses the last hidden state as the input for generating the next token. This hidden state reflects the current reasoning process, which we call "continuous thought."

	- ### Special Tokens
	- **<bot>**: Marks the start of latent reasoning.
	- **<eot>**: Marks the end of latent reasoning.
	- ### Example of Latent Reasoning
	    
	  If latent reasoning occurs between positions $$ i $$ and $$ j $$ (where $$ x_i = <bot> $$ and $$ x_j = <eot> $$ ), during latent mode (when $$ i < t < j $$ ), we replace the input embedding with the last hidden state from the previous token:  
$$
	  E_t = [e(x_1), e(x_2), ..., e(x_i), h_i, h_{i+1}, ..., h_{t-1}]
	  $$ 	    
	  After exiting latent mode (when $$ t \geq j $$ ), we revert to using token embeddings:  
$$
	  E_t = [e(x_1), e(x_2), ..., e(x_i), h_i, h_{i+1}, ..., h_{j-1}, e(x_j), ..., e(x_T)]
	  $$	- ### Important Note
	    
	  While in latent mode, we do not define $$ M(x_{t+1} | x_{\leq t}) $$ because this thought process does not map back to language. However, we can still calculate $$ \text{softmax}(W h_t) $$ for analysis purposes.  
	    
	  This new paradigm enhances how language models can reason and generate responses by incorporating a continuous thought process.  
-
-
