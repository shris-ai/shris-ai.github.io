---
title: Reasoning in LLMs - The Role of Test-Time Compute
description: Concepts and techniques for reasoning in large language models—reasoning in LLMs vs reasoning LLMs, scaling, and search strategies.
tags:
  - AI
  - Reasoning Models
  - Test-time Compute
publishedDate: Feb 2, 2025
---

I haven't been as hooked on the introduction of large language models (we all kind of saw it coming!) as I have been on making them smarter with reasoning capabilities.

When I think about reasoning, it's not just about solving a complex mathematical problem—it's about thinking through it iteratively, much like how humans do.

So, when we ask an LLM a question like this, the expectation isn't just the final answer, **84**:

> User: *Anita sold clips to 56 of her friends in April, and then she sold half as many clips in May. How many clips did Anita sell altogether in April and May?*
> Model: 84

Instead, the real expectation is **a transparent, step-by-step reasoning process**—a way to see the model think through the problem.

> User: *Anita sold clips to 56 of her friends in April, and then she sold half as many clips in May. How many clips did Anita sell altogether in April and May?*
>
> Model:
> \<think\>
> First, I note that Anita sold 56 clips in April.
> Next, the number of clips she sold in May is half of what she sold in April. To find this amount, I calculate half of 56, which is 28.
> Finally, to determine the total number of clips sold in both months, I add the number from April and May: 56 plus 28 equals 84.
> \</think\>
> Let's determine how many clips Anita sold in **April** and **May**, and then find the total number of clips she sold altogether.
> **Clips Sold in April:** Anita sold **56** clips to her friends in April. $Clips_{April} = 56$
> **Clips Sold in May:** Anita sold **half as many clips** in **May** compared to April. $Clips_{May} = \frac{Clips_{April}}{2} = \frac{56}{2} = 28$
> **Total Clips Sold in April and May:** To find the total number of clips sold, add the clips sold in both months. $Clips_{Total} = Clips_{April} + Clips_{May} = 56 + 28 = 84$
> **Final Answer:** Anita sold a total of $\boxed{84}$ clips in April and May.

People are now familiar with this step-by-step reasoning approach, thanks to the viral release of Deepseek R1 and v3.

However, let me tell you—reasoning models didn't develop overnight. It took years of iterative research to get to this moment. And step-by-step reasoning isn't the only way LLMs can think through problems.

## Concepts related to 'Reasoning' and 'LLMs'

When I talk about `Reasoning` and `LLMs`, I'd always say that there are two related but distinct concepts associated with it:

- **`Reasoning in LLMs`**: Studying and enhancing reasoning within existing models.
- **`Reasoning LLMs`**: LLMs built with strong reasoning abilities as a core feature.

Here's a table comparing **Reasoning in LLMs** and **Reasoning LLMs**:

| Feature | **Reasoning in LLMs** | **Reasoning LLMs** |
|--------|------------------------|---------------------|
| **Definition** | The process and techniques used by LLMs to reason. | LLMs designed with strong built-in reasoning capabilities. |
| **Focus** | Improving how LLMs handle logical, step-by-step thinking. | Building LLMs that inherently reason like humans. |
| **Techniques** | Chain-of-Thought (CoT), Tree-of-Thought (ToT), Layer-of-Thought (LoT), self-consistency. | Architectural modifications, external memory integration, fine-tuning on reasoning tasks. |
| **Example** | Using CoT prompting to improve math problem-solving in GPT-4. | Developing an LLM that autonomously generates scientific hypotheses. |
| **Research Goal** | Enhancing reasoning as an emergent ability in existing LLMs. | Designing LLMs that are inherently better at reasoning without heavy prompting. |
| **Dependency** | Often requires prompting strategies or additional training. | More independent, with reasoning embedded in its core design. |

Now, they may be distinct in their differences, but they converge in their similarity.

A prominent similarity between both "Reasoning in LLMs" and "Reasoning LLMs" is that they both leverage **scaling test-time compute**. This means that, regardless of whether reasoning is an emergent capability refined through prompting strategies (reasoning in LLMs) or is embedded as a core design feature (reasoning LLMs), the performance and effectiveness of the reasoning process tend to improve as more computational resources are allocated during inference.

But why inference? Why not optimize reasoning during training instead?

## Why test-time compute and not train-time compute?

To understand why reasoning in LLMs benefits more from test-time compute rather than train-time compute, we first need to examine how compute affects model performance during training.

### Train-time Compute

Back in 2020, the paper *Scaling Laws for Neural Language Models* introduced a fundamental insight: the performance of a language model is governed by three key factors—**compute budget, model size, and dataset size**. The researchers discovered **a power-law relationship** between these factors, meaning that increasing one requires proportional adjustments in the others to maintain efficiency.

The key findings in this paper suggest:

1. **More compute → Larger models and bigger datasets**  
   If you have more computational resources, you should increase both **model size (number of parameters)** and **dataset size (amount of training text)** in a balanced way.

2. **More parameters alone doesn't help if the dataset is too small**  
   If you scale up a model without increasing the dataset, the model will **overfit** (memorize training data instead of generalizing).

3. **More data alone doesn't help if the model is too small**  
   If you increase the dataset size without increasing model size, the model won't be able to fully utilize the extra data.

4. **Optimal scaling follows a predictable formula**  
   The paper derives scaling laws showing how compute (C), model size (N), and dataset size (D) interact:

![Kaplan's scaling law](/notes/reasoning-models-2025/ReasoningModels_KaplansScalingLaw.png)

\( C \propto N^{\alpha} D^{\beta} \) where **α and β** are scaling exponents determined empirically.

More often than not, compute budget is a big constraint. Training massive models with 100B+ parameters requires enormous financial resources.

The graph from "Language Models are Few-Shot Learners" shows the compute used during training for BERT, T5, and GPT-3 variants.

![Computational cost in petaFLOPs](/notes/reasoning-models-2025/ReasoningModels_ComputationalCostInPetaFLOPs.png)

To put this in perspective:

- 1 petaFLOP/s = 1 quadrillion floating-point operations per second.
- 1 petaFLOP/s-day is the compute used by running at 1 petaFLOP/s for 24 hours.

Approximating from the graph, GPT-3 (175B parameters) required 4000 petaFLOP/s-days, this means continuously running the machine for \( 24 * 60 * 60 * 4000 = 345.6 * 10^{-6} \) (345 million seconds).

This gives us an idea of the massive computational cost of training large-scale language models. The sheer scale of compute required for training models like GPT-3 highlights a fundamental constraint in AI research: **compute is not infinite**. More often than not, it is the biggest bottleneck in training ever-larger models.

As per the Kaplan's scaling laws, with compute being limited, we must decide how to allocate it between model size and dataset size. Intuitively, one might think that making the model bigger should lead to better performance. But it's proven that larger datasets contribute more to generalization than just increasing model size. If we train a small model on a massive dataset, it tends to outperform a large model trained on a small dataset. This happens because a larger dataset allows the model to see a more diverse range of examples, improving its ability to generalize to unseen data.

This hypothesis was tested in 2022 during training a compute-optimal model: Chinchilla. Chinchilla used the same compute budget as Gopher (280B) but with 70B parameters and 4× more data. Not just that, it also significantly outperformed Gopher (280B), GPT-3 (175B), Jurassic-1 (178B), and Megatron-Turing NLG (530B) on a large range of evaluation tasks.

While Chinchilla demonstrated that using **more data with a smaller model** leads to better performance, it still followed the conventional approach of using a **fixed amount of compute during inference**.

But what if, instead of focusing only on making training more efficient, we also optimized how much compute a model uses when generating answers? Rather than relying only on bigger models trained with massive datasets, could we make **smaller models perform better** by allowing them to **use more compute when needed at test time**?

This challenges the long-standing assumption that "bigger is always better" and suggests that **allocating compute more effectively at inference could be just as important as scaling it during training**.

### Test-time Compute

The key idea behind **test-time compute (TTC)** is that, just like humans take more time to think about harder questions, AI models might improve by **thinking longer** before generating a response during inference.

If test-time compute can make up for less compute during training, we could create smaller, more efficient models that still perform well. This would make AI systems cheaper, more accessible, and easier to run on devices with limited power.

A great example of this is OpenAI's o1 model, which shows that performance improves both when more compute is used during training and when more time is given to think at test time. The graphs below illustrate this:

![OpenAI o1](/notes/reasoning-models-2025/ReasoningModels_OpenAIo1.png)

- The left graph shows that as more compute is used during training, accuracy improves.
- The right graph shows that letting the model think longer at test time also leads to better results.

By allowing AI to "think more" when needed, we could build models that are both smarter and more efficient, reducing the need for ever-larger models while still achieving high accuracy.

Since reasoning models think more, now the question is that do they use more tokens?

Yes! Unlike regular AI models, reasoning models think before they answer, using extra tokens to break down the problem step by step.

AI models use compute power to generate answers. But if all the compute is spent just producing a final response, it's not always efficient.

Instead, reasoning models generate extra tokens first—mapping out relationships, exploring different ideas, and refining their approach. This deeper thinking helps produce a more accurate and well-structured answer.

More thinking = More tokens = More cost! 💰

That's why managing token usage is important when using these models.

Now, let's take a look at some of the strategies to implement test-time compute.

## Test-time Compute Implementation Strategies

Google DeepMind released a paper in August 2024 in which they explained how to scale test-time compute optimally in LLMs.

In Test-time computation, the model's output distribution is modified after it has been trained, allowing for better responses to a given prompt. This can be done in two ways:

1. **At the input level** – **Modifying the Proposal Distribution** (*Modifying the input prompt by adding extra tokens to guide the model toward better responses.*)
2. **At the output level** – **Optimizing the Verifier** (*Generating multiple candidate responses and selecting or modifying them using a separate verification process.*)

### Using verifiers to scale test-time compute

Verifiers play a crucial role in improving reasoning by ensuring that generated responses are not only correct but also well-structured. Instead of allowing the model to produce a final answer directly, verifiers encourage a more systematic approach by evaluating different reasoning paths. This process can be broken down into two key stages:

1. **Thought Generation:**
   - Rather than immediately providing an answer, the model first **breaks down the problem into smaller steps**.
   - This structured reasoning process helps the model identify key insights before reaching a conclusion.

2. **Answer Generation:**
   - Once thoughts are generated, the model **constructs a final response** based on the validated reasoning steps.
   - A verifier ensures that the final answer is logically sound by filtering out incorrect or incomplete solutions.

By incorporating verifiers into this workflow, the model can **iteratively refine** its outputs, leading to more reliable and interpretable reasoning.

To further improve the verification process, **Process-Reward Models (PRMs)** extend the role of verifiers by evaluating reasoning **at every step**, rather than only at the final answer. PRMs help refine model outputs in the following ways:

- Each reasoning step is **individually assessed**, preventing errors from propagating.
- PRMs provide feedback that **nudges the model toward better logical conclusions** over multiple iterations.
- By filtering out weak intermediate steps early, PRMs make **test-time compute more efficient**.

While **Process-Reward Models (PRMs)** improve reasoning by scoring each step, their effectiveness depends on **how test-time compute is allocated**. To maximize PRM performance, **different search methods** can be used to refine and select the best possible response. These techniques ensure that **test-time compute is used efficiently** by exploring multiple answer candidates and ranking them systematically.

PRM-based search methods can be categorized into three approaches:

1. **Majority Voting:** Selecting the most frequently occurring answer.
2. **Best-of-N Weighted Search:** Generating multiple responses and picking the best one based on PRM scores.
3. **Beam Search:** A structured search technique that explores different reasoning paths step by step.

Each method provides different trade-offs between **accuracy, efficiency, and structured reasoning**.

#### Majority Voting

Majority Voting selects the most frequently occurring answer from multiple generated responses. It is simple and effective when many independent samples are available but does not evaluate the reasoning process behind each answer.

![Majority Voting](/notes/reasoning-models-2025/ReasoningModels_Search_MajorityVoting.png)

#### Best-of-N Weighted Search

Best-of-N Weighted Search generates multiple answers independently and selects the best one based on the PRM's final evaluation score. This method improves selection quality compared to majority voting but does not consider intermediate reasoning steps.

![Best-of-N Weighted Search](/notes/reasoning-models-2025/ReasoningModels_Search_BestOfNWeightedSearch.png)

#### Beam Search

Beam Search systematically explores different reasoning paths by generating multiple candidate steps, scoring them using the PRM, and expanding only the most promising ones. It ensures a structured search process and optimizes test-time compute by refining responses progressively.

![Beam Search](/notes/reasoning-models-2025/ReasoningModels_Search_BeamSearch.png)

### Modifying the Proposal Distribution

Instead of generating answers once, models can be trained to **revise their own answers iteratively**, improving their accuracy over multiple attempts.

LLMs can be prompted to correct their own mistakes. However, this approach is ineffective as:

- LLMs Lack True Understanding
- If the model already has flawed reasoning, it may just repeat the same mistakes.
- The model may rephrase rather than truly improve its reasoning.
- There's no external check to ensure corrections are actually valid.

Since naive self-correction does not yield substantial improvements, a more **structured test-time compute strategy** is required. This strategy can be categorized into **two key approaches**:

#### Parallel vs. Sequential Test-Time Compute

Test-time compute can be utilized in two ways:

1. **Parallel Sampling (Best-of-N):** The model generates multiple solution attempts **independently in parallel**. The best outcome is then selected using specific criteria, such as majority voting or an external reward function.
2. **Sequential Revisions:** Instead of generating multiple independent responses, the model iteratively **refines** its previous answers. This allows the model to improve step by step, incorporating past attempts into each new revision.

![Proposal distribution](/notes/reasoning-models-2025/ReasoningModels_ProposalDistribution.png)

Each approach has distinct advantages:

- **Parallel Sampling** allows for **exploring multiple diverse solutions** quickly.
- **Sequential Revisions** focus on **gradual improvement** of a single solution.

Since both methods offer complementary benefits, an **optimal strategy** often involves a **hybrid approach**, allocating some compute budget to parallel sampling and some to sequential revisions. This structured approach to test-time compute enables more effective self-improvement than simple prompting alone.
