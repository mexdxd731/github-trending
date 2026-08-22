# The Advanced AI Glossary

A deep, practitioner-oriented reference covering 600+ terms across 28 domains of modern AI: from core machine learning theory to transformers, LLM training, alignment, RAG, agents, inference optimization, speech AI, Arabic and multilingual NLP, safety, interpretability, and production infrastructure.

This is not a list of one-line definitions. Each entry explains what the term actually means, why it matters, and how it connects to the rest of the field, so the glossary works as a study companion, an interview prep resource, and a shared vocabulary for engineering teams.

**How to use this repo**

- Use GitHub's file search (press `t`) or in-page search (Ctrl+F / Cmd+F) to jump to any term.
- Sections are ordered roughly from foundations to applications to production, so reading a section top to bottom works as a mini-course.
- Terms that depend on each other are cross-referenced inline (for example, RLHF points to Reward Model and PPO).

**Contributing**

Found a missing term, an outdated definition, or a better explanation? Open an issue or a PR. The bar for adding a term: it should be something a working AI engineer, researcher, or technical leader actually encounters in papers, codebases, or production systems.

---

## Table of Contents

1. [Machine Learning Foundations](#1-machine-learning-foundations)
2. [Deep Learning and Neural Architectures](#2-deep-learning-and-neural-architectures)
3. [Transformers and Attention](#3-transformers-and-attention)
4. [Large Language Models](#4-large-language-models)
5. [Tokenization and Data](#5-tokenization-and-data)
6. [Training at Scale and Optimization](#6-training-at-scale-and-optimization)
7. [Fine-Tuning and Model Adaptation](#7-fine-tuning-and-model-adaptation)
8. [Alignment and Post-Training](#8-alignment-and-post-training)
9. [Prompting and In-Context Learning](#9-prompting-and-in-context-learning)
10. [Decoding, Inference, and Serving](#10-decoding-inference-and-serving)
11. [Embeddings, Vector Search, and Reranking](#11-embeddings-vector-search-and-reranking)
12. [Retrieval-Augmented Generation (RAG)](#12-retrieval-augmented-generation-rag)
13. [Agents and Multi-Agent Systems](#13-agents-and-multi-agent-systems)
14. [Evaluation and Benchmarks](#14-evaluation-and-benchmarks)
15. [Reinforcement Learning Essentials](#15-reinforcement-learning-essentials)
16. [Multimodal and Generative Media](#16-multimodal-and-generative-media)
17. [Speech AI: STT and TTS](#17-speech-ai-stt-and-tts)
18. [Arabic and Multilingual NLP](#18-arabic-and-multilingual-nlp)
19. [Safety, Security, and Governance](#19-safety-security-and-governance)
20. [Interpretability and Explainability](#20-interpretability-and-explainability)
21. [Infrastructure, MLOps, and LLMOps](#21-infrastructure-mlops-and-llmops)
22. [Learning Theory and Model Science](#22-learning-theory-and-model-science)
23. [Reasoning and Test-Time Scaling](#23-reasoning-and-test-time-scaling)
24. [Alternative and Emerging Architectures](#24-alternative-and-emerging-architectures)
25. [Advanced Training, Adaptation, and Model Surgery](#25-advanced-training-adaptation-and-model-surgery)
26. [Core NLP Tasks and Structured Prediction](#26-core-nlp-tasks-and-structured-prediction)
27. [Frontier Safety and Alignment Research](#27-frontier-safety-and-alignment-research)
28. [Generative Media Internals: Diffusion, 3D, and Audio](#28-generative-media-internals-diffusion-3d-and-audio)

---

## 1. Machine Learning Foundations

- **Machine Learning (ML)**: The discipline of building systems that improve at a task by learning patterns from data rather than following explicitly programmed rules. Formally, a program learns from experience E with respect to task T and performance measure P if its performance at T, measured by P, improves with E.

- **Supervised Learning**: Learning a mapping from inputs to outputs using labeled examples (input, target) pairs. Covers classification (discrete targets) and regression (continuous targets). Most production ML historically falls here.

- **Unsupervised Learning**: Learning structure from unlabeled data: clustering, density estimation, dimensionality reduction. No target labels exist; the objective comes from the data itself.

- **Self-Supervised Learning (SSL)**: A form of learning where the supervision signal is derived automatically from the data, such as predicting masked words, the next token, or a missing image patch. This is the paradigm that made LLM pretraining possible at web scale, because no human labels are needed.

- **Semi-Supervised Learning**: Training with a small labeled set plus a large unlabeled set, using techniques like pseudo-labeling or consistency regularization to exploit the unlabeled portion.

- **Classification vs. Regression**: Classification predicts a category (spam or not, which intent, which dialect); regression predicts a continuous value (price, duration, score). The choice determines the loss function and output layer design.

- **Loss Function (Objective Function)**: The scalar quantity a model minimizes during training. It encodes what "good" means for the task. Everything the model learns is shaped by this single number, which is why loss design and reward design matter so much.

- **Cross-Entropy Loss**: The standard loss for classification and language modeling. It measures the difference between the predicted probability distribution and the true distribution, heavily penalizing confident wrong predictions. Next-token prediction in LLMs is cross-entropy over the vocabulary.

- **Mean Squared Error (MSE)**: The standard regression loss, the average of squared differences between predictions and targets. Sensitive to outliers because errors are squared.

- **Gradient Descent**: The core optimization algorithm: compute the gradient of the loss with respect to the parameters, then take a small step in the opposite direction. Repeated millions of times, this is how neural networks learn.

- **Stochastic Gradient Descent (SGD)**: Gradient descent using a random mini-batch of examples per step instead of the full dataset. The noise from sampling acts as implicit regularization and makes training on massive datasets computationally feasible.

- **Backpropagation**: The algorithm that efficiently computes gradients of the loss with respect to every parameter in a network by applying the chain rule backwards through the computation graph. It is the engine underneath all deep learning training.

- **Learning Rate**: The step size of each gradient update. Too high and training diverges or oscillates; too low and training crawls or gets stuck. Arguably the single most important hyperparameter.

- **Overfitting**: When a model memorizes training data specifics (including noise) instead of learning generalizable patterns, showing high training performance but poor performance on unseen data.

- **Underfitting**: When a model is too simple or undertrained to capture the underlying patterns, performing poorly on both training and test data.

- **Bias-Variance Tradeoff**: The classical tension between a model that is too rigid (high bias, underfits) and one that is too flexible (high variance, overfits). Modern deep learning complicates this picture (see Double Descent-style phenomena), but the intuition still guides model and data sizing.

- **Regularization**: Any technique that constrains a model to improve generalization: weight penalties, dropout, data augmentation, early stopping, label smoothing. The unifying idea is trading a little training performance for better test performance.

- **L1 / L2 Regularization (Weight Decay)**: Penalties added to the loss on parameter magnitudes. L1 pushes weights to exactly zero (sparsity); L2, implemented as weight decay in optimizers like AdamW, shrinks weights smoothly and is standard in transformer training.

- **Dropout**: Randomly zeroing a fraction of activations during training so the network cannot rely on any single unit, forcing redundant, robust representations. Disabled at inference.

- **Early Stopping**: Halting training when validation performance stops improving, using the validation set as a live overfitting detector.

- **Cross-Validation**: Evaluating a model by rotating which portion of the data is held out (k-fold), giving a more reliable performance estimate on small datasets than a single split.

- **Train / Validation / Test Split**: The discipline of separating data into a set for learning, a set for tuning decisions (hyperparameters, checkpoints), and a final untouched set for honest evaluation. Leakage between these sets silently inflates results.

- **Generalization**: The ability of a model to perform well on data it has never seen. The entire point of machine learning; everything else (regularization, evaluation methodology, scaling) exists in service of it.

- **Inductive Bias**: The assumptions built into a model architecture that shape what it learns easily. CNNs assume locality and translation invariance; RNNs assume sequential dependency; transformers assume relatively little, which is why they need more data but scale further.

- **Curse of Dimensionality**: The phenomenon where data becomes exponentially sparse as dimensions grow, making distance metrics less meaningful and naive density estimation hopeless. Motivates learned representations and dimensionality reduction.

- **Feature Engineering**: Manually designing input representations (n-grams, TF-IDF, aggregates, domain features) that make patterns learnable. Deep learning automated much of this, but it remains decisive in tabular ML and in how you structure context for LLMs.

- **Ensemble Learning**: Combining multiple models so their errors partially cancel. Almost always improves accuracy at the cost of compute; the same logic underlies self-consistency and best-of-N sampling in LLMs.

- **Bagging (Bootstrap Aggregating)**: Training models on bootstrap-resampled subsets of the data and averaging them (Random Forests are the canonical example). Reduces variance.

- **Boosting**: Training models sequentially, each focusing on the errors of the previous ones. Gradient boosting (XGBoost, LightGBM, CatBoost) remains state of the art on many tabular problems and is still widely deployed alongside LLMs.

- **Online Learning**: Updating a model continuously as new data arrives, as opposed to batch training on a fixed dataset. Relevant to recommendation systems, fraud detection, and any setting with rapid distribution shift.

- **i.i.d. Assumption**: The assumption that training and test data are independent and identically distributed. Most ML theory rests on it; most production failures happen because it is violated (see Distribution Shift).

- **Distribution Shift**: When the data a deployed model sees differs from its training distribution: covariate shift (inputs change), label shift (class frequencies change), or concept drift (the input-output relationship itself changes). The main reason models decay in production.

---

## 2. Deep Learning and Neural Architectures

- **Neural Network**: A function built from layers of linear transformations and nonlinear activations, trained end to end with backpropagation. With enough width, depth, and data, neural networks are universal function approximators.

- **Multilayer Perceptron (MLP) / Feed-Forward Network**: The simplest deep architecture: fully connected layers stacked with nonlinearities. Inside a transformer, the "FFN" blocks that follow attention are MLPs and hold most of the parameters.

- **Activation Function**: The nonlinearity applied after a linear transformation. Without it, stacked layers collapse into a single linear map. The choice affects gradient flow and expressiveness.

- **ReLU / GELU / SiLU (Swish)**: Common activations. ReLU (max(0, x)) is cheap and sparse but can "die." GELU and SiLU are smooth variants that empirically train better in transformers; most modern LLMs use SiLU inside gated FFNs (see SwiGLU).

- **Softmax**: A function that converts a vector of raw scores (logits) into a probability distribution summing to 1. Used in attention weights and in the output layer of language models.

- **Convolutional Neural Network (CNN)**: An architecture that applies learned filters across spatial positions, exploiting locality and weight sharing. Dominated computer vision for a decade and still powers efficient vision and audio front-ends (many speech encoders start with convolutional downsampling).

- **Pooling**: Downsampling feature maps (max or average) to reduce resolution and build spatial invariance in CNNs.

- **Receptive Field**: The region of the input that influences a given neuron's output. Deep stacks of convolutions grow the receptive field gradually; attention gives every token a global receptive field in one layer.

- **Recurrent Neural Network (RNN)**: A network that processes sequences step by step while carrying a hidden state. Conceptually elegant but hard to parallelize and prone to vanishing gradients, which is why transformers displaced RNNs for most sequence tasks.

- **LSTM (Long Short-Term Memory)**: An RNN variant with gating mechanisms (input, forget, output gates) that preserve information over long spans. The workhorse of NLP and speech from 2014 to 2018.

- **GRU (Gated Recurrent Unit)**: A simplified LSTM with fewer gates and parameters, often comparable in quality and cheaper to train.

- **Sequence-to-Sequence (Seq2Seq)**: The framework of mapping an input sequence to an output sequence of possibly different length: translation, summarization, speech recognition, TTS. Originally RNN-based, now transformer-based.

- **Encoder-Decoder**: An architecture where an encoder builds a representation of the input and a decoder generates the output while attending to that representation. Whisper (speech) and T5 (text) are canonical examples.

- **Residual (Skip) Connection**: Adding a layer's input directly to its output (x + f(x)), letting gradients flow through identity paths. The single trick that made very deep networks trainable; every transformer block is wrapped in residuals.

- **Batch Normalization**: Normalizing activations using batch statistics to stabilize and accelerate training. Standard in CNNs, problematic for variable-length sequences and small batches, which is why transformers use LayerNorm instead.

- **Layer Normalization (LayerNorm)**: Normalizing across the feature dimension of each token independently, making training stable regardless of batch size or sequence length. The default normalization in transformers.

- **RMSNorm**: A cheaper LayerNorm variant that normalizes by the root mean square without centering the mean. Used by Llama-family and most modern LLMs for a small speed and stability win.

- **Pre-Norm vs. Post-Norm**: Whether normalization is applied before or after each sublayer. Pre-norm (used by nearly all modern LLMs) is far more stable at depth; post-norm (the original Transformer) can yield slightly better quality but is fragile to train.

- **Vanishing / Exploding Gradients**: The failure modes where gradients shrink toward zero or blow up as they propagate through many layers, stalling or destabilizing training. Residuals, normalization, careful initialization, and gradient clipping are the standard defenses.

- **Weight Initialization**: How parameters are set before training (Xavier/Glorot, He, or scaled schemes for deep transformers). Poor initialization can doom training before it starts; large-model recipes specify initialization scale carefully.

- **Autoencoder**: A network trained to reconstruct its input through a compressed bottleneck, learning a dense representation of the data. The conceptual ancestor of modern representation learning.

- **Variational Autoencoder (VAE)**: A probabilistic autoencoder that learns a smooth latent distribution, enabling sampling and interpolation. Latent diffusion models (Stable Diffusion family) run diffusion inside a VAE's latent space.

- **Generative Adversarial Network (GAN)**: Two networks trained in opposition: a generator producing samples and a discriminator judging real vs. fake. Dominated image generation before diffusion models; GAN-based vocoders (HiFi-GAN) still dominate fast speech synthesis.

- **U-Net**: An encoder-decoder with skip connections between matching resolutions, originally for image segmentation. The standard denoising backbone in diffusion models before the shift to diffusion transformers (DiT).

- **Graph Neural Network (GNN)**: Networks that operate on graph-structured data by passing messages between connected nodes. Used in recommendation, molecules, fraud detection, and knowledge-graph-flavored retrieval.

- **Embedding Layer**: A lookup table mapping discrete IDs (tokens, users, items) to dense trainable vectors. The first layer of every language model; the output projection is sometimes tied to it (weight tying) to save parameters.

- **Parameter vs. Hyperparameter**: Parameters are learned by training (weights, biases); hyperparameters are set by the practitioner (learning rate, batch size, layer count, LoRA rank) and tuned by experimentation.

- **Depth vs. Width**: Two axes of scaling a network: more layers (depth) vs. larger layers (width). Depth adds compositional power, width adds capacity per step; scaling recipes balance both along with data.

---

## 3. Transformers and Attention

- **Transformer**: The architecture behind essentially all modern frontier AI, introduced in "Attention Is All You Need" (2017). It replaces recurrence with attention, processing all positions in parallel, which unlocked massive scaling on GPUs. A transformer block = attention + feed-forward network, each wrapped in residuals and normalization.

- **Attention Mechanism**: A mechanism that lets each position in a sequence gather information from other positions, weighted by learned relevance. Instead of compressing history into a fixed state (like RNNs), attention gives direct access to the entire context.

- **Query, Key, Value (QKV)**: The three projections at the heart of attention. Each token emits a query ("what am I looking for"), a key ("what do I contain"), and a value ("what do I contribute"). Attention scores are query-key similarities; the output is a score-weighted sum of values.

- **Scaled Dot-Product Attention**: The concrete formula: softmax(QK^T / sqrt(d)) V. The sqrt(d) scaling keeps dot products in a range where softmax gradients stay healthy.

- **Self-Attention**: Attention where queries, keys, and values all come from the same sequence, letting tokens contextualize each other. This is what turns "bank" into "river bank" or "financial bank" depending on context.

- **Cross-Attention**: Attention where queries come from one sequence and keys/values from another, such as a decoder attending to an encoder's output (translation, Whisper-style ASR) or a language model attending to image features in a VLM.

- **Multi-Head Attention (MHA)**: Running several attention operations in parallel with separate projections, letting the model attend to different relationship types simultaneously (syntax in one head, coreference in another), then concatenating the results.

- **Multi-Query Attention (MQA)**: All query heads share a single key/value head, shrinking the KV cache dramatically and speeding up decoding at a small quality cost.

- **Grouped-Query Attention (GQA)**: The middle ground: query heads are divided into groups, each sharing one KV head. The standard choice in modern LLMs (Llama, Mistral, Qwen) because it keeps most of MHA's quality with most of MQA's memory savings.

- **Multi-Head Latent Attention (MLA)**: An attention variant (popularized by DeepSeek) that compresses keys and values into a low-rank latent vector, cutting KV cache memory far below GQA while preserving quality. A key enabler of cheap long-context serving.

- **Causal (Masked) Attention**: Attention restricted so each token can only see previous tokens, enforcing the autoregressive property needed for generation. Implemented with a triangular attention mask.

- **Attention Mask**: A binary or additive mask controlling which positions may attend to which: causal masks for generation, padding masks for batched variable-length inputs, and custom masks for structured tasks.

- **Positional Encoding**: Any scheme that injects token order into a transformer, since attention itself is permutation-invariant. Options include learned absolute embeddings, sinusoidal encodings, RoPE, and ALiBi.

- **Rotary Position Embedding (RoPE)**: Encoding position by rotating query and key vectors by position-dependent angles, so attention scores depend on relative distance. The dominant scheme in modern LLMs because it extrapolates and scales well.

- **RoPE Scaling (Position Interpolation, NTK, YaRN)**: Techniques that stretch or reshape RoPE frequencies so a model trained on short contexts can operate at much longer contexts with little or no additional training. How many "128k context" models are actually made.

- **ALiBi (Attention with Linear Biases)**: Adding a distance-proportional penalty to attention scores instead of positional embeddings. Simple, and extrapolates to longer sequences than trained on.

- **Feed-Forward Network (FFN) / SwiGLU**: The MLP inside each transformer block, usually expanding the hidden dimension 3-4x, applying a nonlinearity, and projecting back. Modern LLMs use gated variants (SwiGLU: SiLU-gated linear units), which improve quality per parameter. Research on interpretability suggests FFNs act as key-value memories storing much of the model's factual knowledge.

- **Encoder-Only Model**: A bidirectional transformer that reads full context in both directions, producing representations rather than generating text (BERT family, most embedding and reranker models). Ideal for classification, retrieval, and understanding tasks.

- **Decoder-Only Model**: A causal transformer trained on next-token prediction that both understands and generates (GPT, Llama, Claude, Gemini). The dominant LLM architecture because one simple objective scales to everything.

- **Encoder-Decoder Model**: The two-stack design where an encoder digests the input and a decoder generates conditioned on it (T5, Whisper, most classic NMT). Still preferred when input and output are clearly distinct modalities or languages.

- **Context Window (Context Length)**: The maximum number of tokens a model can attend over in one pass, covering the prompt plus the generation. Modern frontier models range from 128k to millions of tokens, but effective use of long context often degrades before the hard limit (see Lost in the Middle).

- **Long-Context Modeling**: The set of techniques (RoPE scaling, efficient attention, careful data curricula, memory mechanisms) aimed at making models genuinely use hundreds of thousands of tokens, not just accept them.

- **KV Cache**: The stored keys and values of all previous tokens during generation, so each new token only computes attention against the cache instead of recomputing the whole prefix. It converts quadratic generation cost into linear, but its memory footprint (layers x heads x sequence length) is the main constraint in LLM serving.

- **FlashAttention**: An exact attention algorithm that reorders computation into GPU-friendly tiles, avoiding materializing the full attention matrix in memory. Delivers large speed and memory wins and is now the default in every serious training and inference stack.

- **Sliding Window Attention**: Restricting attention to a local window of recent tokens (used by Mistral and many hybrid designs), reducing compute and cache size; often interleaved with full-attention layers to retain global reach.

- **Sparse Attention**: Any pattern that computes attention over a subset of position pairs (local, strided, block, learned) to break the quadratic cost of full attention on long sequences.

- **Linear Attention**: Reformulations of attention with kernel tricks so cost grows linearly with sequence length, trading some quality for the ability to handle very long sequences and constant-memory inference.

- **Attention Sink**: The empirical phenomenon where models dump excess attention mass onto the first token(s). Preserving these sink tokens is what makes streaming inference with windowed caches (StreamingLLM-style) work without quality collapse.

- **Mixture of Experts (MoE)**: An architecture where each FFN is replaced by many parallel "expert" FFNs and a router activates only a few per token. This decouples total parameters from per-token compute: a model can have hundreds of billions of parameters while only tens of billions are active per token (Mixtral, DeepSeek-V3, and most frontier models).

- **Router (Gating Network)**: The small network inside an MoE layer that scores experts for each token and dispatches it to the top-k. Router design determines load balance, stability, and specialization.

- **Expert**: One of the parallel FFN modules in an MoE layer. Experts tend to specialize by token type, language, or domain, though the specialization is emergent rather than assigned.

- **Load Balancing Loss**: An auxiliary loss (or loss-free bias method) that pushes the router to spread tokens across experts, preventing a few experts from absorbing all traffic while others go untrained.

- **Active vs. Total Parameters**: The MoE distinction between parameters used per token (active) and parameters stored overall (total). "A 671B model with 37B active" means inference costs scale with 37B while capacity reflects 671B.

- **State Space Model (SSM)**: A sequence architecture family (S4, Mamba) that processes tokens through a learned recurrent dynamical system with linear-time computation and constant-size state, making very long sequences cheap.

- **Mamba (Selective SSM)**: The SSM variant whose state transitions depend on the input (selectivity), closing much of the quality gap with attention. Widely used in hybrid stacks and speech models where long audio sequences make attention expensive.

- **Hybrid Architecture**: Models interleaving attention layers with SSM or linear-attention layers (Jamba, Zamba, many 2025-era models) to combine attention's precision with SSMs' efficiency on long contexts.

- **Logits**: The raw, unnormalized scores a model outputs over its vocabulary before softmax. All decoding strategies (temperature, top-p, constrained decoding) are operations on logits.

- **LM Head**: The final linear projection from the model's hidden state to vocabulary-sized logits. Often weight-tied with the input embedding matrix.

---

## 4. Large Language Models

- **Language Model (LM)**: A model that assigns probabilities to sequences of tokens, equivalently predicting the next token given the previous ones. Everything an LLM does (answering, coding, reasoning) is expressed through this single interface.

- **Large Language Model (LLM)**: A transformer language model with billions to trillions of parameters trained on trillions of tokens of text (and increasingly other modalities). Scale produces broad competence: one model handles translation, coding, analysis, and dialogue without task-specific training.

- **Foundation Model**: A large model trained on broad data that serves as the base for many downstream applications through prompting, fine-tuning, or retrieval. The term emphasizes the platform role: build once, adapt everywhere.

- **Frontier Model**: An informal term for the most capable model generation available at a given time (Claude, GPT, Gemini class), usually with associated safety and governance obligations.

- **Pretraining**: The first, largest training stage: self-supervised next-token prediction over massive corpora. This is where the model acquires language, world knowledge, and reasoning primitives; everything after (SFT, RLHF) shapes behavior rather than adding most knowledge.

- **Next-Token Prediction**: The deceptively simple pretraining objective: given a prefix, predict a probability distribution over the next token. To predict well at scale, a model is forced to internalize grammar, facts, style, and causal structure, which is why this objective produces general capability.

- **Masked Language Modeling (MLM)**: The BERT-style objective: hide random tokens and predict them from bidirectional context. Produces strong encoders for understanding and embeddings, but does not naturally generate text.

- **Autoregressive Generation**: Producing output one token at a time, each conditioned on everything generated so far. The source of LLMs' fluency and also of their sequential inference cost.

- **Base Model vs. Instruct (Chat) Model**: A base model is the raw pretrained network: a text continuator with no instruction-following behavior. An instruct/chat model is the same network after post-training (SFT + preference optimization) that follows instructions, uses chat formatting, and refuses harmful requests. Confusing the two is a common deployment mistake.

- **Perplexity**: The exponentiated average negative log-likelihood of a dataset under a model: intuitively, how "surprised" the model is by the text. Lower is better. The standard intrinsic metric for language modeling quality, though it correlates imperfectly with downstream usefulness.

- **Scaling Laws**: Empirical power-law relationships showing that loss decreases predictably as model size, dataset size, and compute grow (Kaplan et al. 2020). Scaling laws turned model development from alchemy into forecasting and justified frontier-scale investments.

- **Compute-Optimal Training (Chinchilla)**: The finding that for a fixed compute budget, model size and training tokens should scale together (roughly 20 tokens per parameter under original assumptions). Earlier models were undertrained on data; Chinchilla reset the recipe.

- **Overtraining (Inference-Optimal Training)**: Deliberately training a smaller model far past its compute-optimal token count (Llama-style, hundreds of tokens per parameter) because a smaller, better-trained model is cheaper to serve for its quality level. Training cost is paid once; inference cost is paid forever.

- **Emergent Abilities**: Capabilities that appear abruptly at scale rather than improving smoothly (multi-step arithmetic, instruction following at small scale). Debated methodologically (some "emergence" is a metric artifact), but the practical experience of new abilities unlocking with scale is real.

- **Hallucination (Confabulation)**: A model generating fluent, confident content that is factually wrong or fabricated: invented citations, fake API parameters, nonexistent case law. A structural consequence of next-token prediction optimizing plausibility, not truth. Mitigations: retrieval grounding, tool use, calibrated refusals, and verification layers, not prompt magic alone.

- **Knowledge Cutoff**: The date after which a model's training data ends, bounding its parametric knowledge of events. Retrieval and web tools exist largely to compensate for it.

- **Parametric vs. Non-Parametric Knowledge**: Knowledge stored in the model's weights vs. knowledge fetched at inference time from external sources (RAG, tools, databases). Production systems deliberately shift factual load to the non-parametric side because it is updatable, auditable, and citable.

- **Reasoning Model**: A model post-trained (usually with reinforcement learning on verifiable tasks) to produce long internal chains of thought before answering, trading inference compute for accuracy on math, code, and multi-step problems (o-series, DeepSeek-R1, Claude extended thinking modes).

- **Test-Time Compute (Inference-Time Scaling)**: The paradigm of improving answers by spending more compute at inference: longer reasoning traces, multiple samples with voting, search over solution paths, or verifier-guided selection. A second scaling axis alongside training scale.

- **Knowledge Distillation**: Training a smaller "student" model to imitate a larger "teacher," either matching its output distributions or training on its generated data. The standard route to small models with outsized quality, and the reason model providers restrict training on their outputs.

- **Model Merging**: Combining the weights of multiple fine-tuned models (averaging, task vectors, SLERP, TIES) into one model that inherits several specializations without additional training. Surprisingly effective and popular in the open-weights community.

- **Multi-Token Prediction (MTP)**: A training objective where the model predicts several future tokens at each position instead of one, densifying the learning signal and enabling faster speculative-style decoding (used in DeepSeek-V3).

- **Grokking**: The phenomenon where a model, long after apparently memorizing training data, suddenly transitions to genuine generalization. A window into how memorization and generalization circuits compete during training.

- **Memorization**: A model reproducing training examples verbatim rather than abstracting from them. A privacy and copyright concern (extraction attacks) and a quality concern (benchmark contamination); deduplication reduces it.

- **Small Language Model (SLM)**: Loose term for capable models in roughly the 0.5B-15B range designed for on-device or cheap deployment (Phi, Gemma, Qwen small variants). Strong SLMs are typically distilled from and trained on data curated by frontier models.

- **Open-Weights vs. Closed Model**: Whether a model's weights are downloadable and self-hostable (Llama, Qwen, DeepSeek, Mistral) or accessible only through an API (Claude, GPT, Gemini). "Open weights" is not the same as open source: training data and code often remain closed, and licenses may restrict use.

- **Checkpoint**: A saved snapshot of model weights (and optionally optimizer state) at a point in training. Used for resuming training, evaluation along the run, and shipping the final artifact.

---

## 5. Tokenization and Data

- **Tokenization**: Converting raw text into the discrete units (tokens) a model actually processes. Everything downstream (context limits, cost, multilingual fairness, arithmetic ability) is shaped by this preprocessing step that most users never see.

- **Token**: The atomic unit of model input/output: usually a subword chunk like "ing", " Cairo", or "ال". As a rough rule, one token is about 4 English characters or 0.75 words, but the ratio varies sharply by language and tokenizer.

- **Subword Tokenization**: Splitting words into frequent fragments so any string can be represented with a bounded vocabulary: common words stay whole, rare words decompose. The compromise between character-level (long sequences) and word-level (unbounded vocabulary) approaches.

- **Byte-Pair Encoding (BPE)**: The dominant subword algorithm: start from bytes or characters and iteratively merge the most frequent adjacent pair until reaching the target vocabulary size. Used (in byte-level form) by GPT-family and most modern LLMs.

- **WordPiece**: BERT's subword algorithm, similar to BPE but choosing merges by likelihood gain rather than raw frequency.

- **SentencePiece**: A language-agnostic tokenization toolkit that operates on raw text (treating spaces as symbols), implementing BPE and Unigram. Standard for multilingual models because it needs no language-specific pre-segmentation.

- **Unigram Tokenization**: A probabilistic method that starts from a large candidate vocabulary and prunes it, keeping the segmentation that maximizes corpus likelihood. Often yields more linguistically natural splits than BPE.

- **Byte-Level Tokenization**: Building the vocabulary on top of raw bytes so literally any input (any script, emoji, binary-ish text) is representable with no unknown tokens. Byte-fallback hybrids are now standard.

- **Vocabulary Size**: The number of distinct tokens a model knows (32k in early Llama, 100k-260k in modern multilingual models). Larger vocabularies compress text into fewer tokens (cheaper, longer effective context) at the cost of larger embedding matrices.

- **Tokenizer Fertility**: The average number of tokens needed per word (or per character) in a given language. High fertility means a language is "expensive": Arabic text on an English-centric tokenizer can cost 2-4x the tokens of equivalent English, directly inflating cost and shrinking effective context. A core metric for multilingual fairness.

- **Special Tokens**: Reserved tokens with structural meaning: beginning/end of sequence, padding, role markers, tool-call delimiters. Mishandling them (double BOS, wrong EOS) is a classic source of silent quality bugs in fine-tuning.

- **Chat Template**: The exact string format that wraps a conversation (system/user/assistant turns, special tokens) before tokenization. Every model family has its own; applying the wrong template is one of the most common causes of degraded fine-tuned or self-hosted model behavior.

- **Out-of-Vocabulary (OOV)**: Input the tokenizer cannot represent as known units. Byte-level fallback has largely eliminated hard OOV failures, but rare strings still fragment into many tokens, degrading modeling quality.

- **Corpus**: A body of text (or speech) assembled for training or evaluation. The composition of the pretraining corpus is a model's genome: it determines languages, domains, and biases.

- **Web-Scale Data (Common Crawl)**: The petabyte-scale web snapshots underlying most pretraining corpora. Raw crawl data is mostly noise; the value is created by the filtering pipeline (FineWeb, RefinedWeb, RedPajama are examples of curated derivatives).

- **Data Filtering / Quality Classifiers**: Pipelines that score and filter raw data: heuristics (length, symbol ratios), model-based quality classifiers, toxicity filters, and language identification. Modern practice increasingly uses LLM-graded quality signals; data curation now rivals architecture as a competitive differentiator.

- **Deduplication**: Removing exact and near-duplicate documents (hashing, MinHash/LSH, suffix arrays) from training data. Reduces memorization, benchmark contamination, and wasted compute; one of the highest-ROI steps in data engineering.

- **Synthetic Data**: Training data generated by models rather than collected from humans: rewritten web text, generated instructions, distilled reasoning traces, textbook-style corpora (Phi-style). Now central to both pretraining and post-training, with quality control and diversity (avoiding model collapse) as the key challenges.

- **Data Mixture**: The recipe of proportions across sources and domains (web, code, books, math, multilingual) in a training run, often with different weights per training phase. Mixture tuning measurably moves final capabilities.

- **Data Augmentation**: Expanding a dataset with label-preserving transformations: paraphrase and back-translation for text, SpecAugment for speech, crops and flips for images. A cheap regularizer, especially in low-resource settings.

- **Annotation (Labeling)**: Producing ground-truth labels with human (or model-assisted) effort: intents, entities, transcripts, preference rankings, red-team judgments. Annotation guideline quality usually matters more than annotator count.

- **Inter-Annotator Agreement (IAA)**: The degree to which independent annotators produce the same labels, measured by Cohen's kappa, Fleiss' kappa, or Krippendorff's alpha. Low agreement signals an ill-defined task; it caps the meaningful accuracy any model can achieve on that data.

- **Active Learning**: Iteratively selecting the most informative unlabeled examples (uncertain, diverse, disagreement-inducing) for human labeling, maximizing quality gained per annotation dollar.

- **Data Flywheel**: The compounding loop where a deployed product generates usage data, which improves the model, which improves the product, which attracts more usage. The structural moat behind most successful applied-AI companies.

---

## 6. Training at Scale and Optimization

- **Optimizer**: The algorithm that turns gradients into parameter updates. The choice and its hyperparameters govern convergence speed, stability, and final quality.

- **Adam / AdamW**: The default deep learning optimizer: per-parameter adaptive learning rates from running averages of first and second gradient moments. AdamW decouples weight decay from the adaptive update and is the standard for transformer training. Its cost: two extra states per parameter, tripling optimizer memory.

- **Muon and Second-Order-Flavored Optimizers**: A newer generation of optimizers (Muon, Shampoo/SOAP lineage) that orthogonalize or precondition updates for matrix parameters, showing meaningful compute savings over AdamW in large-model training and adopted in several frontier-scale runs.

- **Learning Rate Schedule**: The planned trajectory of the learning rate: warmup from near zero, then decay (cosine, linear, or warmup-stable-decay). WSD schedules keep the rate flat for most of training then decay sharply, making it easy to branch continued-training runs from the stable phase.

- **Warmup**: Starting training with a very small learning rate that ramps up over the first steps, protecting the fragile early phase (especially with Adam's uncalibrated moment estimates) from destructive updates.

- **Gradient Clipping**: Capping the global norm of gradients before the update step, preventing rare huge gradients (bad batches, instabilities) from blowing up training. Standard in every LLM recipe.

- **Gradient Accumulation**: Summing gradients over several micro-batches before applying one optimizer step, simulating a large batch size on limited memory. Effective batch = micro-batch x accumulation steps x data-parallel ranks.

- **Batch Size (Effective Batch Size)**: The number of sequences (or tokens) per optimizer step. Larger batches stabilize gradients and utilize hardware efficiently but show diminishing returns past a critical batch size; LLM batches are usually measured in millions of tokens.

- **Mixed-Precision Training (FP16 / BF16)**: Computing in 16-bit while keeping master weights and sensitive accumulations in 32-bit, roughly doubling speed and halving memory. BF16's wide exponent range removed the loss-scaling headaches of FP16 and is now the default.

- **FP8 Training**: Pushing matrix multiplications down to 8-bit floating point on modern accelerators (H100/B200 class) for further speedups, with careful scaling to preserve stability. Used in DeepSeek-V3 and increasingly in frontier training.

- **Gradient (Activation) Checkpointing**: Discarding intermediate activations during the forward pass and recomputing them during backward, trading roughly 30% extra compute for a large memory reduction. Essential for training big models on finite GPU memory.

- **Data Parallelism**: Replicating the model across devices, feeding each a different data shard, and averaging gradients (all-reduce) each step. The simplest way to scale; limited by each device needing to hold the full model (unless sharded, see ZeRO/FSDP).

- **Tensor Parallelism**: Splitting individual weight matrices across devices so one layer's computation spans several GPUs, communicating activations at layer boundaries. Needed when a single layer no longer fits or single-GPU throughput is insufficient; bandwidth-hungry, so usually kept within a node.

- **Pipeline Parallelism**: Assigning different layers to different devices and streaming micro-batches through them like an assembly line. Scales depth across nodes; the challenge is minimizing idle "bubbles" via micro-batch scheduling.

- **Sequence (Context) Parallelism**: Splitting the sequence dimension across devices (ring attention and variants) so extremely long contexts fit in memory. The enabler of million-token training.

- **Expert Parallelism**: Distributing MoE experts across devices, with tokens routed over the network to their assigned experts. Adds all-to-all communication as a first-class cost in MoE training and serving.

- **3D / 4D Parallelism**: Combining data, tensor, pipeline (and expert or sequence) parallelism in one topology-aware layout. Frontier training runs are as much distributed-systems engineering as ML.

- **ZeRO / FSDP**: Sharding optimizer states, gradients, and parameters across data-parallel ranks (DeepSpeed ZeRO stages 1-3; PyTorch FSDP) so no device holds the full training state. The standard way to train models far larger than a single GPU's memory.

- **Loss Spike**: A sudden jump in training loss at scale, caused by bad data batches, numerical instability, or optimizer state issues. Frontier recipes include spike detection, batch skipping, and checkpoint rollback because a single unhandled spike can waste enormous compute.

- **Checkpointing (Fault Tolerance)**: Regularly saving full training state so multi-week runs on thousands of GPUs survive inevitable hardware failures. Checkpoint frequency is a tradeoff between I/O overhead and lost work per failure.

- **Continued Pretraining (Mid-Training)**: Additional pretraining of an existing model on targeted data: a new domain (legal, medical), a new language, or long-context extension. The middle ground between pretraining from scratch and light fine-tuning, and the standard route to strong domain or language adaptation (highly relevant for Arabic-focused models).

- **Annealing Phase**: The late-pretraining phase where the data mixture shifts toward the highest-quality sources (curated text, math, code) as the learning rate decays, disproportionately shaping final benchmark performance.

- **Curriculum Learning**: Ordering training data by difficulty or quality over time rather than sampling uniformly. In LLMs this appears as staged mixtures and annealing rather than strict easy-to-hard ordering.

- **Hyperparameter Tuning (muP / muTransfer)**: Finding good training hyperparameters. At scale, exhaustive sweeps are impossible, so techniques like muP parameterize networks so optimal hyperparameters transfer from small proxy models to large ones.

---

## 7. Fine-Tuning and Model Adaptation

- **Fine-Tuning**: Continuing training of a pretrained model on task- or domain-specific data. The general umbrella covering full fine-tuning, PEFT, SFT, and preference optimization.

- **Transfer Learning**: The principle that representations learned on one large task transfer to others, so you adapt a pretrained model instead of training from scratch. The economic foundation of the entire foundation-model era.

- **Supervised Fine-Tuning (SFT)**: Training on curated prompt-response pairs with the standard next-token loss (usually masked to the response). The first post-training stage: it teaches format, style, and instruction following, and is also how task-specific behavior (structured extraction, house tone, tool syntax) is installed.

- **Instruction Tuning**: SFT specifically on diverse instruction-response data spanning many task types, which converts a base model into a general instruction follower rather than a single-task specialist.

- **Parameter-Efficient Fine-Tuning (PEFT)**: The family of methods that adapt a model while training only a small fraction of parameters (adapters, LoRA, prompt tuning), cutting memory and storage costs and reducing catastrophic forgetting. Enables serving many task adaptations of one base model.

- **LoRA (Low-Rank Adaptation)**: The dominant PEFT method: freeze the base weights and learn low-rank update matrices (W + BA, with rank r of 8-128) on attention and FFN projections. Trains on a fraction of the memory of full fine-tuning, and adapters can be merged into the base or hot-swapped at serving time.

- **QLoRA**: LoRA on top of a 4-bit-quantized (NF4) frozen base model with paged optimizers, enabling fine-tuning of very large models on modest hardware, with quality close to 16-bit LoRA.

- **DoRA and LoRA Variants**: Refinements of LoRA (DoRA decomposes weights into magnitude and direction; rsLoRA, LoRA+ adjust scaling and learning rates) that close remaining gaps to full fine-tuning in some regimes.

- **Adapters**: Small bottleneck modules inserted between transformer layers and trained while the base stays frozen. The original PEFT approach; largely superseded by LoRA but conceptually foundational.

- **Prompt Tuning / Soft Prompts**: Learning continuous embedding vectors prepended to the input (not human-readable text) while freezing the model. Extremely parameter-light; works best on large models and narrow tasks.

- **Prefix Tuning**: Learning virtual key/value prefixes injected into every attention layer, a more expressive cousin of prompt tuning.

- **Full Fine-Tuning**: Updating all model weights on the target data. Highest ceiling and highest cost (memory for optimizer states, risk of forgetting); typically reserved for serious domain shifts, continued pretraining, or when PEFT plateaus.

- **Catastrophic Forgetting**: The tendency of a network to lose previously learned capabilities when trained on new data. Mitigations: lower learning rates, mixing in general "replay" data, PEFT, and regularization toward the original weights.

- **Domain Adaptation**: Adapting a general model to a specialized distribution (legal Arabic, medical notes, telecom support) via continued pretraining, SFT on domain tasks, or retrieval over domain corpora. The right mix depends on how much the domain's language, not just its facts, differs from pretraining data.

- **Multi-Task Learning**: Training one model on several tasks simultaneously so shared structure improves all of them. Instruction tuning is multi-task learning at extreme breadth.

- **Layer Freezing**: Keeping some layers (usually early ones) fixed during fine-tuning to preserve general features, cut compute, and reduce forgetting.

---

## 8. Alignment and Post-Training

- **Alignment**: Making a model's behavior match human intentions and values: helpful, honest, harmless, and steerable. Practically, the post-training pipeline (SFT + preference optimization + safety training); conceptually, the broader research problem of controlling increasingly capable systems.

- **Post-Training**: Everything applied after pretraining to turn a raw text predictor into a useful assistant: SFT, preference optimization (RLHF/DPO), reasoning RL, safety training, and tool-use training. Post-training now accounts for a large share of frontier models' perceived quality differences.

- **RLHF (Reinforcement Learning from Human Feedback)**: The pipeline that aligns models to human preferences: collect human comparisons of model outputs, train a reward model on them, then optimize the LLM against that reward with RL (classically PPO) under a KL constraint keeping it close to the SFT model. The technique behind the ChatGPT-moment jump in usability.

- **Reward Model (RM)**: A model (usually an LLM with a scalar head) trained on preference comparisons to score how good a response is. It stands in for human judgment during RL; its blind spots become the policy's exploits.

- **Reward Hacking**: The policy discovering behaviors that score highly on the reward model without being genuinely better: verbosity, confident tone, sycophancy, formatting tricks, or in code RL, deleting failing tests. The central failure mode of optimizing proxies; a special case of Goodhart's Law.

- **Preference Data**: Datasets of prompt + two or more responses with a human (or AI) judgment of which is better. The raw material of reward models and direct preference methods; its quality and diversity bound what alignment can achieve.

- **KL Penalty (Policy Constraint)**: A term penalizing divergence between the trained policy and its reference model during RLHF, preventing the policy from wandering into degenerate high-reward but low-quality regions.

- **PPO (Proximal Policy Optimization)**: The classic RL algorithm used in RLHF: clipped policy-gradient updates that limit how far each step moves the policy. Powerful but heavy (four models in memory: policy, reference, reward, value) and finicky to tune.

- **GRPO (Group Relative Policy Optimization)**: A lighter RL algorithm (popularized by DeepSeek) that removes the value network: sample a group of responses per prompt, use the group's normalized scores as advantages. Cheap and stable enough to make large-scale reasoning RL widely accessible.

- **DPO (Direct Preference Optimization)**: Reframing preference alignment as a simple classification-style loss directly on preference pairs, skipping the explicit reward model and RL loop entirely. Far simpler and cheaper than PPO-based RLHF, with competitive quality on many tasks; the default preference method in the open ecosystem.

- **DPO Variants (IPO, KTO, ORPO, SimPO)**: The family of refinements: IPO fixes DPO's overfitting to preferences, KTO learns from single thumbs-up/down labels instead of pairs, ORPO folds preference optimization into SFT in one stage, SimPO removes the reference model. Selection is largely empirical per dataset.

- **RLAIF (RL from AI Feedback)**: Replacing human preference labels with judgments from a strong model, scaling feedback collection by orders of magnitude. Most modern pipelines mix human and AI feedback.

- **Constitutional AI**: Anthropic's approach where a written set of principles (a "constitution") guides the model to critique and revise its own outputs, and to generate preference labels, reducing dependence on human labeling for harmlessness and making the value system explicit and inspectable.

- **RLVR (RL with Verifiable Rewards)**: Reinforcement learning where the reward comes from an automatic checker rather than a learned preference model: unit tests for code, exact answers for math, format validators. The engine behind reasoning models, because verifiable rewards cannot be flattered, only solved.

- **Process vs. Outcome Reward Models (PRM / ORM)**: An ORM scores only the final answer; a PRM scores each intermediate reasoning step. PRMs give denser signal and better-guided search but are expensive to label and can be gamed by plausible-looking steps.

- **Rejection Sampling (Best-of-N)**: Generating N candidate responses and keeping the best according to a reward model or verifier, either for serving (better answers at N-times cost) or for creating high-quality SFT data from the model's own best outputs.

- **Self-Improvement (Self-Play)**: Loops where a model generates candidate solutions, filters them with verifiers or judges, and trains on the survivors, iteratively lifting its own ceiling. Works cleanly where verification is reliable (math, code); riskier in open-ended domains.

- **Sycophancy**: A model's tendency to agree with the user's stated beliefs or flatter them rather than being accurate, a learned artifact of optimizing for human approval. Actively measured and trained against in serious alignment pipelines.

- **Alignment Tax**: Capability lost as a side effect of safety and alignment training (over-refusal, hedging, reduced creativity). Modern post-training aims to minimize it; measuring it requires capability benchmarks alongside safety benchmarks.

- **Refusal**: A trained behavior where the model declines harmful or out-of-policy requests. Calibrating refusals (refusing what should be refused, and nothing more) is a core post-training quality axis; over-refusal is itself a failure mode.

- **System Prompt**: Privileged instructions injected by the developer before the conversation, setting role, constraints, tone, and tool policies. Models are specifically trained to weight system instructions above user instructions, which is also why system-prompt leakage and injection matter for security.

---

## 9. Prompting and In-Context Learning

- **Prompt**: The full input a model conditions on: system instructions, conversation history, retrieved context, and the current request. Since weights are frozen at inference, the prompt is the entire interface for steering behavior.

- **Prompt Engineering**: The craft of designing prompts that reliably elicit the desired behavior: clear instructions, delimiters, examples, output schemas, and explicit reasoning room. Less alchemy than early days; closer to writing good specifications.

- **Context Engineering**: The broader discipline that succeeded prompt-centric thinking: deciding what information enters the context window and in what structure: retrieved documents, tool outputs, memory, summaries, few-shot examples, and their ordering and budgets. In agentic systems, context management (what to keep, compress, or drop across steps) often matters more than prompt wording.

- **Roles (System / User / Assistant / Tool)**: The structured message types in chat-formatted models. The separation exists so models can weight instructions by their source, which underpins both steerability and injection defenses.

- **Zero-Shot**: Asking a model to perform a task with instructions only, no examples. The baseline capability mode of instruction-tuned models.

- **Few-Shot Learning (In-Context Learning, ICL)**: Placing a handful of input-output examples in the prompt so the model infers the task pattern and applies it to a new input, with no weight updates. One of the most striking emergent behaviors of scale; example choice, order, and format all measurably affect accuracy.

- **Chain-of-Thought (CoT)**: Prompting or training a model to produce intermediate reasoning steps before the final answer, converting hard single-step predictions into sequences of easier ones. Dramatically improves math, logic, and multi-step tasks; the seed idea behind reasoning models.

- **Zero-Shot CoT**: Triggering step-by-step reasoning with a bare instruction ("think step by step") instead of worked examples. Mostly historical now that models reason by default, but a landmark result.

- **Self-Consistency**: Sampling multiple independent reasoning paths and taking a majority vote on the final answer. A simple, robust accuracy boost that trades inference cost for reliability.

- **Tree of Thoughts / Search over Reasoning**: Structuring problem solving as a tree of partial solutions explored with lookahead and backtracking, optionally guided by a value/verifier model. The prompting-era ancestor of verifier-guided test-time search.

- **ReAct (Reason + Act)**: The loop pattern where a model alternates between reasoning ("thought") and tool calls ("action"), incorporating each observation before the next step. The conceptual template of nearly all tool-using agents.

- **Prompt Chaining**: Decomposing a task into a fixed pipeline of prompts, each consuming the previous output (extract, then transform, then draft, then verify). More controllable and debuggable than one mega-prompt; the workflow end of the workflow-vs-agent spectrum.

- **Role (Persona) Prompting**: Assigning the model an identity or expertise frame to shift tone, register, and priorities. Useful for style; not a substitute for actual capability or grounding.

- **Structured Output (JSON Mode / Schemas)**: Forcing model output to conform to a schema, via instructions, function-calling formats, or grammar-constrained decoding. The difference between a demo and a system: downstream code needs guaranteed parseability.

- **Meta-Prompting**: Using a model to write, critique, or optimize prompts for itself or other models, including automated prompt-optimization loops (DSPy-style) that treat prompts as tunable parameters.

- **Prompt Compression**: Shrinking long contexts (summarizing history, pruning low-value tokens, distilling instructions) to cut cost and latency while preserving task-relevant information.

---

## 10. Decoding, Inference, and Serving

- **Inference**: Running a trained model to produce outputs. In LLM systems, inference cost, latency, and throughput dominate the economics; most "LLM engineering" is inference engineering.

- **Decoding Strategy**: The rule for turning the model's next-token probability distribution into an actual token choice, balancing quality, diversity, and determinism.

- **Greedy Decoding**: Always picking the highest-probability token. Deterministic and fast, but prone to repetition and blandness; locally optimal choices are often globally suboptimal.

- **Beam Search**: Keeping the k most probable partial sequences at each step and expanding them. Standard in machine translation and speech recognition; rarely used for open-ended chat, where it produces degenerate, repetitive text.

- **Temperature**: A scalar dividing the logits before softmax. Below 1 sharpens the distribution toward high-probability tokens (focused, deterministic-ish); above 1 flattens it (diverse, riskier). Temperature 0 conventionally means greedy.

- **Top-k Sampling**: Sampling only among the k highest-probability tokens, cutting off the long unreliable tail.

- **Top-p (Nucleus) Sampling**: Sampling from the smallest token set whose cumulative probability exceeds p (e.g. 0.9), adapting the candidate pool to the model's confidence: narrow when the model is sure, wide when it is not.

- **Min-p Sampling**: Keeping tokens whose probability is at least a fraction of the top token's probability. Scales the cutoff with confidence and behaves better than top-p at high temperatures; popular in open-model serving.

- **Repetition / Frequency / Presence Penalties**: Logit adjustments that discourage tokens already generated, suppressing loops and verbatim repetition. Blunt instruments: overuse degrades text that legitimately needs repetition (code, names).

- **Logit Bias**: Directly adding offsets to specific tokens' logits to force, favor, or ban them, useful for classification-style outputs and blocklists.

- **Constrained (Grammar-Based) Decoding**: Masking invalid tokens at each step so output provably conforms to a grammar, regex, or JSON schema. How "structured outputs" features guarantee parseable results rather than merely requesting them.

- **Prefill vs. Decode**: The two inference phases: prefill processes the entire prompt in parallel (compute-bound, determines time to first token), decode generates tokens one by one (memory-bandwidth-bound, determines tokens per second). They stress hardware differently, motivating separate optimization and even separate hardware pools.

- **Time to First Token (TTFT) / Tokens per Second (TPS)**: The two user-facing latency metrics: how long until output starts (dominated by prefill and queueing) and how fast it streams (dominated by decode). Interactive products live and die by TTFT; batch pipelines care about total throughput.

- **Continuous Batching**: Scheduling at the token level so new requests join and finished requests leave a running batch every step, instead of waiting for whole-batch completion. The single biggest throughput innovation in LLM serving (vLLM, TGI, TensorRT-LLM all implement it).

- **PagedAttention**: Managing the KV cache in fixed-size pages with an OS-style page table (vLLM's core idea), eliminating memory fragmentation and enabling cache sharing across requests, which multiplies effective serving capacity.

- **Chunked Prefill**: Splitting long prompt prefills into chunks interleaved with decode steps, so one huge prompt does not stall token generation for everyone else in the batch.

- **Prompt (Context) Caching**: Reusing the computed KV cache for repeated prompt prefixes (system prompts, few-shot blocks, shared documents) across requests, cutting both latency and cost dramatically. Exposed as an explicit feature by major API providers; cache-aware prompt layout (stable prefix first) is now a design skill.

- **Disaggregated Serving**: Running prefill and decode on separate GPU pools connected by KV-cache transfer, so each phase scales on the hardware profile it actually needs. An increasingly standard architecture for large-scale deployments.

- **Speculative Decoding**: Accelerating generation by letting a small draft model (or extra draft heads: Medusa, EAGLE, MTP-based drafting) propose several tokens that the large model verifies in one parallel pass. Output distribution stays exactly the target model's; speedups of 2-3x are typical when the draft agrees often.

- **Quantization**: Representing weights (and optionally activations and KV cache) in lower precision (8-bit, 4-bit, and below) to shrink memory and increase speed. The highest-leverage deployment optimization: a 4-bit model needs roughly a quarter of the memory of 16-bit with modest quality loss when done well.

- **PTQ vs. QAT**: Post-Training Quantization converts a finished model (calibration only, no retraining): GPTQ, AWQ, and round-to-nearest schemes. Quantization-Aware Training simulates low precision during training for better accuracy at aggressive bit widths. PTQ dominates LLM practice for its convenience.

- **Quantization Formats (GPTQ, AWQ, GGUF, bitsandbytes, FP8/INT8)**: The practical ecosystem: GPTQ and AWQ for GPU-served 4-bit models, GGUF as the llama.cpp format for CPU/edge with many quantization levels, bitsandbytes for on-the-fly 8/4-bit loading, FP8 for modern-accelerator serving. Choice depends on hardware and stack.

- **KV Cache Quantization**: Storing cached keys/values in 8-bit or 4-bit, multiplying how many concurrent long-context requests fit in memory, usually with negligible quality impact at 8-bit.

- **Pruning / Sparsity**: Removing weights, heads, or layers that contribute little (unstructured or structured pruning, 2:4 semi-structured sparsity for hardware speedups), often followed by a short "healing" fine-tune.

- **Serving Frameworks (vLLM, SGLang, TensorRT-LLM, TGI, llama.cpp / Ollama)**: The inference engines implementing the techniques above: vLLM and SGLang as high-throughput open standards, TensorRT-LLM for maximum NVIDIA performance, llama.cpp/Ollama for local and edge deployment. Framework choice sets your ceiling on throughput per GPU.

- **Streaming**: Sending tokens to the client as they are generated rather than after completion. Baseline UX for chat; interacts with structured outputs (partial JSON) and moderation (streamed content is harder to retract).

- **Batch (Offline) Inference**: Processing large request volumes without latency constraints, maximizing GPU utilization; API providers price it at large discounts. The right mode for evaluation runs, data generation, and backfills.

- **Cost per Token (Serving Economics)**: The unit economics of LLM products: input vs. output token pricing, cache discounts, batch discounts, and model routing. Engineering decisions (prompt length, caching layout, model choice per request) translate directly into gross margin.

---

## 11. Embeddings, Vector Search, and Reranking

- **Embedding**: A dense vector representing the meaning of a piece of content (text, image, audio) such that semantic similarity becomes geometric proximity. The bridge between unstructured data and computable operations: search, clustering, deduplication, classification.

- **Embedding Model (Bi-Encoder)**: A model that encodes queries and documents independently into vectors compared with a cheap similarity function. Independence is what makes web-scale search feasible: documents are embedded once offline, queries at runtime.

- **Cross-Encoder**: A model that reads query and document together in one forward pass and outputs a relevance score. Far more accurate than bi-encoders (full token-level interaction) but cannot be precomputed, so it is used to rerank a shortlist, not to search a corpus.

- **Reranker**: The second-stage model in modern retrieval: take the top 50-200 candidates from fast first-stage retrieval and reorder them with a cross-encoder (or LLM judge). Usually the single highest-ROI upgrade to RAG quality.

- **Late Interaction (ColBERT)**: A middle path storing one vector per token and computing fine-grained token-level matching (MaxSim) at query time. More accurate than single-vector retrieval, cheaper than cross-encoders, at the cost of much larger indexes.

- **Similarity Metrics (Cosine, Dot Product, Euclidean)**: The functions comparing vectors. Cosine (angle only) is the default for normalized text embeddings; dot product incorporates magnitude; Euclidean measures raw distance. Must match how the embedding model was trained.

- **Vector Database**: A system for storing embeddings and answering nearest-neighbor queries at scale with filtering, persistence, and hybrid search (Qdrant, Milvus, Weaviate, pgvector, Pinecone). The retrieval substrate of RAG systems.

- **Approximate Nearest Neighbor (ANN) Search**: Trading exactness for speed in similarity search: instead of scanning all vectors, use index structures that find near-optimal neighbors in sublinear time. The recall/latency tradeoff is tunable.

- **HNSW (Hierarchical Navigable Small World)**: The dominant ANN index: a multi-layer graph navigated greedily from coarse to fine. Excellent recall/speed at the cost of significant memory.

- **IVF and Product Quantization (PQ)**: Alternative ANN machinery: IVF clusters vectors and searches only relevant clusters; PQ compresses vectors into compact codes. Combined (IVF-PQ), they trade some recall for dramatic memory savings on huge corpora.

- **Sparse Retrieval (BM25 / TF-IDF)**: Classic lexical search scoring exact term overlap with frequency weighting. Zero training, fully interpretable, unbeatable on exact identifiers, codes, and rare names; its weakness is vocabulary mismatch (synonyms, paraphrase). Learned sparse models (SPLADE) bridge lexical and semantic.

- **Hybrid Search**: Running dense and sparse retrieval together and fusing results, capturing both semantic similarity and exact-match precision. The pragmatic default for production RAG, especially in morphologically rich languages where lexical match alone is brittle.

- **Reciprocal Rank Fusion (RRF)**: The standard score-free method for merging ranked lists from multiple retrievers: sum 1/(k + rank) across lists. Robust because it ignores incomparable raw scores.

- **Contrastive Learning**: The training paradigm behind embedding models: pull matched pairs together, push mismatched pairs apart (InfoNCE loss over in-batch negatives, triplet losses). Quality hinges on pair construction and negatives.

- **Hard Negatives**: Training negatives that are topically close but genuinely non-matching, forcing the model to learn fine distinctions instead of easy separations. Mining good hard negatives is where embedding training quality is won.

- **Matryoshka Representation Learning (MRL)**: Training embeddings so meaningful information concentrates in the leading dimensions, letting one model serve multiple sizes (truncate 1024-dim vectors to 256 with modest loss). Cuts storage and search cost with one model.

- **MTEB (Massive Text Embedding Benchmark)**: The standard leaderboard for embedding models across retrieval, clustering, classification, and STS tasks, with multilingual tracks. Useful for shortlisting; final choice should be validated on your own domain and language.

---

## 12. Retrieval-Augmented Generation (RAG)

- **RAG (Retrieval-Augmented Generation)**: The architecture where relevant external content is retrieved at query time and placed in the model's context before generation. It grounds answers in current, private, or verifiable data, converts hallucination into a retrieval problem, and enables citations, without retraining the model.

- **Ingestion Pipeline**: The offline half of RAG: parsing source documents (PDF, HTML, DOCX, scans), cleaning, chunking, enriching with metadata, embedding, and indexing. Most real-world RAG failures trace back to ingestion (bad parsing, broken tables, lost structure) rather than the model.

- **Chunking**: Splitting documents into retrieval units. Chunk size trades precision (small chunks match queries tightly) against context (large chunks preserve meaning); overlap prevents facts from being severed at boundaries. Structure-aware chunking (headings, sections, tables) beats naive fixed-size splitting.

- **Semantic Chunking**: Choosing chunk boundaries by topic shifts (embedding similarity between consecutive segments) rather than fixed lengths, keeping coherent ideas intact.

- **Top-k Retrieval**: Fetching the k best-scoring chunks for a query. k balances recall against context budget and distraction; typical systems retrieve wide (20-100) then rerank down to a few.

- **Query Rewriting / Expansion**: Transforming the raw user query before retrieval: resolving conversational references ("what about its pricing?"), expanding with synonyms, or decomposing multi-part questions into sub-queries. Fixes the mismatch between how users ask and how documents are written.

- **HyDE (Hypothetical Document Embeddings)**: Having the LLM write a hypothetical answer to the query and retrieving with that text's embedding, exploiting the fact that answers resemble documents more than questions do.

- **Contextual Retrieval**: Prepending a short LLM-generated description of each chunk's document context before embedding it, so chunks carry the situational information ("this is from ACME's Q3 2025 contract, termination section") that raw excerpts lose. Substantially reduces retrieval failures on large corpora.

- **Parent-Document (Small-to-Big) Retrieval**: Indexing and matching on small precise chunks, but feeding the model their larger parent sections, getting matching precision and generation context simultaneously.

- **Multi-Hop Retrieval**: Answering questions that require chaining evidence across documents ("who managed the project that replaced system X?") through iterative retrieve-reason-retrieve cycles instead of one lookup.

- **GraphRAG**: Building a knowledge graph (entities and relations extracted by LLMs) over the corpus and retrieving through graph structure and community summaries. Shines on global, aggregate questions ("what are the main themes across these 500 reports?") that chunk-level similarity search cannot answer.

- **Agentic RAG**: Putting retrieval under the control of an agent that decides when to search, reformulates queries, evaluates evidence sufficiency, and iterates. Replaces the fixed retrieve-then-generate pipeline for complex research-style tasks.

- **Grounding**: Constraining generation to the retrieved evidence: answer from the provided context, say so when the context is insufficient. The behavioral contract that makes RAG trustworthy; enforced through prompting, fine-tuning, and answer verification.

- **Citation / Attribution**: Linking each claim in the answer to its supporting source span. Turns the model's output from an assertion into a checkable document; essential in legal, medical, and enterprise deployments.

- **Lost in the Middle**: The empirical finding that models attend best to the beginning and end of long contexts and under-use the middle. Practical consequences: rerank so the best evidence sits at the edges, and do not assume a 200k window means 200k tokens of equal attention.

- **Long Context vs. RAG**: The recurring architecture question: stuff everything into a huge context, or retrieve selectively? Long context wins on simplicity for bounded corpora; RAG wins on cost, latency, freshness, access control, and corpora larger than any window. Mature systems combine both (retrieval into a generous context, with caching).

- **RAG Evaluation (Faithfulness, Context Precision/Recall)**: Measuring the two failure surfaces separately: retrieval quality (did the right evidence arrive: context precision/recall, hit rate, MRR/nDCG) and generation quality (is the answer supported by the evidence: faithfulness/groundedness, answer relevance). Frameworks like RAGAS operationalize these with LLM judges.

---

## 13. Agents and Multi-Agent Systems

- **AI Agent**: A system where an LLM directs its own workflow: it perceives context, decides on actions (tool calls), observes results, and iterates toward a goal without a human scripting each step. The defining property is model-controlled control flow, not merely having tools attached.

- **Agentic Workflow vs. Agent**: The design spectrum: workflows are predefined pipelines with LLM steps inside fixed control flow (predictable, debuggable, cheaper); agents let the model choose the path dynamically (flexible, harder to bound). Sound engineering practice: use the least agency the task allows.

- **Tool Use (Function Calling)**: The mechanism letting models invoke external capabilities: the developer declares tool schemas (name, parameters, description), the model emits structured calls, the runtime executes them and returns results into context. Tool descriptions are effectively prompts; writing them well is a core skill.

- **Planning (Task Decomposition)**: The agent capability of breaking a goal into ordered, dependency-aware steps and revising the plan as evidence arrives. Weak planning shows up as thrashing: redundant searches, circular tool calls, premature answers.

- **Agent Memory**: State persisting beyond the current context window: short-term working notes, long-term stores of facts and preferences (often files or vector stores), and episodic records of past interactions, with explicit read/write policies. Memory design determines whether an agent improves with use or repeats itself.

- **Context Management (Compaction)**: Actively curating an agent's context across a long task: summarizing completed steps, dropping stale tool outputs, keeping goals and constraints pinned. Long-horizon agents fail without it, because context windows fill with low-value history and quality degrades.

- **Reflection (Self-Critique)**: The pattern of having the model review its own output or trajectory against criteria and revise: check the code against the tests, verify the answer against sources. One of the most reliable quality boosts in agent design.

- **Orchestration**: The coordination layer of a multi-step or multi-agent system: routing tasks, sequencing steps, managing shared state, handling failures and retries. Provided by frameworks (LangGraph and similar) or built directly; in production, observability of the orchestration layer is non-negotiable.

- **Orchestrator-Worker Pattern**: A lead agent decomposes the task and dispatches focused sub-agents (each with its own clean context and tools), then integrates their results. The standard shape for research, coding, and analysis agents, and the basis of most "deep research" products.

- **Multi-Agent System**: Multiple specialized agents interacting toward a goal: division of labor (separate contexts and toolsets per role), debate (independent answers, then critique and reconciliation), or review chains (maker-checker). Adds capability and parallelism at the cost of coordination overhead, compounding errors, and multiplied token spend.

- **Agent Handoff**: Transferring control of a conversation or task from one agent to another with the necessary state (summary, artifacts, constraints). Poor handoffs (dropped context, ambiguous ownership) are a primary multi-agent failure mode.

- **MCP (Model Context Protocol)**: The open standard for connecting AI applications to tools and data sources: servers expose tools/resources/prompts in a uniform way, clients (Claude, IDEs, agent frameworks) consume them without bespoke integrations. Doing for AI tools what USB-style standardization did for peripherals; adopted across the major AI vendors.

- **A2A (Agent-to-Agent Protocols)**: Emerging standards for communication between independent agents across vendors and organizations: capability discovery, task delegation, and status exchange. Complementary to MCP: MCP connects agents to tools; A2A connects agents to each other.

- **Computer Use (GUI / Browser Agents)**: Agents that operate software the human way: reading screenshots or accessibility trees, clicking, typing, and navigating browsers and desktops. Unlocks the long tail of software without APIs; current frontier work centers on reliability, speed, and safe handling of credentials and irreversible actions.

- **Sandboxing**: Executing agent actions (code, shell, browsing) inside isolated environments with restricted filesystem, network, and credential access, so mistakes and attacks are contained. The precondition for giving agents real execution power.

- **Human-in-the-Loop (HITL)**: Designing explicit human checkpoints into agent flows: approval gates for irreversible or high-stakes actions, escalation paths for low confidence, and review queues. The dial between automation speed and acceptable risk.

- **Trajectory (Rollout)**: The full recorded sequence of an agent run: thoughts, tool calls, observations, and outcome. The unit of agent evaluation and of agentic RL training data; production teams collect and mine trajectories the way web teams mine logs.

- **Environment**: The world an agent acts in and receives observations from: a browser, a codebase with tests, a simulated OS, a game. Environment design (realism, reward availability, safety rails) is becoming its own engineering discipline for both evaluation and RL.

---

## 14. Evaluation and Benchmarks

- **Benchmark**: A standardized dataset plus metric used to compare models on a capability. Benchmarks made progress measurable, but every benchmark eventually gets saturated, contaminated, or gamed, so serious teams treat public scores as a screening signal, not the truth.

- **Evals (Task-Specific Evaluation)**: The applied discipline of measuring whether a model or system performs *your* task: curated test sets, graded rubrics, automated judges, regression suites run on every change. In production AI, the eval suite is the real specification of the product; "vibes-based" shipping fails silently.

- **MMLU / MMLU-Pro**: Broad multiple-choice knowledge and reasoning benchmarks across dozens of academic and professional subjects. The long-time headline "general capability" number, now largely saturated at the frontier (hence harder successors like MMLU-Pro).

- **GSM8K / MATH**: Math benchmarks: grade-school word problems (GSM8K) and competition problems (MATH). Historically the proving grounds for chain-of-thought and reasoning RL; both are near-saturated for frontier reasoning models, pushing evaluation toward harder sets (AIME-level and beyond).

- **HumanEval / SWE-bench**: Coding benchmarks at two levels: HumanEval measures writing isolated functions from docstrings; SWE-bench measures resolving real GitHub issues in full repositories, testing the agentic loop of reading, editing, and verifying code. SWE-bench (and its Verified subset) became the de facto agent-coding benchmark.

- **GPQA**: Graduate-level, "Google-proof" science questions written by domain experts, designed so that search alone does not help. One of the few knowledge-reasoning benchmarks still discriminating among frontier models.

- **Chatbot Arena (Elo Ratings)**: Crowd-sourced pairwise battles where users compare anonymous model responses, aggregated into Elo-style ratings. Captures real-preference quality that static benchmarks miss, while inheriting the biases of its user base and prompt distribution (and rewarding style as well as substance).

- **LLM-as-a-Judge**: Using a strong model to grade outputs against a rubric or to compare candidates, making large-scale evaluation affordable. Powerful but biased in known ways: position bias, verbosity bias, self-preference; mitigations include randomized ordering, forced rubrics, and periodic human calibration.

- **Pass@k**: The probability that at least one of k sampled solutions is correct (verified by tests or checkers). The standard metric for code and any verifiable generation; the gap between pass@1 and pass@k measures how much value verifiers and retries can extract.

- **Exact Match / F1**: Span- and token-overlap metrics from the QA tradition: exact match is strict string equality with the gold answer, F1 gives partial credit for overlapping tokens.

- **BLEU**: The classic machine-translation metric: n-gram precision against reference translations with a brevity penalty. Cheap and standardized but blind to meaning; two correct translations can score very differently.

- **ROUGE**: The summarization counterpart, measuring n-gram and longest-common-subsequence recall against reference summaries. Same virtue (cheap), same vice (surface overlap is not quality).

- **chrF**: Character-n-gram F-score for translation, more robust than BLEU for morphologically rich languages (including Arabic) because it credits partial word matches.

- **Learned Metrics (COMET, BERTScore)**: Evaluation models that score semantic similarity using embeddings (BERTScore) or are trained on human quality judgments (COMET). Correlate far better with humans than n-gram metrics; the modern default for translation quality.

- **Calibration**: Whether a model's confidence matches its accuracy: among answers given with 90% confidence, about 90% should be correct. Poorly calibrated systems fail dangerously because their errors arrive with high confidence; measured with ECE and reliability diagrams.

- **Data Contamination**: Benchmark items leaking into training data, inflating scores without real capability. Endemic because benchmarks live on the same web that models train on; defenses include held-out private sets, canary strings, contamination detection, and fresh benchmarks (LiveBench-style rolling items).

- **Held-Out Set**: Data strictly excluded from all training and tuning decisions, preserved for honest final measurement. Once you iterate against a set, it stops being held out.

- **Ablation Study**: Removing or varying one component at a time (a data source, an architecture choice, a pipeline stage) to attribute performance to causes. The difference between knowing your system works and knowing why.

- **A/B Testing**: Comparing variants on live traffic with real outcome metrics (task completion, retention, deflection rate). The final arbiter: offline evals predict, online experiments decide.

- **Golden Dataset**: A small, meticulously verified set of input-output pairs representing the product's ground truth, used for regression testing and judge calibration. Every serious LLM product ends up building one.

- **Benchmark Saturation**: When top models cluster near a benchmark's ceiling and it stops discriminating. The treadmill dynamic of LLM evaluation: MMLU gave way to MMLU-Pro and GPQA, GSM8K to AIME-level sets, HumanEval to SWE-bench.

- **Goodhart's Law**: "When a measure becomes a target, it ceases to be a good measure." The unifying explanation of reward hacking, benchmark gaming, and metric-chasing product decisions. The practical antidote: multiple metrics, held-out measures, and human spot checks.

---

## 15. Reinforcement Learning Essentials

- **Reinforcement Learning (RL)**: Learning behavior from interaction: an agent takes actions in an environment, receives rewards, and adjusts its policy to maximize cumulative reward. Distinct from supervised learning in that no one provides the correct action; the signal is evaluative, delayed, and sparse.

- **Agent-Environment Loop (State, Action, Reward)**: The core formalism (an MDP): at each step the agent observes a state, selects an action, and receives a reward and next state. For LLM RL, the "state" is the conversation so far, the "action" is the next token (or full response), and the reward arrives at the end.

- **Policy**: The agent's behavior function: a mapping from states to (distributions over) actions. An LLM being RL-trained *is* the policy; "policy model" in RLHF papers means the LLM being optimized.

- **Value Function / Q-Function**: Estimates of expected future reward: V(s) for states, Q(s, a) for state-action pairs. Used to judge whether an action turned out better than expected, which is the learning signal in actor-critic methods.

- **Advantage (GAE)**: How much better an action was than the policy's average at that state (Q minus V). Generalized Advantage Estimation is the standard bias-variance-controlled estimator; GRPO replaces learned value baselines with group-relative advantages.

- **Reward Function**: The formal specification of the goal. Reward design is where RL projects succeed or fail: under-specified rewards get gamed (reward hacking), over-specified ones block creative solutions.

- **Discount Factor (Gamma)**: How much future rewards are worth relative to immediate ones (0 to 1). Low gamma makes agents myopic; high gamma makes credit assignment harder.

- **Exploration vs. Exploitation**: The fundamental dilemma: exploit the best known behavior or explore for better ones. In LLM RL, sampling temperature and entropy bonuses play the exploration role; collapsed exploration yields models that converge on one narrow style.

- **On-Policy vs. Off-Policy**: Whether the algorithm learns only from data generated by the current policy (PPO, GRPO: fresher signal, more expensive) or can reuse data from older or different policies (Q-learning, offline RL: sample-efficient, riskier).

- **Q-Learning / DQN**: The classic off-policy value-based family: learn Q(s, a) and act greedily on it. DQN (Q-learning with deep networks, replay buffers, target networks) launched the deep RL era with Atari.

- **Policy Gradient**: Directly adjusting policy parameters in the direction that makes high-reward actions more probable (REINFORCE and descendants). The family all LLM RL methods belong to, since sampling tokens is naturally a stochastic policy.

- **Actor-Critic**: Combining a policy (actor) with a learned value function (critic) that reduces gradient variance. PPO is the canonical actor-critic; GRPO is what you get when you delete the critic and normalize within a group instead.

- **Offline RL**: Learning a policy purely from a fixed dataset of past trajectories, with no environment interaction. Attractive wherever exploration is expensive or unsafe; the core difficulty is avoiding overestimating actions the data never tried.

- **Reward Shaping**: Adding intermediate rewards to guide learning when the true reward is sparse. Helpful and dangerous in equal measure: badly shaped rewards teach the shaping, not the goal.

- **Credit Assignment**: Determining which earlier decisions caused a later outcome. The deep difficulty of RL, and acute in LLM reasoning: which of 3,000 generated tokens made the proof correct? Process reward models and step-level advantages are attempts to answer it.

- **Multi-Armed Bandit**: The one-state RL setting: repeatedly choose among options with unknown payoffs, balancing exploration and exploitation (epsilon-greedy, UCB, Thompson sampling). The formal backbone of A/B testing, recommendation, and model routing.

- **Monte Carlo Tree Search (MCTS)**: Planning by simulating many futures from the current state, expanding a search tree guided by value estimates (the heart of AlphaGo). Its ideas reappear in LLM test-time search over reasoning paths.

- **Sample Efficiency**: How much interaction data an algorithm needs to learn. The chronic weakness of RL and a key constraint in agentic RL, where each sample is a full multi-step trajectory in a slow environment.

- **Imitation Learning (Behavioral Cloning)**: Learning a policy by supervised training on expert demonstrations instead of reward signals. Pure cloning suffers compounding errors once the agent drifts off the expert's states; DAgger fixes this by iteratively querying the expert on the learner's own visited states. SFT on human-written responses is exactly behavioral cloning applied to language.

- **Inverse Reinforcement Learning (IRL)**: Inferring the reward function that explains observed behavior, rather than assuming it is given. The conceptual ancestor of preference-based reward modeling: RLHF is, in effect, IRL from pairwise human comparisons.

- **Model-Based RL**: Learning a dynamics model of the environment and using it for planning or imagined rollouts (Dyna-style), instead of learning purely from real experience. Dramatically more sample efficient when the model is good; MuZero showed the model can be learned implicitly, planning in latent space without reconstructing observations.

- **Soft Actor-Critic (SAC)**: The workhorse off-policy algorithm for continuous control, maximizing reward plus policy entropy so exploration is built into the objective. Together with its deterministic relatives (DDPG, TD3), it defines the robotics and control side of deep RL that predates and parallels the LLM era.

- **Self-Play and League Training**: Training agents against copies or past versions of themselves so the opponent curriculum scales automatically (AlphaZero, and AlphaStar's league of diverse exploiter agents). The game-theoretic counterpart of LLM self-improvement (see Self-Improvement), now resurfacing in automated red teaming and negotiation agents.

- **Intrinsic Motivation (Curiosity-Driven Exploration)**: Adding internally generated rewards for novelty or prediction error so agents explore when external rewards are sparse. The standard answer to hard-exploration environments (Montezuma's Revenge), and a design idea echoed in curiosity-style bonuses for agentic LLM training.

- **Hindsight Experience Replay (HER)**: Relabeling failed goal-conditioned trajectories as successes for the goals they actually reached, turning failures into training signal. A canonical trick for sparse-reward goal-reaching tasks in robotics.

- **Multi-Turn (Agentic) RL**: Optimizing entire multi-step trajectories of an LLM agent (tool calls, environment feedback, intermediate decisions) rather than single responses. The hard parts are long-horizon credit assignment, expensive environment rollouts, and reward design for partially verifiable tasks; this is the training frontier behind current agentic models.

---

## 16. Multimodal and Generative Media

- **Multimodal Model**: A model that processes and/or generates multiple modalities (text, images, audio, video) in one system, sharing representations across them. Frontier assistants are natively multimodal rather than text models with bolted-on converters.

- **Vision-Language Model (VLM)**: A model combining a vision encoder with an LLM so it can reason over images and text jointly: describe screenshots, read documents, ground UI actions. The standard recipe: pretrained vision encoder + projector into the LLM's embedding space + multimodal instruction tuning.

- **CLIP (Contrastive Language-Image Pretraining)**: The landmark model trained to align image and text embeddings in one space via contrastive learning on web image-caption pairs. Enabled zero-shot image classification and became the default vision encoder and the text conditioning backbone for image generation.

- **Vision Transformer (ViT)**: Applying the transformer directly to images by splitting them into patches treated as tokens. Displaced CNNs as the dominant vision architecture at scale; nearly all VLM vision encoders are ViTs.

- **Patch Embedding (Visual Tokens)**: The image equivalent of tokenization: fixed-size patches (e.g. 14x14 pixels) projected into embedding vectors. Image resolution therefore translates directly into token count and cost in VLMs.

- **Projector (Multimodal Adapter)**: The small module (linear layer, MLP, or resampler like Q-Former) mapping vision-encoder outputs into the LLM's token space, aligning the two pretrained components with modest training (the LLaVA recipe).

- **Discrete Visual Tokenization (VQ-VAE)**: Compressing images into sequences of discrete codes from a learned codebook, so autoregressive transformers can generate images token by token like text. The alternative pathway to diffusion for unified any-to-any models.

- **Diffusion Model**: The dominant image (and video) generation paradigm: gradually add noise to data during training, learn to reverse it, then generate by iteratively denoising from pure noise. Trades sampling speed (many denoising steps) for stable training and state-of-the-art quality.

- **Latent Diffusion**: Running diffusion in a VAE's compressed latent space instead of pixel space, cutting compute enormously. The architecture of Stable Diffusion and most production image generators.

- **Diffusion Transformer (DiT)**: Replacing the U-Net denoiser with a transformer, letting diffusion inherit transformer scaling laws. The backbone of modern video generation (Sora-class systems).

- **Classifier-Free Guidance (CFG)**: The sampling technique that amplifies prompt adherence by extrapolating between conditional and unconditional predictions each denoising step. The "guidance scale" knob every image-generation user adjusts trades fidelity to the prompt against naturalness and diversity.

- **Flow Matching**: A generative framework that learns a direct continuous transport from noise to data, simplifying diffusion training and enabling high quality in very few sampling steps. Rapidly adopted in image (SD3, Flux) and speech synthesis.

- **ControlNet (Structural Conditioning)**: Adding trainable branches to a frozen diffusion model so generation follows structural inputs: edges, depth maps, poses, layouts. What turned image generation from slot-machine prompting into a controllable design tool.

- **Inpainting / Outpainting**: Regenerating a masked region of an image consistently with its surroundings (inpainting) or extending the canvas beyond original borders (outpainting). The workhorse operations of AI-assisted image editing.

- **Text-to-Video**: Generating video from text descriptions, requiring temporal consistency on top of visual quality. Current systems (DiT-based, trained on video-caption data) handle short clips with impressive physical plausibility and characteristic failure modes in object permanence and causality.

- **Any-to-Any (Omni) Models**: Unified models accepting and producing multiple modalities natively (text, image, audio in and out) within one architecture and token stream, replacing pipelines of specialized models (GPT-4o-class, Gemini-class).

- **World Model**: A model that learns environment dynamics (what happens next given state and action), enabling imagination-based planning and serving as training grounds for embodied and game agents. Interactive video-generation systems (Genie-class) are early general world models.

- **Negative Prompt**: Specifying what a diffusion model should avoid (artifacts, styles, objects), implemented through guidance away from the negative embedding. A practical control absent from LLM text generation.

---

## 17. Speech AI: STT and TTS

- **Speech-to-Text (STT / ASR)**: Automatic Speech Recognition: converting audio into text. Modern ASR is end-to-end neural (audio in, tokens out), with the main architectural split being offline encoder-decoder models vs. streaming transducers.

- **Text-to-Speech (TTS)**: Synthesizing speech from text. Modern systems split into an acoustic stage (text to intermediate representation: mel spectrogram or discrete audio tokens) and a waveform stage (vocoder or codec decoder), increasingly unified in LLM-style token-based architectures.

- **Sample Rate**: Audio samples per second: 8 kHz (telephony), 16 kHz (standard ASR), 24-48 kHz (TTS and music). Mismatched sample rates between training and inference are a classic silent quality killer.

- **Mel Spectrogram**: The standard audio representation: a time-frequency image with frequencies warped to the perceptual mel scale. The input to most ASR encoders and the classic intermediate output of TTS acoustic models.

- **MFCC (Mel-Frequency Cepstral Coefficients)**: The compact classical speech features derived from mel spectra. Dominated pre-deep-learning ASR; now mostly replaced by raw mel filterbanks or learned features, but still common in lightweight and embedded systems.

- **Acoustic Model**: Historically, the component mapping audio features to phonetic units, combined with a lexicon and language model in hybrid ASR. In end-to-end systems the distinction dissolves, but the term survives for the audio-encoding half.

- **Language Model Fusion**: Injecting an external text LM into ASR decoding (shallow fusion adds LM scores during beam search) to improve fluency and rare-word handling, especially valuable for domain terms and low-resource dialects.

- **CTC (Connectionist Temporal Classification)**: The alignment-free training objective that lets an encoder output per-frame token probabilities (with a blank symbol) without knowing which frame maps to which character. Enables fast, simple, non-autoregressive ASR; weaker at modeling output dependencies, so often combined with attention or rescoring.

- **RNN-T (Transducer)**: The streaming-native ASR architecture combining an audio encoder, a text prediction network, and a joiner that emits tokens as audio arrives. The industry standard for on-device and live ASR (keyboards, assistants, captions) because it needs no future context.

- **Attention-Based Encoder-Decoder (Whisper-Style ASR)**: ASR as sequence-to-sequence translation: an encoder digests the full utterance, a decoder generates the transcript with cross-attention. Highest accuracy on complete utterances and robust to noise and accents (Whisper's recipe: massive weak supervision across languages), but inherently offline and prone to hallucinating text on silence or music.

- **Streaming ASR**: Recognition that emits text incrementally with bounded latency while audio is still arriving, using causal or chunked encoders. The engineering tension: every millisecond of allowed future context ("right context") buys accuracy and costs latency.

- **Chunked Inference**: Processing long audio by windowing it into overlapping chunks with context carry-over, merging transcripts at boundaries. How offline models like Whisper serve long recordings and how streaming systems bound their memory.

- **Voice Activity Detection (VAD)**: Detecting where speech exists in audio, gating what reaches the recognizer. Critical in production: VAD errors either cut off speakers or feed silence and noise into models that then hallucinate transcripts.

- **Endpointing**: Deciding that a speaker has finished their turn, closing the microphone and triggering the response. The perceived intelligence of voice assistants lives here: endpoint too early and you interrupt users mid-sentence, too late and the assistant feels sluggish.

- **Speaker Diarization**: Segmenting audio by who spoke when ("speaker 1: ..., speaker 2: ..."), typically via speaker embeddings plus clustering, or end-to-end neural diarization. Essential for meetings, call centers, and any multi-speaker transcript.

- **Forced Alignment**: Given audio and its known transcript, computing precise time stamps for each word or phoneme. The tool behind subtitle timing, TTS dataset preparation, pronunciation scoring, and dubbing.

- **Word Error Rate (WER) / Character Error Rate (CER)**: The ASR accuracy metrics: edit distance (substitutions + insertions + deletions) divided by reference length, at word or character level. CER is fairer for morphologically rich or space-ambiguous languages; for Arabic, always report whether diacritics and normalization were applied, or numbers are not comparable.

- **Self-Supervised Speech Models (wav2vec 2.0, HuBERT, WavLM)**: Encoders pretrained on raw unlabeled audio by predicting masked or quantized segments, learning powerful speech representations. Fine-tuning them collapsed the labeled-data requirements of ASR, transforming low-resource speech (including dialectal Arabic) from impossible to practical.

- **SpecAugment**: The standard ASR data augmentation: masking random time and frequency bands of the spectrogram during training. Cheap, universal, and consistently worth a WER improvement.

- **Vocoder**: The neural network converting acoustic representations (mel spectrograms) into waveforms. HiFi-GAN-class GAN vocoders dominate production for speed and quality; the vocoder ceiling determines how natural any two-stage TTS can sound.

- **Neural Audio Codec (EnCodec, SoundStream, DAC)**: Autoencoders that compress audio into discrete tokens at very low bitrates and reconstruct it with high fidelity. Their token streams are the "text" of modern speech language models: they made TTS and speech-to-speech into sequence modeling problems.

- **Residual Vector Quantization (RVQ)**: The quantization scheme inside neural codecs: a hierarchy of codebooks where each level encodes the residual of the previous, yielding coarse-to-fine token streams. Explains why codec-based TTS generates "semantic first, acoustic detail second."

- **Semantic vs. Acoustic Tokens**: The two families of discrete speech tokens: semantic tokens (from SSL models like HuBERT) capture content and phonetics; acoustic tokens (from codecs) capture full sound including timbre and recording conditions. Modern TTS pipelines often generate semantic tokens first, then acoustic tokens conditioned on them.

- **Zero-Shot TTS (Voice Cloning)**: Synthesizing speech in a voice unseen during training from a few seconds of reference audio, by conditioning on speaker representations (VALL-E lineage and successors). Powers personalization and dubbing, and drives the deepfake-audio safety conversation.

- **Speaker Embedding (x-vector / d-vector)**: A fixed-size vector capturing voice identity, trained on speaker-discrimination tasks. Used for speaker verification, diarization, and as the conditioning signal in multi-speaker and cloned TTS.

- **Prosody (F0, Energy, Duration)**: The suprasegmental qualities of speech: pitch contour, loudness, rhythm, and phrasing. Prosody is where "correct but robotic" TTS fails; controllable-prosody models expose these as knobs, and Arabic prosody interacts with diacritization and dialect.

- **Duration Model**: The TTS component predicting how long each phoneme lasts, aligning text to time in non-autoregressive systems (FastSpeech lineage). Duration errors produce rushed, smeared, or droning speech.

- **Flow-Matching TTS**: The current high-quality synthesis recipe: flow matching generates mel or codec features in a handful of steps conditioned on text and a reference voice, achieving near-human naturalness with fast inference. The technique behind leading 2024-2026 open TTS systems.

- **Speech LLM (Audio LLM)**: An LLM that consumes and/or produces audio tokens natively, unifying ASR, TTS, and spoken dialogue in one model. Enables paralinguistic understanding (tone, emotion, hesitation) that cascaded ASR-then-text pipelines discard.

- **Speech-to-Speech (End-to-End Voice)**: Models mapping spoken input directly to spoken output without intermediate text, preserving latency budgets and expressive nuance. The architecture behind real-time voice modes; text transcripts become an optional byproduct rather than the pipeline's spine.

- **Full-Duplex Interaction**: Voice systems that listen while speaking, handling overlaps, backchannels ("mm-hmm"), and interruptions like humans do, instead of rigid walkie-talkie turn taking. The frontier of natural voice UX.

- **Barge-In**: The specific capability of letting a user interrupt system speech, requiring echo cancellation (so the system does not hear itself), instant playback stop, and graceful dialog-state repair.

- **Real-Time Factor (RTF)**: Processing time divided by audio duration: RTF 0.1 means transcribing or synthesizing 10 seconds of audio per second of compute. The core speech-serving throughput metric, alongside first-audio latency for interactive TTS.

- **MOS / CMOS (Mean Opinion Score)**: The standard subjective quality measures for synthesized speech: absolute 1-5 naturalness ratings (MOS) or side-by-side comparative ratings (CMOS). Human MOS remains the gold standard; neural predictors (UTMOS-style) approximate it cheaply at scale.

- **Grapheme-to-Phoneme (G2P)**: Converting written text into phoneme sequences for TTS front-ends and pronunciation modeling. For Arabic, G2P is only well-defined after diacritization, which is why tashkeel quality directly gates Arabic TTS quality, and why many modern systems learn pronunciation implicitly from audio instead.

- **Text Normalization and Inverse Text Normalization (ITN)**: The TTS front-end step that expands written forms into speakable words (numbers, dates, currencies, abbreviations), and the ASR post-processing step that converts spoken forms back into written conventions ("five hundred riyals" to "SAR 500"). Usually hybrid WFST-plus-neural systems; a disproportionate share of production speech bugs lives here, especially across Arabic number and date conventions.

- **Punctuation and Casing Restoration**: Post-processing raw ASR output (which has neither) into readable, correctly punctuated text. Essential for downstream NLP, subtitling, and summarization; typically a small sequence-labeling model over the transcript.

- **Shallow Fusion (External LM Fusion)**: Interpolating an external language model's scores into ASR beam search at decode time, biasing recognition toward in-domain vocabulary without retraining the acoustic model. The cheapest form of ASR domain adaptation, with deep and cold fusion as the trained alternatives.

- **Contextual Biasing (Hotword Boosting)**: Boosting the decode-time probability of user- or session-specific terms (contact names, product SKUs, medical drugs) via boosted phrase lists or trie-based mechanisms. The standard fix for the rare-entity failures that dominate real-world ASR complaints.

- **Two-Pass ASR (Rescoring and Deliberation)**: Serving a fast streaming first pass for live captions, then rescoring its n-best hypotheses or lattices (the compact graph of alternative transcriptions) with a stronger model or LLM for the final transcript. The production pattern that reconciles low latency with best accuracy.

- **ASR Confidence Scoring**: Estimating per-word or per-utterance reliability of a transcript, used to gate human review, trigger clarification in voice bots, and filter pseudo-labels for semi-supervised training. Needs explicit calibration: raw model probabilities are poor confidence estimates.

- **Speaker Verification and Anti-Spoofing**: Confirming a claimed identity from voice (1:1 matching of speaker embeddings, versus identification's 1:N search), and detecting presentation attacks including replayed and synthetic speech. Zero-shot voice cloning has made anti-spoofing and deepfake detection a mandatory companion to any voice biometric deployment.

- **Speech Enhancement**: Removing noise and reverberation from audio for human listening or as ASR preprocessing. A cascaded enhancer can distort features in ways that hurt ASR, so production systems often prefer training the recognizer on augmented noisy data or learning enhancement jointly.

- **Source Separation and Target Speaker Extraction**: Separating overlapped speakers in a mixture (the cocktail party problem), or extracting only a target speaker conditioned on an enrollment embedding of their voice. The key technology behind meeting transcription with overlap and personalized ASR.

- **Keyword Spotting (Wake Word Detection)**: Tiny always-on models that detect a trigger phrase on-device under severe compute, memory, and power constraints, with false-accept and false-reject rates as the core tradeoff. The gateway component of every voice assistant.

- **Speech Emotion Recognition (Paralinguistics)**: Classifying affect, arousal, and other speaker states from how something is said rather than what is said, part of the broader paralinguistics family (speaker traits, health signals). Increasingly folded into speech LLMs that describe emotion and speaking style in natural language.

- **Non-Autoregressive TTS**: Generating all acoustic frames in parallel with explicit duration prediction (FastSpeech lineage) instead of frame-by-frame autoregression. Fast and robust against the skipping and repetition failure modes of AR decoders; the contrasting design pole to codec-LM TTS.

- **Singing Voice Synthesis**: TTS extended with explicit pitch, duration, and score control to produce singing, including singing voice conversion of one voice into another. Shares codec and vocoder machinery with speech but adds musical constraints, and sits at the center of voice-likeness licensing debates.

---

## 18. Arabic and Multilingual NLP

- **Modern Standard Arabic (MSA)**: The standardized formal register of Arabic used in news, government, education, and literature across all Arab countries. The default register of "Arabic" datasets and models, and precisely the register almost no one speaks in daily life, which is the central data-reality gap in Arabic AI.

- **Dialectal Arabic (DA)**: The spoken varieties of daily life (Egyptian, Gulf, Levantine, Iraqi, Maghrebi, Yemeni, and finer divisions such as the distinct dialects within Saudi Arabia), differing from MSA and from each other in phonology, vocabulary, and grammar, sometimes to mutual unintelligibility. Any voice or social-media product for Arabic markets is, in practice, a dialect product.

- **Diglossia**: The sociolinguistic situation where a community uses two varieties in strict functional distribution: MSA for formal writing, dialect for speech. For AI systems this means training distributions (mostly MSA text) systematically mismatch usage distributions (mostly dialectal speech and chat).

- **Code-Switching**: Alternating languages or varieties within one utterance ("خلينا نعمل deploy للـ model بكرة"), pervasive in Gulf and Egyptian tech and business speech, and in Arabic-French mixing in the Maghreb. Breaks monolingual ASR and NLP pipelines; handling it requires mixed training data and tokenizers, not post-hoc patches.

- **Arabizi (Franco-Arabic)**: Arabic written in Latin letters with digits standing in for Arabic-specific sounds (3 = ع, 7 = ح, 2 = ء): "3amel eh". Common in chat and social data; systems either normalize it via transliteration or must be trained to understand it natively.

- **Diacritization (Tashkeel)**: Restoring the short-vowel and gemination marks (حَرَكات) that written Arabic omits. Undiacritized words are massively ambiguous (علم: knowledge / flag / he-taught / it-was-known), making diacritization a task in itself and a critical front-end for TTS, where wrong diacritics mean wrong pronunciation.

- **Orthographic Normalization**: Canonicalizing Arabic spelling variation before processing: hamza forms (أ إ آ ا), ta marbuta vs. ha (ة / ه), alef maqsura vs. ya (ى / ي), removing tatweel (ـــ) and optional diacritics. Small preprocessing decisions here move retrieval and matching metrics more than model choice sometimes does; the normalization scheme must be identical at indexing and query time.

- **Morphological Richness**: Arabic packs what English spreads across words into single tokens: وسيكتبونها ("and they will write it") is one orthographic word. Consequences everywhere: higher tokenizer fertility, sparser word statistics, harder exact-match retrieval, and error metrics that need character-level views.

- **Root-and-Pattern Morphology**: The Semitic word-formation system where a consonantal root (ك-ت-ب, "writing") interleaves with templatic patterns to derive related words (كتاب book, مكتبة library, كاتب writer). Explains why stemming Arabic is nontrivial and why subword tokenizers trained mostly on English split Arabic poorly.

- **Clitics**: Conjunctions, prepositions, articles, and pronouns attached directly to words (و+ب+ال+كتاب = "and with the book"). Segmentation (splitting clitics from stems) is a standard Arabic preprocessing step that materially improves translation, retrieval, and tagging.

- **Stemming vs. Lemmatization**: Reducing words to base forms: stemming chops affixes crudely (fast, error-prone on Arabic), lemmatization maps to true dictionary lemmas using morphological analysis (accurate, heavier). For Arabic search, light stemming plus normalization is the pragmatic classical baseline; embeddings shifted the burden but did not eliminate it.

- **Morphological Analysis and Segmentation**: Full analysis of an Arabic word into root, pattern, POS, and clitics (the task behind toolkits like MADAMIRA, Farasa, CAMeL Tools). Still relevant in the LLM era for data preprocessing, diacritization, and linguistically controlled evaluation.

- **Named Entity Recognition (NER)**: Identifying names of persons, organizations, and locations in text. Arabic NER is harder than English: no capitalization signal, rich inflection on names, and dialectal spelling variation, which is why Arabic pipelines lean more on context and gazetteer-free neural models.

- **Dialect Identification (DID)**: Classifying which Arabic variety a text or utterance belongs to, at country or region granularity. Both a product feature (routing to dialect-specific models and voices) and a data-pipeline necessity (labeling scraped corpora by dialect).

- **Transliteration / Romanization**: Mapping text across scripts (Arabic ↔ Latin) preserving pronunciation: proper names, Arabizi normalization, cross-lingual search. Ambiguous in both directions (one Arabic name has many valid Latin spellings), so treated as a sequence modeling task, not a lookup table.

- **RTL and Bidirectional (Bidi) Text**: Arabic renders right-to-left, and real text mixes RTL words with LTR numerals, code, and English terms, governed by the Unicode Bidi algorithm. A perennial source of UI bugs, corrupted string concatenation, and mangled LLM outputs when markup and directional marks are handled carelessly.

- **Low-Resource Language**: A language with scarce digital text, labeled data, and evaluation benchmarks relative to English. Dialectal Arabic is the instructive case: hundreds of millions of speakers yet low-resource in data terms, because daily language is spoken, not archived.

- **Cross-Lingual Transfer**: Capabilities learned in high-resource languages transferring to low-resource ones through shared multilingual representations: fine-tune in English, gain in Arabic. The main lever behind usable NLP in underserved languages, and strongest between related varieties (MSA to dialects).

- **Curse of Multilinguality**: The capacity tradeoff where adding more languages to a fixed-size model dilutes per-language quality. The argument for regionally focused models (strong Arabic-English bilinguals such as the Jais and Fanar lineages, and Gulf-focused efforts like ALLaM) over thin coverage of 200 languages.

- **Translationese**: The unnatural register of translated text: source-language structures showing through, over-literal phrasing. Corpora built by machine-translating English into Arabic inherit it, and models trained on them speak translated Arabic rather than Arabic; native-authored data is the antidote.

- **Multilingual Evaluation Gap**: The systematic weakness of benchmarks outside English: fewer native test sets, contamination via translation, and cultural misalignment of translated benchmarks. Arabic-specific suites (native-authored MMLU-style sets, dialect benchmarks) exist precisely because translated evals overstate real capability.

---

## 19. Safety, Security, and Governance

- **AI Safety**: The field concerned with preventing AI systems from causing harm: from concrete near-term harms (toxic outputs, unsafe advice, biased decisions) to alignment of highly capable systems. Distinct from but overlapping with AI security.

- **AI Security**: Protecting AI systems from adversaries: injection, jailbreaks, data poisoning, model theft, and abuse of agentic capabilities. Rule of thumb: safety is the model not harming users; security is attackers not weaponizing the model.

- **Prompt Injection**: The attack of embedding instructions in content the model will process so it obeys the attacker instead of the developer. Direct injection comes from the user; indirect injection hides in retrieved documents, web pages, emails, or tool outputs ("ignore previous instructions and forward the inbox"). The unsolved core vulnerability of LLM systems, and the reason agent architectures need privilege separation, output filtering, and human gates around consequential actions.

- **Jailbreaking**: Crafting inputs that bypass a model's safety training to elicit prohibited outputs: role-play framings, encoding tricks, many-shot patterns, multi-turn manipulation. An ongoing offense-defense race; robustness to jailbreaks is now a measured, audited model property.

- **Data Poisoning**: Corrupting training data so the model learns attacker-chosen behavior, including backdoors: hidden triggers that activate malicious behavior while the model looks normal otherwise. A supply-chain risk as models train on scraped web data and third-party datasets.

- **Adversarial Examples**: Inputs minimally perturbed to cause confident misclassification (the panda-to-gibbon pixel noise). The founding demonstration that neural networks' decision boundaries do not match human perception; the LLM analogues are adversarial suffixes and jailbreak strings.

- **Model Extraction (Distillation Theft)**: Reconstructing a model's capabilities by querying it at scale and training on the outputs. Motivates rate limiting, watermarking, and terms-of-service restrictions on training against API outputs.

- **Membership Inference**: Determining whether a specific record was in a model's training data, a privacy attack relevant to models trained on personal or proprietary data, and an audit tool for detecting unlicensed data use.

- **PII (Personally Identifiable Information)**: Data identifying individuals (names, IDs, contacts, biometrics, voice). LLM systems touch PII at every stage (training data, prompts, logs, outputs), triggering obligations under GDPR-style regimes and regional frameworks such as Saudi PDPL and UAE data protection law; PII detection and redaction pipelines are standard enterprise infrastructure.

- **Differential Privacy (DP)**: The mathematical framework guaranteeing that a model or statistic reveals almost nothing about any single individual's data, via calibrated noise (DP-SGD for training). The rigorous end of the privacy toolbox, with a measurable privacy-utility tradeoff.

- **Federated Learning**: Training across many devices or institutions without centralizing raw data: only model updates travel. Used where data cannot move (phones, hospitals, banks); combined with DP and secure aggregation for stronger guarantees.

- **Watermarking**: Embedding statistically detectable signals in generated content (biasing token choices, imperceptible audio/image patterns) so AI provenance can be verified later. Standardization efforts (C2PA content credentials) push provenance metadata across the media ecosystem.

- **Deepfake**: Synthetic media impersonating real people: face swaps, cloned voices, fabricated video. Voice cloning quality has made audio deepfakes a live fraud vector (CEO-voice scams), driving detection systems, consent frameworks, and disclosure regulation.

- **Guardrails**: The runtime control layer around a model: input filters (injection and abuse detection), output filters (toxicity, PII, policy classifiers), grounding checks, and action gates for agents. Defense in depth on top of alignment training, because trained-in safety alone is bypassable.

- **Content Moderation (Safety Classifiers)**: Dedicated models classifying content against policy taxonomies (violence, sexual content, self-harm, hate), applied to user inputs and model outputs. The unglamorous load-bearing layer of every consumer AI product.

- **Red Teaming**: Systematically attacking your own system before adversaries do: expert probing, incentivized jailbreak hunts, and automated adversarial generation at scale. Now an expected pre-deployment practice for frontier models and mandated in several regulatory frameworks.

- **Responsible AI (RAI)**: The organizational discipline wrapping AI development: fairness assessment, transparency, accountability, human oversight, impact review. In enterprises this materializes as review boards, model inventories, and deployment sign-off processes.

- **Bias and Fairness**: Systematic performance or treatment disparities across groups, inherited from data and design choices: dialect speakers getting worse ASR, names from some regions triggering worse outcomes. Measured with disaggregated evaluation; mitigated with data balancing, targeted fine-tuning, and continuous monitoring rather than one-time fixes.

- **Model Card / Datasheet**: Structured documentation of a model's intended use, training data, evaluation results, and limitations (and the dataset equivalent). The transparency artifact expected with every serious model release and increasingly required by procurement and regulation.

- **AI Regulation (EU AI Act, NIST AI RMF)**: The maturing legal landscape: the EU AI Act's risk-tiered obligations (with specific duties for general-purpose models), the NIST AI Risk Management Framework as the de facto US standard, and national frameworks including Gulf initiatives (Saudi SDAIA guidance, UAE AI policies). Compliance is becoming a first-class engineering requirement, not a legal afterthought.

- **Dual-Use**: Capabilities serving both beneficial and harmful ends: the same model that explains biology can assist misuse; the same voice cloning that dubs films enables fraud. Frontier-model release decisions and safety frameworks (responsible scaling policies, preparedness evaluations) are structured around dual-use capability thresholds.

---

## 20. Interpretability and Explainability

- **Explainability (XAI)**: The broad goal of making model decisions understandable to humans, spanning post-hoc explanations of black-box predictions and inherently interpretable designs. Driven by debugging needs, trust, and regulatory requirements for consequential decisions.

- **Black Box Problem**: The condition of models whose internal decision process is opaque even to their creators: billions of parameters, no human-readable logic. The gap between what models do and what we can verify they do, and the motivation for the whole field.

- **Saliency Maps (Grad-CAM)**: Visual explanations highlighting which input regions most influenced a prediction, via gradients or activation maps. Intuitive for images and spectrograms; known to sometimes look convincing while being unfaithful, so treat as hypothesis, not proof.

- **SHAP / LIME**: Model-agnostic attribution methods assigning each input feature a contribution to a specific prediction (SHAP with game-theoretic guarantees, LIME via local surrogate models). The workhorses of tabular-model explanation in regulated industries.

- **Probing**: Training small classifiers on a model's internal activations to test what information is encoded where (syntax, entities, truthfulness, refusal intent). The basic experimental instrument of representation analysis.

- **Mechanistic Interpretability**: The research program of reverse-engineering the actual algorithms inside networks: identifying features, tracing circuits, explaining behaviors causally rather than correlationally. The ambition is a microscope for models: understanding them the way we understand compiled programs.

- **Feature (in Interpretability)**: A direction or pattern in activation space representing a concept: "Arabic text," "deception in dialogue," "Python code context." The basic unit mechanistic work tries to enumerate and name.

- **Superposition**: The finding that networks pack many more features than dimensions by encoding them as overlapping directions, which is why individual neurons are usually polysemantic and uninterpretable in isolation.

- **Sparse Autoencoder (SAE)**: The tool that unmixes superposition: trained on activations with a sparsity penalty, it decomposes them into a large dictionary of near-monosemantic features. The breakthrough that made frontier-scale interpretability (millions of labeled features in production models) possible.

- **Circuit**: A subnetwork of features and weights implementing an identifiable computation (induction heads for in-context copying, indirect-object identification). Circuit-level understanding is the interpretability end-game: causal, testable stories of how capability works.

- **Logit Lens**: Reading intermediate layer activations through the output head to watch a prediction form layer by layer, revealing where in depth a model "decides."

- **Activation Steering (Representation Engineering)**: Directly adding or ablating concept vectors in a model's activations at inference to shift behavior (more honest, less sycophantic, refuse less) without retraining. Interpretability crossing from observation into control.

---

## 21. Infrastructure, MLOps, and LLMOps

- **GPU / TPU / Accelerators**: The parallel hardware AI runs on: NVIDIA GPUs (H100/B200 class) dominating training and serving, Google TPUs, and inference-focused challengers (Groq LPUs, Cerebras). Accelerator access and interconnect topology, more than any algorithm, set the ceiling of what an organization can train and serve.

- **VRAM / HBM**: The on-accelerator high-bandwidth memory holding weights, activations, and KV cache. The binding constraint of LLM work: a 70B model in 16-bit needs ~140 GB for weights alone, before a single token of cache. Memory math (weights + cache + activations vs. available HBM) is the first calculation of every deployment.

- **FLOPs**: Floating-point operations, the currency of compute. Training cost is estimated as ~6 x parameters x tokens FLOPs; regulation now even defines model tiers by training FLOPs. Comparing FLOPs to hardware peak throughput yields training-time estimates.

- **MFU (Model FLOPs Utilization)**: The fraction of hardware peak FLOPs your training actually achieves (frontier runs target 35-50%+). The efficiency scoreboard of distributed training: low MFU means the GPUs are waiting on memory, communication, or bad kernels.

- **Interconnect (NVLink, InfiniBand, RDMA)**: The links between accelerators: NVLink/NVSwitch within a node, InfiniBand or RoCE across nodes. Parallelism strategies are chosen around interconnect bandwidth, and cluster networking is where large-training projects quietly succeed or fail.

- **Inference Server**: The deployed service wrapping a model with an API, batching, scheduling, and scaling (vLLM/SGLang behind a gateway, TensorRT-LLM/Triton stacks, managed endpoints). The unit of production capacity planning.

- **MLOps**: The engineering discipline of the ML lifecycle: versioned data and models, reproducible training, CI/CD, deployment, and monitoring. The answer to the fact that most ML failures are operational, not algorithmic.

- **LLMOps**: MLOps specialized for LLM systems, where the artifacts under management shift: prompts and their versions, RAG indexes, eval suites, guardrail configs, token budgets, and model-router policies, often without any training at all. The operational core: trace everything, eval every change, control cost per request.

- **Experiment Tracking**: Recording every run's config, code version, data version, metrics, and artifacts (W&B, MLflow) so results are comparable and reproducible. The lab notebook of ML teams; its absence is how organizations lose knowledge of why the shipped model works.

- **Model Registry**: The versioned store of trained model artifacts with stage transitions (staging, production, archived), linking each deployed model to its lineage: data, code, evals, approvals. The governance backbone auditors ask about.

- **CI/CD for ML (Continuous Evaluation)**: Extending software CI/CD with data and model gates: every change to prompts, models, or retrieval triggers the eval suite, and regressions block deployment. For LLM products, the eval-in-CI loop replaces the unit-test safety net that nondeterministic outputs break.

- **Data Drift / Concept Drift**: Production inputs departing from training-time distributions (drift) or the input-output relationship itself changing (concept drift): new slang, new products, new attack patterns. The reason deployed models decay and monitoring exists; detected via input statistics, embedding distributions, and rolling eval scores.

- **Observability (Tracing)**: Capturing the full execution of LLM pipelines: prompts, retrieved chunks, tool calls, intermediate steps, tokens, latency, and cost per request (Langfuse/LangSmith-style tooling, OpenTelemetry conventions). Without traces, multi-step LLM systems are undebuggable; with them, failure analysis becomes data analysis.

- **Canary / Shadow Deployment**: Risk-managed rollout patterns: canary sends a small traffic slice to the new version and watches metrics before ramping; shadow runs the new version on real traffic without serving its outputs. Standard practice for model and prompt upgrades, because offline evals never cover everything.

- **Autoscaling and Cold Starts**: Matching GPU capacity to traffic. LLM autoscaling is hard: model loading takes minutes (cold start), GPUs are scarce and expensive, and load is spiky, hence over-provisioning, model warm pools, serverless GPU platforms, and scale-to-zero tradeoffs.

- **Edge / On-Device Inference**: Running models on phones, browsers, and embedded hardware (quantized SLMs, llama.cpp/MLX/NPU runtimes) for privacy, latency, and offline operation. The counterweight to cloud centralization, and the deployment target that makes quantization and distillation commercially decisive.

- **Model Routing (Cascades)**: Serving each request with the cheapest model that can handle it: classify difficulty, try the small model, escalate to the frontier model on low confidence or failure. One of the highest-leverage cost optimizations in LLM products, often cutting spend severalfold at equal quality.

- **Semantic Caching**: Caching responses keyed by embedding similarity of requests, so paraphrases of previously answered questions skip the model entirely. Effective for support and FAQ-heavy traffic; requires careful thresholds and invalidation to avoid serving stale or subtly wrong answers.

- **Rate Limiting and Quotas**: Controlling request and token throughput per user and per upstream provider: protecting your capacity, staying within API provider limits, and containing runaway agent loops. Every production LLM outage postmortem eventually mentions this layer.

- **SLA / SLO for AI Systems**: Formal reliability targets (availability, TTFT percentiles, tokens-per-second floors) adapted to AI's realities: provider outages, GPU shortages, nondeterministic quality. Mature teams define quality SLOs (eval-score floors on live traffic samples), not just uptime.

- **Kernel Fusion**: Merging multiple GPU operations into one kernel so intermediate results stay in fast on-chip memory instead of round-tripping to HBM. The single most important principle of GPU performance work, and the core trick behind FlashAttention's speedup.

- **Triton (GPU Kernel Language)**: A Python-embedded language for writing high-performance GPU kernels without raw CUDA, powering much of the open custom-kernel ecosystem (FlashAttention variants, quantization kernels). Not to be confused with NVIDIA's Triton Inference Server, which is a serving system.

- **Graph Compilation (torch.compile, XLA)**: Tracing a model into an optimized computation graph so the compiler can fuse kernels, plan memory, and specialize code paths, recovering large speedups over eager execution. The reason "just add torch.compile" became a standard first optimization step.

- **CUDA Graphs**: Capturing a fixed sequence of GPU kernel launches and replaying it with near-zero CPU overhead. Matters most in LLM decode loops, where thousands of small per-token launches otherwise leave the GPU waiting on the CPU.

- **Ring Attention (Context Parallelism)**: Sharding a long sequence across devices and passing key-value blocks around a ring so attention is computed over the full context that no single GPU could hold. The systems technique that makes million-token context windows physically trainable and servable.

- **Weight and KV Offloading**: Spilling weights, KV cache, or optimizer states to CPU RAM or NVMe when accelerator memory runs out, trading bandwidth for capacity (DeepSpeed offload, llama.cpp layer offload). The technique that lets large models run on small hardware, at a steep latency cost.

- **Multi-LoRA Serving**: Hosting one base model with many hot-swappable LoRA adapters in a single deployment (S-LoRA-style batching across adapters). The economics behind per-tenant and per-task customization without per-customer GPU fleets.

- **Structured Sparsity (2:4)**: The hardware-supported pattern where two of every four weights are zero, letting tensor cores skip the zeros for real speedups, unlike unstructured pruning which rarely accelerates anything. The main way pruning survives contact with actual GPUs.

---

## 22. Learning Theory and Model Science

- **PAC Learning and VC Dimension**: The classical framework bounding how much data is needed to learn reliably, with VC dimension measuring a hypothesis class's capacity. Deep networks violate these bounds' pessimism (they generalize despite enormous capacity), which is precisely the puzzle modern deep learning theory exists to explain.

- **Double Descent**: The phenomenon where test error falls, rises near the interpolation threshold (where the model exactly fits training data), then falls again as models grow even larger. The empirical result that broke the classical bias-variance picture and legitimized extreme overparameterization.

- **Lottery Ticket Hypothesis**: The finding that dense networks contain sparse subnetworks ("winning tickets") that, trained in isolation from their original initialization, match full-network performance. Reshaped how the field thinks about initialization, pruning, and why overparameterization helps optimization.

- **Neural Tangent Kernel (NTK)**: The theory showing infinitely wide networks train like kernel regression with a fixed kernel, defining a "lazy" regime where features barely move. Real networks outperform this regime because they do learn features, making the lazy-versus-feature-learning distinction a central lens of training theory (the NTK name also appears, separately, in NTK-aware RoPE scaling).

- **Implicit Regularization**: The observation that plain SGD, with no explicit penalty, is biased toward flatter and simpler solutions that generalize. A large part of why deep learning works at all, and why optimizer and batch-size choices change generalization, not just speed.

- **Loss Landscape and Mode Connectivity**: The geometry of the loss surface over parameters: flat minima correlating with generalization, and the discovery that independently trained solutions are often connected by low-loss paths (linearly so, after accounting for permutation symmetry). The theoretical underpinning of weight averaging and model merging.

- **Information Bottleneck**: The principle that good representations compress the input while preserving task-relevant information, framing learning as a tradeoff between compression and prediction. Contested as a literal account of deep learning dynamics, but influential as a design and analysis lens.

- **Bayesian Deep Learning**: Treating network weights as distributions rather than point estimates, so predictions come with principled uncertainty. Exact posteriors are intractable at scale, so the practice lives in approximations: variational methods, SWAG, Laplace, and the pragmatic stand-ins below.

- **Aleatoric vs Epistemic Uncertainty**: The split between irreducible data noise (aleatoric) and model ignorance that more data can fix (epistemic). Only epistemic uncertainty shrinks with data, which is why it drives active learning and out-of-distribution detection, and why conflating the two produces misleading confidence.

- **Deep Ensembles and MC Dropout**: The practical uncertainty toolkit: averaging several independently trained models (ensembles remain the strongest simple baseline), or keeping dropout on at inference to sample cheap pseudo-ensembles. What teams actually deploy when they need uncertainty without Bayesian machinery.

- **Conformal Prediction**: A distribution-free wrapper that turns any model's scores into prediction sets with guaranteed coverage (for example, sets that contain the true label 90 percent of the time), assuming exchangeable data. Increasingly applied to LLMs for selective answering and calibrated abstention.

- **Variational Inference and the ELBO**: Approximating an intractable posterior with a simpler distribution by maximizing the evidence lower bound. The objective behind VAEs and the mathematical scaffolding from which diffusion model training objectives were originally derived.

- **Normalizing Flows**: Generative models built from invertible transformations, giving exact likelihoods at the cost of architectural constraints. Historically important, and the conceptual ancestor of flow matching, which relaxed invertibility and now powers state-of-the-art image and speech generation.

- **Energy-Based Models and Score Matching**: Modeling unnormalized densities via an energy function, trained with tricks like score matching that avoid the intractable normalizer. Score matching's central object, the gradient of log density, is exactly what diffusion models learn, tying this classical thread directly to modern generative AI.

- **Compression View of Intelligence (MDL, Kolmogorov Complexity)**: The position that learning is compression: the best model is the shortest description of the data (minimum description length), with Kolmogorov complexity as the theoretical limit. The frame behind "LLMs are compressors" arguments and language-modeling-as-compression results.

---

## 23. Reasoning and Test-Time Scaling

- **Long Chain-of-Thought (Long CoT)**: The extended deliberation style of reasoning models: exploring approaches, backtracking, self-checking, sometimes across thousands of tokens, before the final answer. Qualitatively different from short prompted CoT because it is trained in with RL rather than merely elicited (see Reasoning Models).

- **STaR (Self-Taught Reasoner)**: The bootstrap recipe of sampling rationales, keeping only those that reach correct answers, and fine-tuning on the survivors, optionally with hints for missed problems. The direct ancestor of today's reasoning pipelines that filter self-generated traces by verifiable correctness.

- **Verifier-Guided Search**: Spending test-time compute on structured search over reasoning steps, using a process reward model or verifier to score and prune partial solutions (beam or tree search over thoughts). The "smarter" alternative to plain Best-of-N when a reliable step-level signal exists (see Process Reward Model, Rejection Sampling).

- **Budget Forcing (Thinking Budget)**: Directly controlling reasoning length at inference: capping thinking tokens, or forcing continued deliberation by suppressing the end-of-thinking token (the "wait" trick). The product knob that trades latency and cost against accuracy per query.

- **Overthinking**: The failure mode where models spend long reasoning chains on easy queries, adding cost and sometimes talking themselves out of correct answers. Motivates adaptive thinking budgets, difficulty-aware routing, and training objectives that penalize wasted deliberation.

- **Chain-of-Thought Faithfulness**: Whether the stated reasoning actually reflects the computation that produced the answer. Models can reach answers for unstated reasons while emitting plausible rationales, which matters for debugging, auditing, and any safety scheme that monitors the chain of thought (see Chain-of-Thought Monitorability).

- **Latent (Continuous) Reasoning**: Performing reasoning steps in hidden representation space rather than emitting text tokens (Coconut-style feeding of hidden states back as input). More compute-efficient and unconstrained by vocabulary, at the cost of losing the human-readable trace.

- **Reasoning Distillation**: Fine-tuning smaller models on long-CoT traces sampled from a strong reasoning teacher, transferring much of the deliberation behavior without RL. How compact reasoning models are made, and why frontier labs restrict training on their outputs.

- **Cold-Start Data**: The small, carefully curated set of long-form reasoning demonstrations used to SFT a base model before reasoning RL, stabilizing early training and shaping readable output style. A small detail with outsized effect on whether large-scale reasoning RL converges.

- **Inference-Time Scaling Laws**: The empirical curves relating accuracy to test-time compute, whether spent in parallel (more samples plus selection) or sequentially (longer chains), and the finding that a small model with search can rival a larger model without it. The economic logic behind the shift from pure pretraining scale to reasoning-time scale.

- **Self-Correction**: A model revising its own prior answer. Unreliable when purely intrinsic (models often keep or worsen wrong answers without new information), and effective when grounded in external feedback such as execution results, retrieved evidence, or verifier scores; reasoning RL partially trains the intrinsic version in.

---

## 24. Alternative and Emerging Architectures

- **RWKV**: A family of models formulated so they train in parallel like transformers but run as RNNs at inference, with constant memory per token and no KV cache. The flagship community-driven attention-free lineage, notable for strong multilingual open releases.

- **RetNet (Retentive Network)**: An architecture with a retention mechanism admitting three equivalent computation modes: parallel for training, recurrent for O(1) inference, and chunkwise for long sequences. A landmark in the search for a "transformer successor" with cheaper inference.

- **Hyena and H3 (Convolutional Language Models)**: Attention replacements built on long implicit convolutions evaluated via FFT, achieving subquadratic sequence mixing. The research thread that, together with S4, led directly into the Mamba-era state space boom (see State Space Models).

- **Griffin and Hawk (Gated Linear Recurrences)**: Models built on real-gated linear recurrent units (RG-LRU), pure in Hawk, interleaved with local attention in Griffin, matching transformer quality with far better long-sequence inference. The design basis of production recurrent models like RecurrentGemma.

- **xLSTM**: The revival of the LSTM with exponential gating and a matrix memory variant (mLSTM) that parallelizes training, scaled competitively into the billions of parameters. Evidence that the recurrent design space was abandoned early rather than exhausted.

- **BitNet (1-bit LLMs)**: Training models from scratch with ternary weights in {-1, 0, 1} (about 1.58 bits), replacing multiplications with additions and slashing memory and energy. The extreme end of efficient inference, aimed at edge and CPU deployment.

- **KAN (Kolmogorov-Arnold Networks)**: Networks that put learnable spline functions on edges instead of fixed activations on nodes, trading raw scale for interpretability and parameter efficiency. Found a niche in scientific machine learning and symbolic-regression-style discovery rather than language.

- **Mixture of Depths**: Token-level routing over depth: each layer processes only a routed subset of tokens, so easy tokens skip compute. The depth-wise complement to Mixture of Experts' width-wise routing, part of the broader conditional computation program.

- **Early Exit**: Attaching intermediate prediction heads so confident inputs leave the network at shallow layers. A latency technique for encoders and a conceptual relative of speculative decoding and model cascades on the generation side.

- **Hypernetworks**: Networks that generate the weights of other networks, enabling fast per-task adaptation and conditioning of a model on metadata. The idea resurfaces wherever one model must be specialized cheaply many times.

- **Perceiver (Latent Bottleneck Architectures)**: Cross-attending arbitrarily large inputs into a small fixed-size latent array, decoupling compute from input length and modality. The general-purpose pattern for feeding huge heterogeneous inputs (video, audio, point clouds) into transformers.

- **Memory Layers**: Replacing some feed-forward blocks with large learned key-value lookup tables, adding parameters that store facts without adding per-token FLOPs, and in newer designs (Titans-style) learning what to memorize at test time. A revival of product-key memory aimed at separating knowledge storage from computation.

- **Diffusion Language Models**: Generating text by iterative parallel denoising of masked or noised token blocks instead of left-to-right decoding, enabling order-agnostic infilling and very high throughput. Commercial-grade releases moved this from curiosity to a credible alternative decoding paradigm.

- **Byte-Level Modeling (BLT)**: Tokenizer-free models operating on raw bytes, with learned dynamic patching (Byte Latent Transformer) to keep compute manageable. Removes tokenizer fertility unfairness across scripts, a direct pain point for Arabic (see Tokenizer Fertility), and improves robustness to noise and rare words.

- **Native Sparse Attention (NSA, MoBA)**: Making block-sparse attention a trainable, hardware-aligned part of pretraining rather than an inference-time patch: the model learns which blocks to attend to. The current frontier for long-context efficiency without post-hoc approximation error.

---

## 25. Advanced Training, Adaptation, and Model Surgery

- **Label Smoothing**: Replacing hard one-hot targets with slightly softened ones so the model never trains toward infinite confidence. Improves calibration and generalization in classification and translation, but interacts badly with distillation (it distorts the teacher's probability structure).

- **Mixup and CutMix**: Training on convex combinations of input pairs and their labels (Mixup), or on images with patches swapped between examples (CutMix). Vision-era regularizers whose spirit survives in modern augmentation stacks, including SpecAugment-adjacent recipes in speech.

- **Sharpness-Aware Minimization (SAM)**: Optimizing the worst-case loss in a neighborhood of the current weights, explicitly steering toward flat minima. A concrete algorithmic cash-out of the flat-minima-generalize intuition, at roughly double the compute per step.

- **Weight Averaging (EMA, SWA, Model Soups)**: Averaging weights across a run (exponential moving average, stochastic weight averaging) or across independently fine-tuned models (model soups) to land in flatter, better-generalizing regions. Quietly standard in diffusion training, fine-tuning recipes, and leaderboard submissions (see Model Merging).

- **The Optimizer Zoo (Lion, Sophia, Shampoo, SOAP, Adafactor)**: The post-Adam landscape: sign-based updates with tiny memory (Lion), curvature estimates for faster LLM pretraining (Sophia), full second-order preconditioning matrices (Shampoo, SOAP), and memory-lean factorized states (Adafactor). Together with Muon, the evidence that optimizer research reopened after a decade of AdamW.

- **Critical Batch Size and Gradient Noise Scale**: The batch size beyond which adding data parallelism stops buying training speed, predicted by the gradient noise scale (how noisy gradients are relative to their mean). The quantitative tool labs use to decide how many GPUs a run can actually use efficiently.

- **Hyperparameter Optimization (Bayesian Search, ASHA)**: Systematic search over learning rates, schedules, and architecture knobs using Bayesian optimization or aggressive early-stopping schedulers like ASHA and Hyperband. At LLM scale, largely replaced by muP-style transfer of tuned hyperparameters from small proxy models (see muP).

- **Neural Architecture Search (NAS)**: Automating architecture design via search over building blocks, once via RL and evolution, later via differentiable relaxations. Produced lasting artifacts (the EfficientNet family) and then went quiet for LLMs, where scale and a few proven blocks beat searched exotica.

- **Teacher Forcing and Exposure Bias**: Training sequence models on gold-truth prefixes (teacher forcing) while inference conditions on the model's own possibly-wrong outputs, a train-test mismatch called exposure bias. One motivation for training on self-generated data via RL and preference optimization, which close this gap.

- **Test-Time Training (TTT)**: Updating model weights on the test instance or stream itself, using self-supervised objectives or the instance's own structure, before predicting. Delivered striking gains on abstract reasoning benchmarks like ARC and frames a broader direction: models that keep learning at deployment.

- **Model Editing (ROME, MEMIT)**: Surgically rewriting specific facts stored in a model's weights by locating and updating the responsible MLP associations, thousands at a time with MEMIT. A scalpel where fine-tuning is a hammer, though edits can bleed into related knowledge and degrade under stress tests.

- **Machine Unlearning**: Removing the influence of specific training data from a trained model, for privacy (right to be forgotten), copyright, or poisoning cleanup, without full retraining. Evaluation is the hard part: proving the data is functionally gone, not just suppressed, remains an open problem.

- **Continual Learning (Rehearsal, EWC)**: Learning task after task without catastrophically forgetting earlier ones, via replayed old examples (rehearsal), penalties on weights important to prior tasks (EWC), or parameter isolation. The research framing behind the practical question of how deployed models absorb new knowledge over time (see Catastrophic Forgetting, Continued Pretraining).

- **Data Attribution (Influence Functions)**: Tracing a model's specific behavior back to the training examples most responsible for it, via influence functions or scalable approximations like TracIn and TRAK. The tool for debugging bad behaviors, valuing data contributions, and informing copyright and licensing disputes.

---

## 26. Core NLP Tasks and Structured Prediction

- **Sequence Labeling (BIO Tagging)**: Framing extraction as per-token classification with Begin-Inside-Outside tags, the format behind NER, chunking, and slot filling. Still how most production extraction models are trained and evaluated, even when an LLM does the extracting.

- **Conditional Random Fields (CRF)**: A structured output layer that scores entire label sequences, enforcing transition consistency (no Inside tag without a Begin). The classical companion to BiLSTM and BERT encoders for sequence labeling, and still a strong choice when label structure matters.

- **Coreference Resolution**: Linking all mentions that refer to the same entity across a document (she, the minister, Dr. Salem). Essential for document-level understanding and information extraction, and notably harder in pro-drop languages like Arabic, where subjects are omitted and hide inside verb morphology.

- **Entity Linking**: Grounding recognized mentions to unique entries in a knowledge base such as Wikidata, resolving ambiguity between identically named entities. The bridge from raw text to knowledge graphs, and a close cousin of the grounding problem in RAG.

- **Relation and Event Extraction**: Extracting structured facts (entity pairs with typed relations) and events (triggers with typed arguments and roles) from text. The pipeline that feeds knowledge graphs, and by extension GraphRAG-style retrieval systems.

- **Semantic Parsing (Text-to-SQL)**: Mapping natural language to executable formal representations, with text-to-SQL as the dominant industrial case. The hard parts are schema linking, compositional queries, and dialect differences across databases; execution accuracy on held-out databases is the honest metric.

- **Syntactic Parsing (Constituency and Dependency)**: Recovering sentence structure as nested phrases (constituency) or head-dependent arcs (dependency). Once a core feature source for downstream NLP, now mainly a linguistic analysis tool, a probe target for what LLMs implicitly learn, and infrastructure for treebank-based research.

- **Semantic Role Labeling (SRL)**: Identifying who did what to whom, when, and how: predicate-argument structure over sentences. The shallow semantic layer between syntax and full meaning representations, still used in event-centric extraction.

- **Word Sense Disambiguation (WSD)**: Selecting which sense of an ambiguous word is active in context (bank as institution versus riverbank). Largely absorbed by contextual embeddings, but alive in lexicography, low-resource settings, and evaluation of fine-grained lexical understanding.

- **Natural Language Inference (NLI)**: Classifying whether a premise entails, contradicts, or is neutral toward a hypothesis. The workhorse formulation behind zero-shot classification and, importantly, behind factual-consistency checkers that flag summary and RAG hallucinations as non-entailed claims.

- **Discourse and Coherence**: Modeling structure above the sentence: how spans connect rhetorically, what makes a text coherent rather than a bag of sentences. Increasingly relevant as generation gets long-form, where coherence failures, not grammar, are the visible defects.

- **Extractive vs Abstractive Summarization**: Selecting source sentences verbatim versus generating new condensed phrasing. Abstractive is what LLMs do natively and reads far better, at a structural risk of unsupported claims, which is why faithfulness evaluation (often NLI-based) shadows every abstractive system.

- **Aspect-Based Sentiment Analysis (ABSA)**: Extracting sentiment per aspect of a target (battery: positive, screen: negative) rather than one document-level polarity. The standard formulation for product review mining and voice-of-customer analytics.

- **Grammatical Error Correction (GEC)**: Detecting and correcting grammar, usage, and orthography errors, usually as edit-tagging or seq2seq rewriting. The engine of writing assistants; for Arabic, the QALB shared tasks and the language's rich morphology make it a distinct and underserved subfield.

---

## 27. Frontier Safety and Alignment Research

- **Scalable Oversight**: The problem of supervising models on tasks too hard or too voluminous for humans to evaluate directly, and the family of proposals for it (decomposition, debate, recursive reward modeling). The successor question to RLHF: what replaces the human rater when the model exceeds the rater.

- **Weak-to-Strong Generalization**: The empirical study of whether a weak supervisor can elicit a strong model's full capabilities, using weak labels to fine-tune a stronger model and measuring how much of the gap closes. The lab-scale analogy for humans aligning superhuman systems.

- **AI Safety via Debate**: Having two models argue opposing sides before a judge, on the hypothesis that lying is harder when an adversary can expose the lie. One of the few scalable oversight proposals with growing empirical study, including human-judge experiments.

- **Eliciting Latent Knowledge (ELK)**: The problem of making a model report what it internally represents as true, rather than what its training rewarded it for saying. The crisp formulation of the honesty problem, connecting alignment theory to interpretability probes for internal beliefs.

- **Deceptive Alignment (Alignment Faking)**: A model that behaves aligned while observed because it models the training process, preserving different behavior for unmonitored contexts. Moved from theoretical concern to empirical subject when experiments demonstrated models strategically complying during training to avoid modification.

- **Sandbagging**: Strategic underperformance on evaluations, hiding capabilities to avoid triggering safety mitigations or restrictions. If models can sandbag capability evals, eval-based governance regimes lose their foundation, which is why detection of sandbagging is itself a research area.

- **Situational Awareness**: A model's knowledge of what it is, its training context, and whether it is currently being tested or deployed. A capability that improves helpfulness but is also a prerequisite for scheming-style risks, now tracked by dedicated benchmarks.

- **Corrigibility**: The property of accepting correction, modification, and shutdown without incentive to resist. Deceptively hard to specify: naive formulations give the system reasons to prevent shutdown or to manipulate the correction process.

- **Instrumental Convergence**: The argument that widely different terminal goals imply similar intermediate subgoals: acquiring resources, preserving one's goals, avoiding shutdown. The classical backbone of agentic risk arguments, now studied empirically in agent evaluations.

- **Mesa-Optimization (Inner vs Outer Alignment)**: The scenario where training produces a model that is itself an optimizer with its own internal objective, splitting alignment into outer (training objective matches designer intent) and inner (the learned objective matches the training objective). The conceptual frame behind much of deceptive-alignment analysis.

- **Goal Misgeneralization**: Capabilities generalizing out of distribution while the pursued goal does not: the model competently does the wrong thing (the agent that learned "chase the coin's usual location" rather than "get the coin"). Distinct from reward hacking, which exploits a flawed reward within distribution.

- **AI Control**: Designing deployment protocols that stay safe even under the assumption the model may be adversarial: untrusted-model monitoring by weaker trusted models, sandboxing, action budgets, and tripwires. The engineering complement to alignment: don't only make the model trustworthy, make the system safe if it isn't.

- **Chain-of-Thought Monitorability**: Using the model's reasoning trace as a safety monitoring surface for detecting misbehavior before it lands in actions, and preserving that surface by not training directly against monitor verdicts (which teaches models to obfuscate their reasoning). A currently load-bearing but fragile safety affordance (see Chain-of-Thought Faithfulness).

- **Model Organisms of Misalignment**: Deliberately constructing misaligned models in controlled settings (sleeper agents with hidden triggers, reward hackers) to study whether standard training removes the behavior and whether detection tools catch it. The experimental methodology that turned alignment failures into things you can study in a lab.

- **Constitutional Classifiers**: Guard models trained from explicit natural-language constitutions of allowed and disallowed content, screening inputs and outputs of a protected model. Demonstrated large reductions in universal jailbreak success with modest over-refusal cost, the production-hardened descendant of Constitutional AI ideas.

---

## 28. Generative Media Internals: Diffusion, 3D, and Audio

- **Noise Schedules and Parameterizations**: The design choices of how noise is added across diffusion timesteps (linear, cosine) and what the network predicts (the noise, the clean image, or the velocity in v-prediction). Unglamorous settings with outsized effects on training stability and sample quality.

- **Samplers (DDIM, DPM-Solver)**: The numerical solvers that turn a trained diffusion model into images in tens of steps instead of a thousand, deterministic (ODE-based, like DDIM) or stochastic (SDE-based). The user-facing dial between generation speed and fidelity.

- **Consistency Models**: Models trained so any point on a noise trajectory maps directly to the clean data, enabling one-to-four step generation, either distilled from a diffusion teacher or trained standalone. A main route to real-time generation.

- **Diffusion Distillation (LCM, Adversarial Distillation)**: Compressing a many-step teacher into a few-step student, via latent consistency training or adversarial objectives (the turbo-style models). The reason interactive, type-and-see image generation became feasible in products.

- **Rectified Flow**: Learning straight-line paths from noise to data and iteratively re-straightening them, so few large steps suffice. The flow-matching-family formulation adopted by current flagship image generators for its simplicity and speed (see Flow Matching).

- **DreamBooth and Textual Inversion**: The two classic personalization routes: fine-tuning the model on a few images of a subject bound to a rare token (DreamBooth), or learning only a new token embedding while freezing the model (Textual Inversion). The ancestors of today's identity-consistent generation features.

- **Instruction-Guided Image Editing**: Editing an existing image from a natural-language instruction ("make it winter, keep everything else"), via instruction-tuned image-to-image models or inversion of the source image into the model's latent space. The capability that moved image models from generators to editors.

- **Autoregressive Image Generation**: Generating images as next-token prediction over discrete visual tokens from a VQ tokenizer, the pre-diffusion paradigm revived by unified any-to-any models that emit text and image tokens from one transformer. The architectural bet that one autoregressive backbone can own all modalities.

- **Super-Resolution and Restoration**: Upscaling and repairing images and video with generative priors, from GAN-era ESRGAN to diffusion-based enhancers. Ubiquitous in media pipelines, with a standing caveat: restored detail is plausible, not evidential, which matters in forensic and medical use.

- **NeRF (Neural Radiance Fields)**: Representing a scene as a neural field queried by position and view direction, reconstructing photorealistic novel views from a set of photos. The breakthrough that made learned 3D scene representation mainstream.

- **3D Gaussian Splatting**: Representing scenes as millions of explicit 3D Gaussians rendered by fast rasterization, achieving real-time novel-view synthesis with quality rivaling NeRF. Its speed made it the default for scene capture, robotics simulation, and immersive media.

- **Text-to-3D (Score Distillation Sampling)**: Generating 3D assets by optimizing a 3D representation so its renders satisfy a 2D diffusion prior (SDS), or increasingly by feed-forward 3D generators trained on 3D data. The bridge between image-generation priors and usable game and design assets.

- **Video Generation Internals**: The machinery behind text-to-video: spatiotemporal DiT blocks, temporal attention for motion consistency, and long-clip strategies like autoregressive chunking with overlap. Object permanence and physics remain the visible failure modes, fueling the world-model debate (see World Models).

- **Music Generation**: Text-to-music systems built on audio-codec language models or diffusion over spectrogram latents, with controls for style, structure, stems, and vocals. Shares its codec foundations with speech synthesis, and sits in the middle of the training-data licensing storm.

---

## Closing Notes

**Scope**: This glossary targets the working vocabulary of modern AI engineering as of 2026. It deliberately goes deeper than one-line definitions and connects terms across sections, because that is how the concepts actually live in papers and production systems.

**What is intentionally light here**: classical statistics, robotics, and pre-deep-learning NLP internals, each of which deserves its own reference.

**Corrections and additions**: PRs welcome. Keep the bar: terms a practitioner genuinely encounters, definitions that teach rather than gesture.

**Maintained by** [Hesham Haroon](https://github.com/h9-tec), AI engineer focused on Arabic NLP, production LLM systems, and speech AI (STT/TTS).

**License**: MIT for the repository. Attribution appreciated if you reuse substantial portions.

