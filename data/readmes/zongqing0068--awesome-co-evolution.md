# Awesome Co-Evolution in Agentic Systems

![Papers](https://img.shields.io/badge/papers-142-blue)
![Last updated](https://img.shields.io/badge/updated-August%202026-green)
[![arXiv](https://img.shields.io/badge/arXiv-2608.10299-b31b1b.svg)](https://arxiv.org/abs/2608.10299)
[![Hugging Face](https://img.shields.io/badge/🤗%20Hugging%20Face-Paper-yellow)](https://huggingface.co/papers/2608.10299)

A curated paper list for **Co-Evolution in Agentic Systems: Toward Self-Directed Evolution Beyond Human Design**.

Co-evolution is a coupled form of self-evolution in which at least two evolving units evolve together and continually reshape each other's further evolution. The list follows a progressive taxonomy based on the expanding boundary of what a system is allowed to evolve.

> **Scope.** We include persistent co-evolution, not systems that only exchange information, interact once, or refine a transient output. An agent is treated as one evolving unit that may evolve its model backbone, harness, or both.

## Contents

- [Taxonomy](#taxonomy)
- [Paper Landscape](#paper-landscape)
- [Stage 1: Agent–Agent Co-Evolution](#stage-1-agentagent-co-evolution)
- [Stage 2: Agent–Environment Co-Evolution](#stage-2-agentenvironment-co-evolution)
- [Stage 3: Meta Co-Evolution](#stage-3-meta-co-evolution)
- [Contributing](#contributing)
- [Citation](#citation)

## Taxonomy

1. **Agent–Agent Co-Evolution** studies joint evolution among agents in an otherwise fixed environment.
2. **Agent–Environment Co-Evolution** extends the evolutionary process to environments containing task, feedback, and interaction spaces.
3. **Meta Co-Evolution** makes the evolution mechanism itself evolvable, including what, when, how, and where to evolve and how evolution is evaluated.

![Progressive taxonomy of co-evolution](assets/progressive_taxonomy.png)

## Paper Landscape

![Paper landscape of co-evolution in agentic systems](assets/paper_landscape.png)

The dates below follow each paper's year of first public release where available. The curated list currently contains **44 Stage-1 papers**, **92 Stage-2 papers**, and **6 Stage-3 papers or precursors**.

## Stage 1: Agent–Agent Co-Evolution

Agents evolve through evolutionary pressure from other evolving agents. Adversarial and collaborative methods are distinguished by goal relations, while evolving organizations additionally change agents' roles or interaction structures.

### 1.1 Adversarial Agents

#### Pairwise Adversarial Pressure

- **2026 · AdvGRPO** — [Learning to Attack and Defend: Adaptive Red Teaming of Language Models via GRPO](https://doi.org/10.48550/arXiv.2606.09701)
- **2026 · CHASE** — [CHASE: Adversarial Red-Blue Teaming for Improving LLM Safety using Reinforcement Learning](https://doi.org/10.48550/arXiv.2606.05523)
- **2026 · MAGIC** — [MAGIC: A Co-Evolving Attacker-Defender Adversarial Game for Robust LLM Safety](https://doi.org/10.48550/arXiv.2602.01539)
- **2026 · Safety Self-Play** — [Be Your Own Red Teamer: Safety Alignment via Self-Play and Reflective Experience Replay](https://doi.org/10.18653/v1/2026.findings-acl.933)
- **2025 · ACE-Safety** — [Adversarial Attack-Defense Co-Evolution for LLM Safety Alignment via Tree-Group Dual-Aware Search and Optimization](https://doi.org/10.48550/arXiv.2511.19218)
- **2025 · ARLAS** — [Adversarial Reinforcement Learning for Large Language Model Agent Safety](https://doi.org/10.48550/arXiv.2510.05442)
- **2025 · Active Attacks** — [Active Attacks: Red-teaming LLMs via Adaptive Environments](https://doi.org/10.48550/arXiv.2509.21947)
- **2025 · Self-RedTeam** — [Chasing Moving Targets with Online Self-Play Reinforcement Learning for Safer Language Models](https://doi.org/10.48550/arXiv.2506.07468)
- **2024 · SPAG** — [Self-playing Adversarial Language Game Enhances LLM Reasoning](http://papers.nips.cc/paper_files/paper/2024/hash/e4be7e9867ef163563f4a5e90cec478f-Abstract-Conference.html)
- **2019 · Emergent Tool Use** — [Emergent Tool Use From Multi-Agent Autocurricula](https://openreview.net/forum?id=SkxpxJBKwS)
- **2017 · Emergent Complexity** — [Emergent Complexity via Multi-Agent Competition](https://openreview.net/forum?id=Sy0GnUxCb)
- **2017 · RARL** — [Robust Adversarial Reinforcement Learning](http://proceedings.mlr.press/v70/pinto17a.html)

#### Multi-Source Adversarial Pressure

- **2026 · TriPlay-RL** — [TriPlay-RL: Tri-Role Self-Play Reinforcement Learning for LLM Safety Alignment](https://doi.org/10.18653/v1/2026.acl-long.1216)
- **2025 · AdvEvo-MARL** — [AdvEvo-MARL: Shaping Internalized Safety through Adversarial Co-Evolution in Multi-Agent Reinforcement Learning](https://doi.org/10.48550/arXiv.2510.01586)
- **2023 · GRTS** — [Evolving Diverse Red-team Language Models in Multi-round Multi-agent Games](https://arxiv.org/abs/2310.00322)
- **2019 · AlphaStar** — [Grandmaster level in StarCraft II using multi-agent reinforcement learning](https://doi.org/10.1038/s41586-019-1724-z)

### 1.2 Collaborative Agents

#### Parallel Collaboration

- **2026 · CORAL** — [CORAL: Towards Autonomous Multi-Agent Evolution for Open-Ended Discovery](https://doi.org/10.48550/arXiv.2604.01658)
- **2026 · MARS²** — [MARS²: Scaling Multi-Agent Tree Search via Reinforcement Learning for Code Generation](https://doi.org/10.18653/v1/2026.acl-long.1538)
- **2026 · GEA** — [Group-Evolving Agents: Open-Ended Self-Improvement via Experience Sharing](https://doi.org/10.48550/arXiv.2602.04837)
- **2026 · MARTI-MARS²** — [MARTI-MARS²: Scaling Multi-Agent Self-Search via Reinforcement Learning for Code Generation](https://doi.org/10.48550/arXiv.2602.07848)
- **2026 · MAAC** — [Learning Decentralized LLM Collaboration with Multi-Agent Actor Critic](https://doi.org/10.48550/arXiv.2601.21972)
- **2025 · CoMAS** — [CoMAS: Co-Evolving Multi-Agent Systems via Interaction Rewards](https://doi.org/10.48550/arXiv.2510.08529)
- **2025 · MAC-SPGG** — [Everyone Contributes! Incentivizing Strategic Cooperation in Multi-LLM Systems via Sequential Public Goods Games](https://doi.org/10.48550/arXiv.2508.02076)
- **2025 · MAGRPO** — [LLM Collaboration with Multi-Agent Reinforcement Learning](https://doi.org/10.1609/aaai.v40i38.40487)
- **2025 · LIET** — [Learn as Individuals, Evolve as a Team: Multi-agent LLMs Adaptation in Embodied Environments](https://doi.org/10.48550/arXiv.2506.07232)
- **2025 · M3HF** — [M3HF: Multi-agent Reinforcement Learning from Multi-phase Human Feedback of Mixed Quality](https://doi.org/10.48550/arXiv.2503.02077)
- **2025 · MAPoRL** — [MAPoRL: Multi-Agent Post-Co-Training for Collaborative Large Language Models with Reinforcement Learning](https://doi.org/10.18653/v1/2025.acl-long.1459)
- **2020 · LIO** — [Learning to Incentivize Other Learning Agents](https://proceedings.neurips.cc/paper/2020/hash/ad7ed5d47b9baceb12045a929e7e2f66-Abstract.html)
- **2018 · LeCTR** — [Learning to Teach in Cooperative Multiagent Reinforcement Learning](https://doi.org/10.1609/aaai.v33i01.33016128)
- **2018 · Mean-Field MARL** — [Mean Field Multi-Agent Reinforcement Learning](http://proceedings.mlr.press/v80/yang18d.html)
- **2017 · MADDPG** — [Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments](https://proceedings.neurips.cc/paper/2017/hash/68a9750337a418a86fe06c1991a1d64c-Abstract.html)
- **2017 · COMA** — [Counterfactual Multi-Agent Policy Gradients](https://doi.org/10.1609/aaai.v32i1.11794)

#### Role-Differentiated Collaboration

- **2026 · CoVerRL** — [CoVerRL: Breaking the Consensus Trap in Label-Free Reasoning via Generator-Verifier Co-Evolution](https://doi.org/10.18653/v1/2026.acl-long.1376)
- **2026 · EvoScientist** — [EvoScientist: Towards Multi-Agent Evolving AI Scientists for End-to-End Scientific Discovery](https://doi.org/10.48550/arXiv.2603.08127)
- **2025 · MARS** — [MARS: Co-evolving Dual-System Deep Research via Multi-Agent Reinforcement Learning](https://arxiv.org/abs/2510.04935)
- **2025 · Stronger-MAS** — [Stronger-MAS: Multi-Agent Reinforcement Learning for Collaborative LLMs](https://arxiv.org/abs/2510.11062)
- **2025 · WaltzRL** — [The Alignment Waltz: Jointly Training Agents to Collaborate for Safety](https://doi.org/10.48550/arXiv.2510.08240)
- **2025 · RL Tango** — [RL Tango: Reinforcing Generator and Verifier Together for Language Reasoning](http://papers.nips.cc/paper_files/paper/2025/hash/ad06e23fe0c39b9de6e0cefe3b701f45-Abstract-Conference.html)
- **2025 · MARFT** — [MARFT: Multi-Agent Reinforcement Fine-Tuning](https://doi.org/10.48550/arXiv.2504.16129)
- **2025 · SiriuS** — [SiriuS: Self-improving Multi-agent Systems via Bootstrapped Reasoning](http://papers.nips.cc/paper_files/paper/2025/hash/b45279ac82cb017a5f55ea7d3653193a-Abstract-Conference.html)
- **2024 · CORY** — [Coevolving with the Other You: Fine-Tuning LLM with Sequential Cooperative Multi-Agent Reinforcement Learning](http://papers.nips.cc/paper_files/paper/2024/hash/1c2b1c8f7d317719a9ce32dd7386ba35-Abstract-Conference.html)

### 1.3 Evolving Agent Organizations

- **2026 · MetaAgent-X** — [MetaAgent-X : Breaking the Ceiling of Automatic Multi-Agent Systems via End-to-End Reinforcement Learning](https://arxiv.org/abs/2605.14212)
- **2026 · SkillMAS** — [SkillMAS: Skill Co-Evolution with LLM-based Multi-Agent System](https://doi.org/10.48550/arXiv.2605.09341)
- **2025 · R3DM** — [R3DM: Enabling Role Discovery and Diversity Through Dynamics Models in Multi-agent Reinforcement Learning](https://proceedings.mlr.press/v267/goel25a.html)

## Stage 2: Agent–Environment Co-Evolution

Agents co-evolve with an evolving environment. We classify methods by whether the main source of further evolutionary pressure is a changing task space, feedback space, or interaction space.

### 2.1 Task-Space Co-Evolution

#### Exposure and Selection

- **2026 · Role-Agent** — [Role-Agent: Bootstrapping LLM Agents via Dual-Role Evolution](https://doi.org/10.48550/arXiv.2606.10917)
- **2026 · SEAD** — [SEAD: Self-Evolving Agent for Multi-Turn Service Dialogue](https://doi.org/10.18653/v1/2026.findings-acl.180)
- **2025 · HAP** — [Heterogeneous Adversarial Play in Interactive Environments](http://papers.nips.cc/paper_files/paper/2025/hash/727855c31df8821fd18d41c23daebf10-Abstract-Conference.html)
- **2025 · NCC** — [An Optimisation Framework for Unsupervised Environment Design](https://doi.org/10.48550/arXiv.2505.20659)
- **2024 · ReMiDi** — [Refining Minimax Regret for Unsupervised Environment Design](https://proceedings.mlr.press/v235/beukman24a.html)
- **2023 · Teammate Curriculum** — [Curriculum Learning for Cooperation in Multi-Agent Reinforcement Learning](https://doi.org/10.48550/arXiv.2312.11768)
- **2023 · Portal** — [PORTAL: Automatic Curricula Generation for Multiagent Reinforcement Learning](https://doi.org/10.1609/aaai.v38i14.29524)
- **2021 · PLR⊥** — [Replay-Guided Adversarial Environment Design](https://proceedings.neurips.cc/paper/2021/hash/0e915db6326b6fb6a3c56546980a8c93-Abstract.html)
- **2020 · PLR** — [Prioritized Level Replay](http://proceedings.mlr.press/v139/jiang21b.html)
- **2020 · APT-Gen** — [Adaptive Procedural Task Generation for Hard-Exploration Problems](https://openreview.net/forum?id=8xLkv08d70T)
- **2020 · SPDL** — [Self-Paced Deep Reinforcement Learning](https://proceedings.neurips.cc/paper/2020/hash/68a9750337a418a86fe06c1991a1d64c-Abstract.html)
- **2019 · ALP-GMM** — [Teacher algorithms for curriculum learning of Deep RL in continuously parameterized environments](http://proceedings.mlr.press/v100/portelas20a.html)
- **2019 · SPRL** — [Self-Paced Contextual Reinforcement Learning](http://proceedings.mlr.press/v100/klink20a.html)
- **2017 · TSCL** — [Teacher-Student Curriculum Learning](https://doi.org/10.1109/TNNLS.2019.2934906)

#### Adaptive Task Generation

- **2026 · MobileForge** — [MobileForge: Annotation-Free Adaptation for Mobile GUI Agents with Hierarchical Feedback-Guided Policy Optimization](https://doi.org/10.48550/arXiv.2606.19930)
- **2026 · SENTINEL** — [SENTINEL: Failure-Driven Reinforcement Learning for Training Tool-Using Language Model Agents](https://doi.org/10.48550/arXiv.2606.12908)
- **2026 · Socratic-SWE** — [Socratic-SWE: Self-Evolving Coding Agents via Trace-Derived Agent Skills](https://doi.org/10.48550/arXiv.2606.07412)
- **2026 · CoEvolve** — [CoEvolve: Training LLM Agents via Agent-Data Mutual Evolution](https://doi.org/10.18653/v1/2026.acl-long.1055)
- **2026 · EE-MCP** — [EE-MCP: Self-Evolving MCP-GUI Agents via Automated Environment Generation and Experience Learning](https://doi.org/10.48550/arXiv.2604.09815)
- **2026 · UI-Voyager** — [UI-Voyager: A Self-Evolving GUI Agent Learning via Failed Experience](https://doi.org/10.48550/arXiv.2603.24533)
- **2026 · Autonomous Continual Learning CUA** — [Autonomous Continual Learning of Computer-Use Agents for Environment Adaptation](https://doi.org/10.48550/arXiv.2602.10356)
- **2026 · RLAnything** — [RLAnything: Forge Environment, Policy, and Reward Model in Completely Dynamic RL System](https://doi.org/10.48550/arXiv.2602.02488)
- **2026 · Tool-R0** — [Tool-R0: Self-Evolving LLM Agents for Tool-Learning from Zero Data](https://doi.org/10.48550/arXiv.2602.21320)
- **2026 · Dr. Zero** — [Dr. Zero: Self-Evolving Search Agents without Training Data](https://doi.org/10.48550/arXiv.2601.07055)
- **2026 · EvoCUA** — [EvoCUA: Evolving Computer Use Agents via Learning from Scalable Synthetic Experience](https://doi.org/10.48550/arXiv.2601.15876)
- **2025 · GenEnv** — [GenEnv: Difficulty-Aligned Co-Evolution Between LLM Agents and Environment Simulators](https://doi.org/10.48550/arXiv.2512.19682)
- **2025 · Agent0** — [Agent0: Unleashing Self-Evolving Agents from Zero Data via Tool-Integrated Reasoning](https://doi.org/10.48550/arXiv.2511.16043)
- **2025 · AgentEvolver** — [AgentEvolver: Towards Efficient Self-Evolving Agent System](https://doi.org/10.48550/arXiv.2511.10395)
- **2025 · AgentFrontier** — [AgentFrontier: Expanding the Capability Frontier of LLM Agents with ZPD-Guided Data Synthesis](https://doi.org/10.48550/arXiv.2510.24695)
- **2025 · ASL** — [Towards Agentic Self-Learning LLMs in Search Environment](https://arxiv.org/abs/2510.14253)
- **2025 · Search Self-Play** — [Search Self-play: Pushing the Frontier of Agent Capability without Supervision](https://doi.org/10.48550/arXiv.2510.18821)
- **2025 · SEAgent** — [SEAgent: Self-Evolving Computer Use Agent with Autonomous Learning from Experience](https://doi.org/10.48550/arXiv.2508.04700)
- **2025 · Self-Challenging** — [Self-Challenging Language Model Agents](http://papers.nips.cc/paper_files/paper/2025/hash/a5a305fac88fb4ae40969cfec5eef48d-Abstract-Conference.html)
- **2025 · CCL** — [CCL: Collaborative Curriculum Learning for Sparse-Reward Multi-agent Reinforcement Learning via Co-Evolutionary Task Evolution](https://doi.org/10.1007/978-981-96-9894-3_5)
- **2025 · MT-ASP** — [Do as you teach: a multi-teacher approach to self-play in deep reinforcement learning](https://doi.org/10.1007/s00521-024-10829-4)
- **2024 · WebRL** — [WebRL: Training LLM Web Agents via Self-Evolving Online Curriculum Reinforcement Learning](https://openreview.net/forum?id=oVKEAFjEqv)
- **2021 · Asymmetric Self-Play** — [Asymmetric self-play for automatic goal discovery in robotic manipulation](https://arxiv.org/abs/2101.04882)
- **2017 · GoalGAN** — [Automatic Goal Generation for Reinforcement Learning Agents](http://proceedings.mlr.press/v80/florensa18a.html)

### 2.2 Feedback-Space Co-Evolution

#### Preference-Driven Feedback

- **2025 · PPE** — [Improving Reward Models with Proximal Policy Exploration for Preference-Based Reinforcement Learning](http://papers.nips.cc/paper_files/paper/2025/hash/9cd2a03f427acc03b6ddbb9c8f3be57c-Abstract-Conference.html)
- **2025 · DAPPER** — [DAPPER: Discriminability-Aware Policy-to-Policy Preference-Based Reinforcement Learning for Query-Efficient Robot Skill Acquisition](https://doi.org/10.1109/MRA.2026.3650847)
- **2025 · DUO** — [DUO: Diverse, Uncertain, On-Policy Query Generation and Selection for Reinforcement Learning from Human Feedback](https://doi.org/10.1609/aaai.v39i16.33824)
- **2022 · RUNE** — [Reward Uncertainty for Exploration in Preference-based Reinforcement Learning](https://openreview.net/forum?id=OWZVD-l-ZrC)
- **2021 · PEBBLE** — [PEBBLE: Feedback-Efficient Interactive Reinforcement Learning via Relabeling Experience and Unsupervised Pre-training](http://proceedings.mlr.press/v139/lee21i.html)
- **2017 · RLHF** — [Deep Reinforcement Learning from Human Preferences](https://proceedings.neurips.cc/paper/2017/hash/d5e2c0adad503c91f91df240d0cd4e49-Abstract.html)

#### Outcome-Driven Feedback

- **2026 · CoEvoSkills** — [CoEvoSkills: Self-Evolving Agent Skills via Co-Evolutionary Verification](https://arxiv.org/abs/2604.01687)
- **2025 · LaRes** — [Lares: evolutionary reinforcement learning with llm-based adaptive reward search](https://proceedings.neurips.cc/paper_files/paper/2025/file/21b5d3a17aa5525f30bfd2bc59ac3a48-Paper-Conference.pdf)
- **2025 · Reward Discovery** — [Discovery of the reward function for embodied reinforcement learning agents](https://www.nature.com/articles/s41467-025-66009-y)
- **2025 · Env-Tuning** — [Don't Just Fine-tune the Agent, Tune the Environment](https://arxiv.org/abs/2510.10197)
- **2025 · RE-GoT** — [Reward Evolution with Graph-of-Thoughts: A Bi-Level Language Model Framework for Reinforcement Learning](https://arxiv.org/abs/2509.16136)
- **2025 · CURE** — [Co-Evolving LLM Coder and Unit Tester via Reinforcement Learning](http://papers.nips.cc/paper_files/paper/2025/hash/d38653cdaa8e992549e1e9e1621610d7-Abstract-Conference.html)
- **2025 · AHRS** — [Automated Hybrid Reward Scheduling Via Large Language Models for Robotic Skill Learning](https://doi.org/10.1109/ICRA55743.2025.11127726)
- **2024 · ROSKA** — [Efficient Language-instructed Skill Acquisition via Reward-Policy Co-Evolution](https://doi.org/10.1609/aaai.v39i14.33597)
- **2024 · CARD** — [A large language model-driven reward design framework via dynamic feedback for reinforcement learning](https://doi.org/10.1016/j.knosys.2025.114065)
- **2024 · REvolve** — [REvolve: Reward Evolution with Large Language Models using Human Feedback](https://openreview.net/forum?id=cJPUpL8mOw)
- **2023 · Eureka** — [Eureka: Human-Level Reward Design via Coding Large Language Models](https://openreview.net/forum?id=IEduRUO55F)
- **2023 · Self-Refined Reward Designer** — [Self-Refined Large Language Model as Automated Reward Function Designer for Deep Reinforcement Learning in Robotics](https://doi.org/10.48550/arXiv.2309.06687)

#### Consistency-Augmented Feedback

- **2026 · ARCO** — [ARCO: Adaptive Rubric with Co-Evolution for Multi-Step LLM-Based Agents](https://doi.org/10.48550/arXiv.2606.21262)
- **2026 · ECHO** — [No More Stale Feedback: Co-Evolving Critics for Open-World Agent Learning](https://aclanthology.org/2026.acl-long.576/)
- **2025 · NLAC** — [Natural Language Actor-Critic: Scalable Off-Policy Learning in Language Space](https://doi.org/10.48550/arXiv.2512.04601)
- **2025 · R*** — [R*: Efficient Reward Design via Reward Structure Evolution and Parameter Alignment Optimization with Large Language Models](https://proceedings.mlr.press/v267/li25v.html)
- **2022 · SURF** — [SURF: Semi-supervised Reward Learning with Data Augmentation for Feedback-efficient Preference-based Reinforcement Learning](https://arxiv.org/abs/2203.10050)

### 2.3 Interaction-Space Co-Evolution

#### Executable World Construction

- **2026 · SEAL** — [SEAL: Synergistic Co-Evolution of Agents and Learning Environments](https://doi.org/10.48550/arXiv.2605.24426)
- **2026 · SimWorld Studio** — [SimWorld Studio: Automatic Environment Generation with Evolving Coding Agent for Embodied Agent Learning](https://doi.org/10.48550/arXiv.2605.09423)
- **2026 · Agent-World** — [Agent-World: Scaling Real-World Environment Synthesis for Evolving General Agent Intelligence](https://doi.org/10.48550/arXiv.2604.18292)
- **2026 · COvolve** — [COvolve: Adversarial Co-Evolution of Large-Language-Model-Generated Policies and Environments via Two-Player Zero-Sum Game](https://doi.org/10.1145/3795095.3805144)
- **2026 · Adaptive EnvGen** — [Towards Adaptive Environment Generation for Training Embodied Agents](https://doi.org/10.48550/arXiv.2602.06366)
- **2026 · DiCode** — [Dreaming in Code for Curriculum Learning in Open-Ended Worlds](https://doi.org/10.48550/arXiv.2602.08194)
- **2026 · DEGen** — [Improving Regret Approximation for Unsupervised Dynamic Environment Generation](http://papers.nips.cc/paper_files/paper/2025/hash/f6b1d75736fd0fc308afb2e380c324d2-Abstract-Conference.html)
- **2025 · Driving Scenarios ACL** — [Automatic Curriculum Learning for Driving Scenarios: Towards Robust and Efficient Reinforcement Learning](https://doi.org/10.1109/IV64158.2025.11097458)
- **2024 · Eurekaverse** — [Eurekaverse: Environment Curriculum Generation via Large Language Models](https://doi.org/10.48550/arXiv.2411.01775)
- **2024 · ADD** — [Adversarial Environment Design via Regret-Guided Diffusion Models](http://papers.nips.cc/paper_files/paper/2024/hash/74953ef4abd9c436344e59d687ad34d3-Abstract-Conference.html)
- **2024 · LLM-POET** — [LLM-POET: Evolving Complex Environments using Large Language Models](https://doi.org/10.1145/3638530.3654115)
- **2024 · OMNI-EPIC** — [OMNI-EPIC: Open-endedness via Models of human Notions of Interestingness with Environments Programmed in Code](https://openreview.net/forum?id=Y1XkzMJpPd)
- **2024 · EnvGen** — [EnvGen: Generating and Adapting Environments via LLMs for Training Embodied Agents](https://doi.org/10.48550/arXiv.2403.12014)
- **2024 · EvolutionaryAgent** — [Agent Alignment in Evolving Social Norms](https://doi.org/10.48550/arXiv.2401.04620)
- **2023 · MAESTRO** — [MAESTRO: Open-Ended Environment Design for Multi-Agent Reinforcement Learning](https://openreview.net/forum?id=sKWlRDzPfd7)
- **2022 · ACCEL** — [Evolving Curricula with Regret-Based Environment Design](https://proceedings.mlr.press/v162/parker-holder22a.html)
- **2021 · XLand** — [Open-Ended Learning Leads to Generally Capable Agents](https://arxiv.org/abs/2107.12808)
- **2020 · PAIRED** — [Emergent Complexity and Zero-shot Transfer via Unsupervised Environment Design](https://proceedings.neurips.cc/paper/2020/hash/985e9a46e10005356bbaf194249f6856-Abstract.html)
- **2020 · AI Economist** — [The AI Economist: Improving Equality and Productivity with AI-Driven Tax Policies](https://arxiv.org/abs/2004.13332)
- **2019 · ADR** — [Solving Rubik's Cube with a Robot Hand](https://arxiv.org/abs/1910.07113)
- **2019 · POET** — [Paired Open-Ended Trailblazer (POET): Endlessly Generating Increasingly Complex and Diverse Learning Environments and Their Solutions](http://arxiv.org/abs/1901.01753)

#### Model-Based World Construction

- **2026 · EnvACE** — [EnvACE: Internalizing Environment Dynamics via World Rehearsal for Agentic Reinforcement Learning](https://arxiv.org/abs/2608.06197)
- **2026 · EvolvingWorld** — [EvolvingWorld: An Open-Schema Framework for Co-Evolving Role-Play Agents and World Model in Interactive Literary World](https://arxiv.org/abs/2607.17250)
- **2026 · COMAP** — [COMAP: Co-Evolving World Models and Agent Policies for LLM Agents](https://doi.org/10.48550/arXiv.2606.02372)
- **2026 · PaW** — [Policy and World Modeling Co-Training for Language Agents](https://doi.org/10.48550/arXiv.2606.02388)
- **2026 · VLAW** — [VLAW: Iterative Co-Improvement of Vision-Language-Action Policy and World Model](https://doi.org/10.48550/arXiv.2602.12063)
- **2026 · World-VLA-Loop** — [World-VLA-Loop: Closed-Loop Learning of Video World Model and VLA Policy](https://doi.org/10.48550/arXiv.2602.06508)
- **2025 · LCDrive** — [Latent Chain-of-Thought World Modeling for End-to-End Driving](https://doi.org/10.48550/arXiv.2512.10226)
- **2025 · DreamGym** — [Scaling Agent Learning via Experience Synthesis](https://doi.org/10.48550/arXiv.2511.03773)
- **2025 · WebEvolver** — [WebEvolver: Enhancing Web Agent Self-Improvement with Co-evolving World Model](https://doi.org/10.18653/v1/2025.emnlp-main.454)
- **2025 · EvolvingAgent** — [EvolvingAgent: Curriculum Self-evolving Agent with Continual World Model for Long-Horizon Tasks](https://arxiv.org/abs/2502.05907)

## Stage 3: Meta Co-Evolution

Stage 3 makes the mechanism governing later evolution itself evolvable. Single-entity meta-evolution methods are listed as precursors; full Meta Co-Evolution additionally couples mechanism evolution to a lower-level co-evolving system.

### 3.1 Single-Entity Meta-Evolution Precursors

- **2026 · SIA** — [SIA: Self Improving AI with Harness & Weight Updates](https://doi.org/10.48550/arXiv.2605.27276)
- **2026 · HyperAgents** — [Hyperagents](https://doi.org/10.48550/arXiv.2603.19461)
- **2025 · Gödel Agent** — [Gödel Agent: A Self-Referential Agent Framework for Recursively Self-Improvement](https://doi.org/10.18653/v1/2025.acl-long.1354)
- **2025 · MemEvolve** — [MemEvolve: Meta-Evolution of Agent Memory Systems](https://doi.org/10.48550/arXiv.2512.18746)
- **2023 · PromptBreeder** — [Promptbreeder: Self-Referential Self-Improvement via Prompt Evolution](https://proceedings.mlr.press/v235/fernando24a.html)

### 3.2 Meta Co-Evolution

- **2026 · RQGM** — [The Red Queen Gödel Machine: Co-Evolving Agents and Their Evaluators](https://doi.org/10.48550/arXiv.2606.26294)

## Contributing

If we have missed a relevant paper, please contact us at [qzong@cse.ust.hk](mailto:qzong@cse.ust.hk). Please include its title, link, first public release date, and a brief description of what co-evolves and how the evolving units influence one another over successive rounds.

We include systems in which at least two units evolve together, with changes in each shaping the other's subsequent evolution. Static multi-agent interaction, one-off refinement, and single-entity self-evolution are outside this scope. Single-entity methods that evolve their own evolution mechanisms are included only as Stage-3 precursors.

## Citation

If you find this survey or paper list useful, please cite:

```bibtex
@article{zong2026coevolution,
  title   = {Co-Evolution in Agentic Systems: Toward Self-Directed Evolution Beyond Human Design},
  author  = {Zong, Qing and Liu, Jiayu and Shen, Junhao and Tang, Zecong and Wu, Linsi and Liu, Yuxuan and Wang, Rui and Wang, Zhaowei and Wang, Weiqi and Qian, Cheng and Chen, Xiusi and Song, Yangqiu},
  year    = {2026},
  eprint  = {2608.10299},
  archivePrefix = {arXiv},
  primaryClass  = {cs.CL}
}
```
