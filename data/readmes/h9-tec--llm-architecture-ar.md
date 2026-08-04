# أنواع الـ Attention في الـ LLMs الحديثة

دليل تعليمي مفصل بالمعادلات، من MHA الأصلية لحد MSA وKimi Linear، مع قسم عن باقي اللي اتغير في الـ LLMs خارج الـ attention.

المطلوب قبل ما تقرأ: فهم أساسي للـ Transformers (matrices, softmax, layers). كل حاجة تانية هنبنيها خطوة خطوة.

---

## جدول المحتويات

1. [الأساس: ليه بندور على بدائل؟](#1-الأساس-ليه-بندور-على-بدائل)
2. [العائلة الأولى: تقليل الـ KV Cache](#2-العائلة-الأولى-تقليل-الـ-kv-cache)
3. [العائلة التانية: Sparse Attention](#3-العائلة-التانية-sparse-attention)
4. [العائلة التالتة: Linear Attention والـ Hybrids](#4-العائلة-التالتة-linear-attention-والـ-hybrids)
5. [Case Study: رحلة MiniMax](#5-case-study-رحلة-minimax)
6. [جدول المقارنة الشامل](#6-جدول-المقارنة-الشامل)
7. [إزاي تختار في الـ Production](#7-إزاي-تختار-في-الـ-production)
8. [خارج الـ Attention: إيه اللي اتغير كمان](#8-خارج-الـ-attention-إيه-اللي-اتغير-كمان)
9. [المراجع](#9-المراجع)

---

## 1. الأساس: ليه بندور على بدائل؟

### 1.1 معادلة الـ Attention الأصلية

من ورقة "Attention Is All You Need" (2017):

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

حيث:

- $Q \in \mathbb{R}^{n \times d_k}$ هي الـ queries (السؤال: أنا كـ token بدور على إيه؟)
- $K \in \mathbb{R}^{n \times d_k}$ هي الـ keys (الإجابة: أنا كـ token عندي إيه؟)
- $V \in \mathbb{R}^{n \times d_v}$ هي الـ values (المحتوى الفعلي اللي هيتنقل)
- $n$ طول الـ sequence، و $d_k$ أبعاد كل head
- القسمة على $\sqrt{d_k}$ عشان الـ dot products متكبرش فتخلي الـ softmax saturated

### 1.2 المشكلتين

**المشكلة الأولى: Compute**

حساب $QK^\top$ بيكلف $O(n^2 \cdot d)$ عمليات. يعني لو ضاعفت طول الـ context، التكلفة بتتضاعف 4 مرات. عند context بمليون token، الرقم ده بيبقى غير عملي.

**المشكلة التانية: Memory (الـ KV Cache)**

في الـ autoregressive decoding، كل token جديد محتاج يعمل attention على كل الـ tokens اللي قبله. عشان منعيدش الحسابات، بنخزن الـ K والـ V بتوع كل token في الـ **KV cache**. الـ cache ده بيكبر خطيا مع طول الـ context، وبياكل الـ GPU memory اللي كان ممكن تستخدمها لـ batch أكبر.

### 1.3 حساب حجم الـ KV Cache

حجم الـ cache لكل token:

$$
\text{KV cache per token} = 2 \times L \times n_{kv} \times d_{head} \times b
$$

حيث:

- $2$ لأننا بنخزن K و V
- $L$ عدد الـ layers
- $n_{kv}$ عدد الـ KV heads
- $d_{head}$ أبعاد كل head
- $b$ عدد الـ bytes لكل قيمة (2 في حالة FP16/BF16)

**مثال رقمي:** موديل زي Llama 3 70B بـ full MHA كان هيحتاج:
$2 \times 80 \times 64 \times 128 \times 2 = 2.6$ MB لكل token. عند context بـ 128K token، ده **335 GB** للـ cache لوحده لـ sequence واحد. ده سبب كافي إن العائلة الأولى كلها تظهر.

الملحوظة المهمة: كل الحلول اللي جاية بتهاجم واحدة من المشكلتين دول أو الاتنين. خليك فاكرهم وانت بتقرأ.

---

## 2. العائلة الأولى: تقليل الـ KV Cache

الفلسفة هنا: نحافظ على full attention زي ما هي (كل token يشوف كل tokens)، بس نقلل حجم الـ K والـ V اللي بنخزنهم.

```
MHA:   Q Q Q Q Q Q Q Q      MQA:   Q Q Q Q Q Q Q Q      GQA:   Q Q Q Q Q Q Q Q
       │ │ │ │ │ │ │ │              ╲ ╲ ╲ ╲ ╱ ╱ ╱ ╱             ╲ ╱ ╲ ╱ ╲ ╱ ╲ ╱
       K K K K K K K K                   K واحد                  K   K   K   K
      (KV head لكل query)          (KV head للكل)           (KV head لكل group)
```

### 2.1 Multi-Head Attention (MHA)

الصيغة الأصلية. بدل attention واحدة، بنعمل $h$ نسخة متوازية، كل واحدة بتشتغل في subspace مختلف:

$$
\text{head}_i = \text{Attention}(XW_i^Q,\; XW_i^K,\; XW_i^V)
$$

$$
\text{MHA}(X) = \text{Concat}(\text{head}_1, \dots, \text{head}_h)\,W^O
$$

كل head بتتعلم علاقات مختلفة (syntax, coreference, positional patterns). المشكلة: كل head ليها K و V خاصين بيها، فالـ KV cache بيتضرب في $h$.

**مستخدمة في:** GPT-2/3، BERT، Llama 1، T5، وأغلب الموديلات قبل 2023.

### 2.2 Multi-Query Attention (MQA)

فكرة Shazeer (2019): كل الـ query heads تشارك **KV head واحد**:

$$
\text{head}_i = \text{Attention}(XW_i^Q,\; XW^K,\; XW^V)
$$

لاحظ إن $W^K$ و $W^V$ مبقوش عليهم index. الـ KV cache بيقل بمعامل $h$ (يعني 32x لو عندك 32 head). الثمن: خسارة ملحوظة في الجودة، لأن كل الـ heads بقت مجبرة تدور في نفس الـ K/V representation.

**مستخدمة في:** PaLM، Falcon، StarCoder.

### 2.3 Grouped-Query Attention (GQA)

الحل الوسط بتاع Ainslie et al. (2023). بنقسم الـ $h$ query heads لـ $g$ مجموعات، وكل مجموعة تشارك KV head واحد:

$$
\text{head}_i = \text{Attention}(XW_i^Q,\; XW_{g(i)}^K,\; XW_{g(i)}^V)
$$

حيث $g(i)$ هي المجموعة اللي الـ head $i$ تابعة ليها.

- لو $g = h$ رجعنا لـ MHA
- لو $g = 1$ رجعنا لـ MQA
- الـ KV cache بيقل بمعامل $h / g$

**مثال:** Llama 3 70B بيستخدم 64 query heads و 8 KV heads، يعني الـ cache قل 8 مرات مقارنة بـ MHA، والمثال الرقمي بتاعنا فوق بينزل من 335 GB لـ 42 GB عند 128K. الخسارة في الجودة شبه معدومة عمليا، وده اللي خلاها **المعيار الحالي**.

**مستخدمة في:** Llama 2/3، Qwen 2/3، Mistral، Gemma، MiniMax-M2، وأغلب الموديلات المفتوحة من 2023 لحد دلوقتي.

### 2.4 Multi-head Latent Attention (MLA)

ابتكار DeepSeek في V2 (2024). بدل ما نقلل عدد الـ KV heads، بنضغط الـ K والـ V كلهم في **latent vector** واحد صغير ونخزنه هو:

**الضغط (اللي بيتخزن):**

$$
c_t^{KV} = W^{DKV} h_t, \qquad c_t^{KV} \in \mathbb{R}^{d_c}
$$

حيث $h_t$ هو الـ hidden state بتاع الـ token و $d_c$ أصغر بكتير من $2 \cdot n_h \cdot d_h$.

**فك الضغط (وقت الحساب):**

$$
k_t^C = W^{UK} c_t^{KV}, \qquad v_t^C = W^{UV} c_t^{KV}
$$

**مشكلة الـ RoPE والحل:**

الـ RoPE العادي بيضرب الـ K في rotation matrix بتعتمد على الـ position. ده بيكسر خدعة رياضية مهمة: إن $W^{UK}$ ممكن "يتشرب" جوه $W^Q$ وقت الـ inference فمنحتاجش نفك الضغط أصلا. الحل كان **decoupled RoPE**: جزء صغير من الأبعاد ($d_R$) بياخد RoPE ويتخزن منفصل، والباقي من غير positional encoding:

$$
k_t = [\,k_t^C \,;\, \text{RoPE}(W^{KR} h_t)\,]
$$

اللي بيتخزن فعليا لكل token: $c_t^{KV}$ (أبعادها 512 في DeepSeek-V3) + الجزء الـ RoPE (أبعاده 64). ورقة V2 بتقول إن ده بيقلل الـ KV cache بنسبة **93.3%** مقارنة بـ MHA، مكافئ لـ GQA بـ 2.25 group بس.

**المفاجأة:** في الـ ablations، MLA طلعت أداءها **أحسن** من MHA نفسها، بينما GQA أوحش من MHA. التفسير المرجح إن الضغط لـ latent space اشتغل كنوع من الـ regularization. يعني MLA كسرت القاعدة اللي كانت بتقول إن تقليل الـ cache لازم يدفع ثمنه من الجودة.

**الثمن:** implementation أعقد بكتير من GQA (up/down projections، decoupled RoPE، matrix absorption tricks)، وده اللي مأخر انتشارها رغم تفوقها.

**مستخدمة في:** DeepSeek-V2/V3/R1/V3.2، Kimi K2، وبدأت تظهر في موديلات تانية.

### 2.5 مقارنة العائلة الأولى

| Mechanism | KV heads | تقليل الـ cache | الجودة مقارنة بـ MHA | التعقيد |
|---|---|---|---|---|
| MHA | $h$ | 1x (الأساس) | الأساس | بسيط |
| MQA | 1 | $h$x | أقل بشكل ملحوظ | بسيط |
| GQA | $g$ | $(h/g)$x | أقل بشكل طفيف جدا | بسيط |
| MLA | latent | ~15x مقابل MHA | أحسن في الـ ablations | عالي |

كل دول لسه $O(n^2)$ في الـ compute. العائلتين الجايين هما اللي بيهاجموا المشكلة دي.

---

## 3. العائلة التانية: Sparse Attention

الفلسفة هنا مختلفة: بدل ما كل token يحسب attention على **كل** اللي قبله، يحسبها على **subset مختار**. لو اخترنا صح، أغلب الـ attention mass أصلا بيروح لعدد صغير من الـ tokens، فالخسارة بتبقى محدودة والتوفير ضخم.

الفرق الجوهري بين الطرق دي: **مين بيختار الـ subset وإزاي؟** ثابت (sliding window)، ولا متعلم أثناء التدريب (NSA, MoBA, DSA, MSA)؟

### 3.1 Sliding Window Attention (SWA)

أبسط شكل: كل token يشوف آخر $w$ tokens بس:

$$
\text{mask}(t, s) =
\begin{cases}
0 & t - w < s \le t \\
-\infty & \text{otherwise}
\end{cases}
$$

- الـ compute بينزل من $O(n^2)$ لـ $O(n \cdot w)$
- الـ KV cache بيثبت عند $w$ tokens مهما طال الـ context
- المعلومة البعيدة بتوصل **بشكل غير مباشر**: كل layer بتوسع مجال الرؤية، فبعد $L$ layers الـ receptive field النظري بيبقى تقريبا $L \times w$

**التطبيق العملي بقى دايما hybrid:** طبقات local متبادلة مع طبقات global.

- Mistral 7B: نافذة 4096 في كل الطبقات (النسخة الأولى)
- Gemma 3: نسبة 5 local (نافذة 1024) : 1 global، وده قلل الـ KV cache بشكل كبير
- gpt-oss: تبادل بين full وnافذة 128، مع attention sinks (tokens ثابتة في أول الـ sequence بتفضل مرئية للكل عشان توزيع الـ softmax ميتبهدلش)

**نقطة الضعف:** الاختيار ثابت ومش بيتكيف مع المحتوى. لو المعلومة المهمة بعيدة، مفيش طريق مباشر ليها. ودي بالظبط المشكلة اللي الطرق المتعلمة الجاية بتحلها.

### 3.2 NSA: Native Sparse Attention (DeepSeek)

ورقة فبراير 2025، وأول إعلان جدي إن الـ sparsity ممكن تتعلم **من أول التدريب** (natively) مش تتضاف بعده. ثلاث مسارات attention متوازية لكل query:

1. **Compression:** الـ tokens بتتقسم blocks، وكل block بيتضغط بـ MLP متعلم لـ token واحد مضغوط. الـ attention على الـ tokens المضغوطة دي بتدي نظرة coarse على الـ context كله.
2. **Selection:** درجات الأهمية من مسار الـ compression بتحدد أهم $n$ blocks، والـ attention بتتحسب عليهم بالتفصيل (fine-grained) على الـ tokens الحقيقية.
3. **Sliding window:** مسار local للمعلومات القريبة.

والدمج بـ gate متعلم لكل مسار:

$$
o_t = \sum_{c \in \{\text{cmp}, \text{slc}, \text{win}\}} g_t^c \cdot o_t^c, \qquad g_t^c = \sigma(\text{MLP}_c(x_t))
$$

**النقطتين المهمين في الورقة:**

- الـ sparsity لازم تدخل في الـ gradients من البداية. لو دربت dense وبعدين فرضت sparsity وقت الـ inference، الـ retrieval heads بتتبهدل.
- الـ blocks متصممة على مقاس الـ GPU (contiguous memory access) فالتوفير النظري بيتحول لسرعة فعلية.

### 3.3 MoBA: Mixture of Block Attention (Kimi / Moonshot)

نفس فكرة الـ MoE بس متطبقة على الـ attention، ومن غير أي parameters إضافية. الـ context بيتقسم blocks، وكل query بتختار أهم $k$ blocks بحساب affinity بسيط:

$$
s_i = \left\langle q_t,\; \bar{k}_i \right\rangle, \qquad \bar{k}_i = \frac{1}{|B_i|} \sum_{s \in B_i} k_s
$$

حيث $B_i$ هي مجموعة الـ tokens في الـ block رقم $i$. وبعدين top-k على الدرجات دي، مع إن الـ block الحالي دايما محسوب (زي الـ shared expert في الـ MoE). الجمال هنا في البساطة: مفيش شبكات إضافية، مجرد mean pooling وdot product، وممكن تبدل بين full وsparse في نفس الموديل أثناء التدريب.

### 3.4 DSA: DeepSeek Sparse Attention (DeepSeek V3.2)

هنا الاختيار بقى على مستوى الـ **token** مش الـ block، ومبني **فوق MLA** مش بديل ليها. المكون الأساسي هو الـ **lightning indexer**: شبكة صغيرة جدا (عدد heads قليل، بتشتغل FP8) بتدي score لكل token قديم $s$ بالنسبة للـ token الحالي $t$:

$$
I_{t,s} = \sum_{j=1}^{H_I} w_{t,j} \cdot \text{ReLU}\!\left(q_{t,j}^{I} \cdot k_{s}^{I}\right)
$$

وبعدين بنختار أعلى $k$ tokens (2048 في V3.2) والـ MLA attention الرئيسية بتتحسب عليهم بس.

**الشغلانة الذكية في التكلفة:** الـ indexer نفسه لسه $O(n^2)$، لكن الثابت بتاعه صغير جدا (heads قليلة + FP8 + ReLU بدل softmax) لدرجة إنه شبه مجاني. الـ attention الرئيسية، اللي هي الغالية، بقت $O(n \cdot k)$.

**التدريب على مرحلتين:** مرحلة dense الـ indexer فيها بيتعلم يقلد توزيع الـ attention الكاملة (KL loss)، وبعدين مرحلة sparse بالاختيار الفعلي.

### 3.5 MSA: MiniMax Sparse Attention (MiniMax M3)

أحدث إضافة للعائلة (يونيو 2026). الفكرة: block-level selection زي MoBA، لكن بشبكة index متعلمة زي DSA، ومبنية على **GQA** عادية:

- **Index Branch:** شبكة خفيفة بتدي score للـ KV blocks، وكل GQA group بتختار top-k blocks **خاصة بيها** (اختيار مستقل لكل group).
- **Main Branch:** block-sparse attention **مظبوطة** (exact) على الـ blocks المختارة، على الـ K/V الحقيقية من غير أي ضغط.

**مشكلة التدريب وحلها:** الـ top-k عملية non-differentiable، فالـ language modeling loss مش بيوصل للـ index branch. الحل: **KL alignment loss** بتخلي توزيع الـ index branch يطابق نمط الـ attention الفعلي في الـ main branch، مع gradient detach عشان الـ loss ده ميلخبطش الـ backbone.

**الأرقام من الورقة:** على موديل 109B multimodal، عند context بمليون token: تقليل compute الـ attention لكل token بمعامل **28.4x**، وبالـ kernel المصاحب سرعة **14.2x** في الـ prefill و **7.6x** في الـ decoding على H800، بأداء موازي للـ GQA الكاملة. ودي الميكانيزم اللي شغالة في MiniMax M3 وبتديله context حتى 1M.

**المقارنة السريعة جوه العائلة:** DSA بتختار tokens فردية فوق MLA، MSA بتختار blocks فوق GQA على KV حقيقية. الـ block-level أسهل في الـ hardware efficiency والـ prefix caching، والـ token-level أدق في الالتقاط.

---

## 4. العائلة التالتة: Linear Attention والـ Hybrids

هنا التغيير جذري: بنعيد صياغة الـ attention نفسها عشان نكسر الـ $O(n^2)$ من أساسه، ونستبدل الـ KV cache اللي بيكبر بـ **state ثابت الحجم**.

### 4.1 الفكرة الرياضية

خد الـ attention لـ token واحد $t$ واكتبها بدون matrices:

$$
o_t = \frac{\sum_{s \le t} \exp(q_t^\top k_s)\, v_s}{\sum_{s \le t} \exp(q_t^\top k_s)}
$$

المشكلة كلها في الـ $\exp$: بتربط $q_t$ بكل $k_s$ فمفيش طريقة نلخص الماضي. الـ linear attention بتستبدلها بـ feature map $\phi$ قابلة للفصل:

$$
\exp(q_t^\top k_s) \;\approx\; \phi(q_t)^\top \phi(k_s)
$$

وبمجرد ما الفصل ده يحصل، نقدر نجمع الماضي كله في **state** واحد:

$$
S_t = S_{t-1} + \phi(k_t)\, v_t^\top, \qquad o_t = \frac{\phi(q_t)^\top S_t}{\phi(q_t)^\top z_t}, \qquad z_t = z_{t-1} + \phi(k_t)
$$

النتيجة:

- $S_t$ حجمه ثابت ($d \times d$) مهما طال الـ context. **الـ KV cache اختفى.**
- كل token جديد بيكلف $O(1)$، والـ sequence كله $O(n)$.
- والـ Transformer بقى ممكن يتكتب كـ RNN. دي نفس العائلة اللي فيها RWKV والـ SSMs زي Mamba.

**الثمن الجوهري:** الـ state الثابت ذاكرة **lossy**. الـ full attention بترجع لأي token قديم بدقة كاملة، الـ linear لازم تضغط كل الماضي في matrix واحدة. عمليا ده بيبان في مهام الـ exact retrieval (needle in a haystack) على المدى الطويل. كل تطور جاي في العائلة دي هو محاولة لإدارة الذاكرة المضغوطة دي بذكاء أكبر.

### 4.2 Lightning Attention (MiniMax-01 / M1)

الـ linear attention النظرية كانت بطيئة عمليا على الـ GPUs بسبب الـ cumulative operations. الـ Lightning Attention حلت ده بالـ **tiling**: تقسيم الحساب لـ blocks، جوه الـ block بيتحسب بالطريقة العادية (parallel, exact)، وبين الـ blocks بالـ recurrent state. النتيجة: linear attention بسرعة فعلية ثابتة مع طول الـ context.

MiniMax-01 (يناير 2025) كانت أول مرة الفكرة دي تتشغل على نطاق ضخم: 456B parameters بنسبة **7 layers lightning : 1 layer softmax**، وبعدها M1 كملت على نفس الأساس كـ reasoning model.

### 4.3 DeltaNet و Gated DeltaNet

بدل ما نضيف على الذاكرة وخلاص (accumulation)، الـ **delta rule** بتعاملها كذاكرة بتتصحح: اقرأ اللي الـ state فاكره عن الـ key الحالي، وصححه ناحية الـ value الجديدة:

$$
S_t = S_{t-1}\left(I - \beta_t\, k_t k_t^\top\right) + \beta_t\, k_t v_t^\top
$$

حيث $\beta_t \in (0,1)$ متعلمة وبتتحكم في قوة الكتابة. دي فعليا خطوة online gradient descent على خطأ استرجاع الذاكرة، وبتدي دقة استرجاع أعلى بكتير من الـ linear attention الساذجة.

الـ **Gated DeltaNet** (NVIDIA, 2024) ضافت gate نسيان $\alpha_t$ زي Mamba-2:

$$
S_t = \alpha_t\, S_{t-1}\left(I - \beta_t\, k_t k_t^\top\right) + \beta_t\, k_t v_t^\top
$$

فبقى عندنا: نسيان متحكم فيه ($\alpha_t$) + كتابة دقيقة ($\beta_t$ والـ delta rule). ودي اللي **Qwen3-Next** بنيت عليها، بنسبة 3 layers Gated DeltaNet : 1 layer attention كاملة.

### 4.4 KDA و Kimi Linear

الـ **Kimi Delta Attention (KDA)** خدت الـ Gated DeltaNet خطوة أبعد: بدل gate واحد scalar لكل الـ state، الـ gate بقى **لكل channel** (diagonal decay)، فالموديل يقدر يمسك معلومة في أبعاد معينة وينسى في أبعاد تانية في نفس اللحظة.

الـ **Kimi Linear** هو الـ hybrid المبني عليها: **3 layers KDA : 1 layer full attention (MLA)**، والنتيجة تقليل الـ KV cache بحوالي 75% وdecoding أسرع بشكل كبير على الـ contexts الضخمة، بأداء بيتفوق على الـ full attention الصافية في تجاربهم.

منطق الورقة نفسها بيلخص الصراع بين العائلتين: الـ sparse attention بتنتقي معلومات لكن سقفها النظري هو الـ full attention، والـ linear مبنية على مبدأ "الضغط هو الذكاء" وبـ delta rule ممكن توصل لقدرة تعبيرية مختلفة، بشرط تدارة الذاكرة صح.

### 4.5 الـ SSM Hybrids (Mamba وأصحابه)

الـ State Space Models زي Mamba هي قريب رياضي للـ linear attention: نفس فكرة الـ recurrent state الثابت بصياغة مختلفة (selective scan). والـ hybrids هنا بتستبدل أغلب طبقات الـ attention بطبقات SSM:

- **Jamba** (AI21): نسبة 1 attention : 7 Mamba مع MoE، من أوائل الـ hybrids الجادة على نطاق كبير.
- موديلات تانية زي IBM Granite 4.0 وNVIDIA Nemotron-H ماشية في نفس الاتجاه.

**ليه كل الـ hybrids بتحتفظ بشوية full attention؟** لأن طبقة full attention واحدة كل 4-8 طبقات بترجع قدرة الـ exact retrieval اللي الـ state المضغوط بيخسرها، بتكلفة إضافية محدودة. النسب المستقرة حاليا في الصناعة بين 3:1 و 7:1.

---

## 5. Case Study: رحلة MiniMax

أوضح مثال إن اختيار الـ attention قرار هندسي مش نظري. نفس الشركة، ثلاث أجيال، ثلاث عائلات:

| الجيل | التاريخ | الـ Attention | ليه؟ |
|---|---|---|---|
| MiniMax-01 / M1 | يناير - يونيو 2025 | Lightning (linear hybrid 7:1) | الرهان المبكر على الـ linear للوصول لـ 1M context |
| MiniMax-M2 | أكتوبر 2025 | **Full attention** (GQA, 48Q/8KV, 62 layers) | رجعوا للخلف بإرادتهم |
| MiniMax-M3 | يونيو 2026 | MSA (block sparse فوق GQA) | 1M context بسرعة وبـ tooling ناضج |

القرار المفاجئ كان M2: بعد ما استثمروا في الـ linear، رجعوا full attention ونشروا مدونة بعنوان "Why Did M2 End Up as a Full Attention Model" شرحوا فيها إن الـ efficient attention ماكانتش **production-ready**: مشاكل دقة، والـ infrastructure والـ inference stacks مش جاهزين، وتعقيدات في الـ prefix caching. وبعد ست شهور، M3 نزل بـ MSA لما الحلول دي اتحلت.

الدرس: الورقة بتقولك الميكانيزم شغال، لكن الـ production بيسأل سؤال تاني خالص: هل الـ ecosystem كله جاهز يشغله؟

---

## 6. جدول المقارنة الشامل

| الميكانيزم | العائلة | الفكرة في سطر | Compute | KV Cache / State | أمثلة |
|---|---|---|---|---|---|
| MHA | تقليل cache | كل head ليها K/V خاصة | $O(n^2)$ | كبير جدا | GPT-3, Llama 1 |
| MQA | تقليل cache | KV head واحدة للكل | $O(n^2)$ | مقسوم على $h$ | Falcon, PaLM |
| GQA | تقليل cache | KV head لكل group | $O(n^2)$ | مقسوم على $h/g$ | Llama 3, Qwen3, Mistral |
| MLA | تقليل cache | ضغط KV في latent | $O(n^2)$ | ~5-7% من MHA | DeepSeek V3/R1, Kimi K2 |
| SWA | Sparse (ثابتة) | شوف آخر $w$ tokens بس | $O(n w)$ | ثابت عند $w$ | Mistral, Gemma 3 |
| NSA | Sparse (متعلمة) | ضغط + اختيار + نافذة بـ gates | sub-quadratic | كامل (الاختيار compute بس) | أبحاث DeepSeek |
| MoBA | Sparse (متعلمة) | top-k blocks بـ mean pooling | sub-quadratic | كامل | أبحاث Kimi |
| DSA | Sparse (متعلمة) | indexer يختار top-k tokens فوق MLA | $O(nk)$ + indexer خفيف | بحجم MLA | DeepSeek V3.2 |
| MSA | Sparse (متعلمة) | top-k blocks لكل GQA group | $O(nk)$ block-level | بحجم GQA | MiniMax M3 |
| Linear / Lightning | Linear | استبدال softmax بـ kernel + state | $O(n)$ | state ثابت | MiniMax-01/M1, RWKV |
| Gated DeltaNet | Linear | delta rule + gate نسيان | $O(n)$ | state ثابت | Qwen3-Next (hybrid 3:1) |
| KDA | Linear | delta rule بـ gating لكل channel | $O(n)$ | state ثابت | Kimi Linear (hybrid 3:1) |
| SSM Hybrid | Linear | طبقات Mamba + شوية attention | $O(n)$ أغلبه | state + cache صغير | Jamba, Granite 4.0 |

---

## 7. إزاي تختار في الـ Production

الـ benchmark scores لوحدها مش هتقولك حاجة عن دي. الأسئلة اللي بتفرق:

**1. الـ context الفعلي بتاعك قد إيه؟**
لو شغلك أغلبه تحت 32K (chat عادي، RAG بمقاطع قصيرة)، أي موديل GQA كويس هيكفيك والفروق دي مش هتحس بيها. الفروق بتبدأ توجع فوق 128K: agents بـ history طويل، تحليل codebases، مستندات ضخمة.

**2. تكلفة الـ serving بتتحكم فيها إيه؟**
الـ KV cache هو اللي بيحدد أكبر batch size ينفع تشغله على نفس الكارت، والـ batch size هو اللي بيحدد الـ throughput والتكلفة لكل مليون token. موديل MLA أو hybrid linear ممكن يوفرلك أضعاف الـ concurrent users على نفس الـ hardware.

**3. الـ inference stack بتاعك بيدعم إيه؟**
GQA شغالة في كل حاجة (vLLM, SGLang, TensorRT-LLM) من زمان وبأقصى تحسين. MLA بقى دعمها ناضج. الـ sparse والـ linear variants الجديدة غالبا محتاجة kernels مخصوصة أو نسخ حديثة جدا من الـ frameworks. جرب على الـ stack بتاعك قبل ما تلتزم.

**4. بتعتمد على prefix caching؟**
لو عندك agents أو system prompts طويلة متكررة، الـ prefix caching بيوفر كتير. بعض ميكانيزمات الاختيار الديناميكي بتتعارض معاه أو بتعقده، ودي كانت واحدة من مشاكل MiniMax مع الـ efficient attention في M2. اسأل السؤال ده بالتحديد قبل اختيار موديل sparse.

**5. شغلك فيه exact retrieval طويل المدى؟**
لو الموديل لازم يرجع لتفصيلة مدفونة في أول الـ context بدقة (عقود قانونية، سجلات طبية، needle-in-haystack عمليا)، الـ full والـ sparse أأمن من الـ pure linear. الـ hybrids (3:1) بتحل ده لحد كبير، بس اختبرها على الـ workload بتاعك انت مش على البنشمارك.

**الخلاصة العملية بدون تنظير:** GQA هي الـ default الآمن، MLA لو التكلفة على نطاق واسع بتوجعك، sparse (DSA/MSA) لو الـ long context هو صلب شغلك، وhybrid linear لو الـ throughput على contexts ضخمة أهم عندك من آخر نقطة دقة في الاسترجاع.

---

## 8. خارج الـ Attention: إيه اللي اتغير كمان

الـ attention خدت الأضواء، لكن التحولات الأكبر في الموديلات الحديثة حصلت في أماكن تانية: الـ FFN، الـ optimizer، الـ precision، وشكل التدريب نفسه.

### 8.1 الـ MoE بقت الـ Default

الـ FFN layer، اللي فيها أغلب الـ parameters أصلا، اتقسمت لـ experts وبقى فيه router يختار مين يشتغل لكل token:

$$
y = \sum_{i \in \text{TopK}(s)} g_i \, E_i(x), \qquad s_i = \text{router}_i(x)
$$

التطورات الجوهرية مش في الفكرة، في التفاصيل:

- **Fine-grained + shared experts:** بدل experts قليلة كبيرة، عدد كبير من experts صغيرة (بيوصل 256+) مع expert مشترك شغال دايما لكل الـ tokens. دي وصفة DeepSeekMoE اللي الكل مشي عليها.
- **Auxiliary-loss-free load balancing:** الـ aux losses القديمة كانت بتوازن الحمل على حساب الأداء. البديل: bias لكل expert بيتظبط ديناميكيا، الاختيار بيتم على $s_i + b_i$ لكن الـ gate الفعلي بياخد $s_i$ الأصلية، فالتوازن بيحصل من غير ما الـ loss يتلوث.
- **الـ sparsity بتتوحش:** DeepSeek-V3 بـ 671B إجمالي / 37B active، Kimi K2 بـ 1T / 32B، MiniMax M2 بـ 230B / 9.8B. الإجمالي بيطلع والـ active بينزل، لأن الإجمالي بيحدد المعرفة والـ active بيحدد الفاتورة.
- وبحلول 2026 كل الإصدارات المفتوحة الجادة بقت MoE، والبحث اتنقل لسؤال الـ capacity allocation نفسه: تحط الـ parameters الزيادة في الـ experts ولا في حتت تانية زي الـ embeddings؟

### 8.2 الـ Optimizer اتغير لأول مرة من عقد

Muon بدأ ياخد مكان AdamW في الـ frontier training. الفكرة: بدل معاملة كل parameter كرقم مستقل، الـ update بتاع كل matrix بيتعمله orthogonalization تقريبي بـ Newton-Schulz iterations:

$$
M_t = \mu M_{t-1} + \nabla_W \mathcal{L}, \qquad W \leftarrow W - \eta \cdot \text{NewtonSchulz}(M_t)
$$

الـ orthogonalization بيخلي الـ update يشتغل في كل اتجاهات الـ matrix بقوة متوازنة بدل ما يتغلب عليه اتجاه واحد مسيطر. النتيجة عمليا: convergence أسرع بنفس الـ compute. Kimi K2 اتدرب بـ MuonClip على تريليون parameter وأثبت إن الطريقة scalable، والاتجاه بيكسب أرض في الموديلات اللي بعده.

### 8.3 الـ Precision نازلة: FP8 وبعدها FP4

- DeepSeek-V3 كان أول frontier model يتدرب native FP8 على نطاق كامل
- gpt-oss نزلت أوزان الـ MoE بتاعتها بصيغة MXFP4
- والموجة الحالية: FP4 quantization-aware training على أوزان الـ experts

كل نزلة precision معناها تقريبا نفس الموديل بنص ذاكرة وتكلفة تدريب أقل، بشرط تتحل مشاكل الاستقرار العددي، وده اللي أغلب الابتكار بيروح فيه.

### 8.4 Multi-Token Prediction (MTP)

بدل الـ next-token فقط، الموديل بيتدرب يتنبأ بكذا token قدام بـ heads إضافية:

$$
\mathcal{L} = \mathcal{L}_{\text{next}} + \lambda \sum_{k=2}^{K} \mathcal{L}_{t+k}
$$

فايدتين: الـ representations بتبقى أغنى أثناء التدريب لأن الموديل مجبر يخطط لقدام، والـ MTP head بيشتغل وقت الـ inference كـ speculative decoder جاهز، فبتاخد تسريع في الـ decoding من غير موديل draft منفصل.

### 8.5 الـ Normalization والـ Residual Stream

- **QK-Norm:** RMSNorm على الـ Q والـ K قبل حساب الـ attention:

$$
\text{softmax}\!\left(\frac{\text{Norm}(Q)\,\text{Norm}(K)^\top}{\sqrt{d}}\right)V
$$

حلت مشكلة انفجار الـ attention logits وشالت الحاجة للـ softcapping. موجودة في Gemma 3 وQwen3 وOLMo 2.

- **أماكن الـ norm:** رجعنا نلعب في الترتيب، وGemma 3 مثلا بتحط norm قبل وبعد كل block مع بعض.
- **Hyper-Connections:** إعادة تصميم الـ residual stream نفسه: بدل مسار واحد، عدة مسارات متوازية بأوزان متعلمة بتتحكم في إزاي كل layer تقرأ وتكتب فيهم. النسخ المقيدة منها بتظهر كوصفة استقرار للتدريب على مستوى التريليون parameter.

### 8.6 الـ Positional Encoding بيختفي جزئيا

- **NoPE layers:** طبقات كاملة من غير أي positional encoding، غالبا الـ global layers (زي iRoPE في Llama 4)، والملاحظة إن ده بيحسن الـ length generalization بدل ما يضره.
- **YaRN** بقت الوصفة القياسية لمد الـ context بعد التدريب بتعديل ترددات الـ RoPE بدل إعادة تدريب كاملة.

### 8.7 التغيير الأكبر: الـ Pipeline نفسه

- **Mid-training بقت مرحلة رسمية:** بين الـ pretraining والـ post-training، بيحصل مد للـ context، وannealing على داتا عالية الجودة، وحقن agentic data.
- **RLVR** (Reinforcement Learning with Verifiable Rewards) بعائلة GRPO وتفريعاتها (DAPO, GSPO) بقت المرحلة اللي بتصنع الفرق الفعلي بين الموديلات، وحصتها من إجمالي الـ compute بتكبر بسرعة.
- **Test-time compute بقى محور scaling مستقل:** نفس الموديل بيتحسن لما تديله وقت تفكير أطول، والموديلات بقت hybrid بمفتاح thinking / non-thinking بدل موديلين منفصلين.

### 8.8 Agentic-Native و Multimodal-Native

الـ tool calling والـ interleaved thinking (تفكير، استدعاء أداة، تفكير تاني) دخلوا في التدريب من بدري مش كـ fine-tuning لاحق. والموديلات الجديدة بتطلع multimodal من البداية، نص وصورة وفيديو وتشغيل desktop، بدل ما الرؤية تتركب كـ encoder ملزوق بعدين.

### 8.9 Diffusion LMs: المنافس الطالع

توليد النص بالـ denoising بدل الـ autoregressive: الموديل بيبدأ بـ tokens ملخبطة أو ممسوحة ويحسنها كلها بالتوازي على خطوات. الوعد: سرعة توليد أعلى بكتير لأن مفيش انتظار token ورا token. لسه في مرحلة إثبات الجدارة على المهام الطويلة، لكن بقت خط بحثي قائم بذاته.

### الخيط اللي رابط كل ده

نفس اللي شفناه في الـ attention: كل التغييرات دي بتخدم هدف واحد، ذكاء أكتر لكل دولار compute. الـ MoE بتقلل الـ FLOPs لكل token، الـ precision بتقلل تكلفة كل FLOP، الـ MTP والـ Muon بيقللوا خطوات التدريب المطلوبة، والـ RLVR بتحول compute رخيص نسبيا لقدرات جديدة. اللي بيكسب مش اللي عنده أكبر موديل، اللي بيطلع أكتر ذكاء من نفس الفلوس.

---

## 9. المراجع

### أوراق العائلة الأولى

- Attention Is All You Need (MHA): https://arxiv.org/abs/1706.03762
- Fast Transformer Decoding (MQA): https://arxiv.org/abs/1911.02150
- GQA: https://arxiv.org/abs/2305.13245
- DeepSeek-V2 (MLA + الـ ablations): https://arxiv.org/abs/2405.04434
- DeepSeek-V3 Technical Report: https://arxiv.org/abs/2412.19437

### أوراق العائلة التانية

- Longformer (أصل فكرة النوافذ): https://arxiv.org/abs/2004.05150
- Mistral 7B (SWA عمليا): https://arxiv.org/abs/2310.06825
- NSA (Native Sparse Attention): https://arxiv.org/abs/2502.11089
- MoBA: https://arxiv.org/abs/2502.13189
- DeepSeek-V3.2 (DSA): https://arxiv.org/abs/2512.02556
- MSA (MiniMax Sparse Attention): https://arxiv.org/abs/2606.13392
- إعلان MiniMax M3: https://www.minimax.io/blog/minimax-m3

### أوراق العائلة التالتة

- Transformers are RNNs (أساس الـ linear attention): https://arxiv.org/abs/2006.16236
- RWKV: https://arxiv.org/abs/2305.13048
- MiniMax-01 (Lightning Attention على نطاق ضخم): https://arxiv.org/abs/2501.08313
- MiniMax-M1: https://arxiv.org/abs/2506.13585
- Gated DeltaNet: https://arxiv.org/abs/2412.06464
- Kimi Linear (KDA): https://arxiv.org/abs/2510.26692
- Jamba: https://arxiv.org/abs/2403.19887

### قصة MiniMax

- MiniMax-M2 Series Technical Report (full attention): https://arxiv.org/abs/2605.26494

### مراجع القسم 8 (خارج الـ Attention)

- DeepSeekMoE (fine-grained + shared experts): https://arxiv.org/abs/2401.06066
- Auxiliary-Loss-Free Load Balancing: https://arxiv.org/abs/2408.15664
- Muon is Scalable for LLM Training (Moonlight): https://arxiv.org/abs/2502.16982
- DeepSeekMath (أصل GRPO): https://arxiv.org/abs/2402.03300
- DAPO: https://arxiv.org/abs/2503.14476
- YaRN: https://arxiv.org/abs/2309.00071
- Hyper-Connections: https://arxiv.org/abs/2409.19606
- LLaDA (diffusion LM): https://arxiv.org/abs/2502.09992
- الـ MTP والـ FP8 training موثقين بالتفصيل في تقرير DeepSeek-V3 المذكور فوق

### مراجع شاملة للتعمق

- Sebastian Raschka, A Visual Guide to Attention Variants in Modern LLMs: https://magazine.sebastianraschka.com/p/visual-attention-variants
- Efficient Attention Mechanisms for LLMs (survey): https://arxiv.org/abs/2507.19595
- Sebastian Raschka, A Technical Tour of DeepSeek V3 to V3.2: https://magazine.sebastianraschka.com/p/technical-deepseek

---

*آخر تحديث: أغسطس 2026. المجال بيتحرك بسرعة، فراجع تواريخ الأوراق قبل ما تبني عليها قرارات.*
