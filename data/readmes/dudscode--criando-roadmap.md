# Prompt para criar seu roadmap de estudos

Um prompt reutilizável para montar, com uma IA, um roadmap de estudos que **não é genérico** — ele parte do seu contexto real, é validado por quem entende do assunto, e tem critérios que impedem você de se enganar sobre o próprio progresso.

Funciona para qualquer transição de carreira ou skill nova. Copie, preencha os `[colchetes]` e cole na IA.

---

## Como usar — em 4 movimentos

| Passo | O que você faz |
|-------|----------------|
| **1. Junte os insumos** | O que seu mentor te disse, o que uma vaga pede, os gaps que você já conhece |
| **2. Cole o Prompt 1** | A IA te faz perguntas antes de montar qualquer coisa — responda com honestidade |
| **3. Valide com um mentor** | Leve a primeira versão para alguém que vive aquele contexto, e volte com o feedback (Prompt 2) |
| **4. Execute** | Estude → resuma → seja avaliado, bloco a bloco. Com projeto e sabotagem, se fizer sentido |

> **Importante:** não pule o passo 3. É a validação que separa um plano bonito de um plano que faz sentido.

---

## PROMPT 1 — Criar a primeira versão

```
Quero que você seja um especialista em montar roadmaps de estudo e me ajude
a criar o meu. Antes de montar qualquer coisa, leia todo o contexto abaixo.

## MEU CONTEXTO

- Hoje eu sou/trabalho como: [seu papel atual]
- Meu objetivo é: [onde você quer chegar, o mais concreto possível]
- Por que: [a vaga, o projeto, a promoção, a mudança de área]

## O QUE EU JÁ SEI

- Domino: [tecnologias/assuntos que você já usa no dia a dia]
- Tenho noção, mas raso: [o que você já viu mas não domina]
- Nunca mexi: [o que é totalmente novo]
- Como eu costumo estudar: [praticando / lendo / vídeo / curso / mão na massa]

## A ORIENTAÇÃO QUE RECEBI (literal, não reescrevi)

"[cole aqui, sem editar, o que seu mentor/especialista te disse sobre como
as coisas funcionam de verdade no ambiente onde você quer atuar]"

## OS GAPS QUE EU JÁ CONHEÇO

- [o que você sabe que trava — pode vir de autopercepção, feedback de
  entrevista, avaliação de desempenho, processo de nivelamento]

## MINHAS RESTRIÇÕES

- Tempo disponível: [horas por semana, e se você trabalha em paralelo]
- Prazo que eu imagino: [ex: 4 meses, 6 meses]
- Orçamento para cursos/infra: [se houver]

---

## O QUE EU QUERO DE VOCÊ

**Antes de montar o roadmap, me faça perguntas.** Quantas você precisar, para
calibrar o plano à minha realidade — meu nível real em cada tópico, o que
priorizar, o que cortar. Não presuma nada: pergunte.

Depois que eu responder, monte o roadmap seguindo estas regras:

1. **Divida em etapas mensais** (ou blocos), respeitando o prazo que eu dei.
   Cada etapa depende da anterior e tem um foco verbal claro e progressivo —
   por exemplo: "entender" → "rodar e modificar" → "diagnosticar" → "defender".

2. **Dentro de cada etapa, crie blocos menores** (ex: semanas). Cada bloco
   precisa dos mesmos 4 arquivos:

   - `conteudo.md`  — o que estudar naquele bloco. **Inclua indicações reais
                      de estudo:** vídeos/canais, artigos, documentação oficial,
                      cursos. Diga o que ler/assistir e em que ordem, e proponha
                      exercícios práticos.
   - `resumo.md`    — template onde eu anoto o que aprendi COM MINHAS PALAVRAS
                      (não copiando definição), o que me confundiu e o que
                      ainda não ficou claro.
   - `avaliacao.md` — perguntas sobre o tema do bloco, com critérios rigorosos.
                      Resposta certa sem justificativa NÃO passa.
   - `feedback.md`  — onde você registra a correção da minha avaliação: o que
                      passou, o que ficou raso, o que revisar antes de avançar.

3. **Se o roadmap envolver construir algo**, crie um projeto integrador que
   atravesse várias etapas, em fases. Ele deve ter restrições realistas
   (tempo, limites, regras) que me forcem a fazer trade-offs e defender
   decisões — não basta "funcionar".

4. **Se houver projeto, inclua o Modo Sabotagem** (protocolo abaixo) e diga
   em quais momentos do roadmap ele deve rodar.

5. **Termine com uma avaliação final** de defesa: eu justifico as decisões que
   tomei, resolvo um cenário sob pressão e faço uma autoavaliação honesta.
   Não é sobre escrever mais código/conteúdo — é sobre sustentar o que fiz.

6. **Gere também:**
   - um `README.md` com a visão geral, a ordem das etapas e como usar
   - um `progresso.md` onde eu marco o que já concluí
   - uma lista de perguntas que eu devo levar ao meu mentor para validar
     este plano ANTES de eu começar

7. **Deixe claro o que está FORA do escopo.** Um bom roadmap diz o que você
   não vai aprender e por quê.

Pergunte agora o que precisar antes de começar.
```

---

## PROMPT 2 — Ajustar após validar com o mentor

Depois de levar a v1 para alguém que vive aquele contexto:

```
Levei o roadmap para validação com [mentor/especialista/pessoa da área].
O retorno foi:

- Sobre o prazo: [o que disseram]
- Sobre a ordem dos temas: [o que disseram]
- O que falta / o que veem na prática toda semana e não está no plano: [...]
- O que está sobrando ou fundo demais: [...]
- Outras observações: [...]

Ajuste o roadmap incorporando esse feedback. Onde você discordar da sugestão,
me diga e explique o porquê — não aceite tudo automaticamente.
```

> **Cuidado com informação sensível:** detalhes internos do seu ambiente de destino — nomes de sistemas, arquitetura fechada, bibliotecas proprietárias — discuta **só com o mentor**, nunca cole na IA. No roadmap, eles viram categorias genéricas.

---

## PROMPT 3 — Rodar o Modo Sabotagem

Só faz sentido se o seu roadmap tiver um projeto prático. O objetivo é treinar o músculo de **diagnosticar um problema que você não sabe qual é** — diferente de consertar um bug que você mesmo escreveu.

```
Quero rodar uma sessão de Modo Sabotagem no meu projeto.

Regras:
1. Meu projeto está funcionando e commitado. Crie uma branch separada e
   injete de 1 a 3 falhas realistas de nível [1 = lógica/código |
   2 = configuração | 3 = infraestrutura].
2. NÃO me diga o que você fez.
3. Me entregue apenas o SINTOMA, como se fosse um alerta real
   (ex: "usuários relatando erro no fluxo X desde as 14h").
4. Escolha falhas que acontecem de verdade e produzem sintomas
   observáveis — nada de pegadinha esotérica.

Eu vou diagnosticar sozinho, com timebox de 30–45 min. Não vou olhar o
diff até fechar o diagnóstico e escrever meu relatório de incidente:
sintoma → hipóteses (inclusive as descartadas) → evidências → causa raiz →
correção → prevenção.

Se eu travar, me dê dicas em estágios, uma de cada vez:
  1ª dica: em qual camada está o problema
  2ª dica: qual ferramenta revelaria a evidência
  3ª dica: qual componente olhar

Depois que eu entregar o relatório, revise como um post-mortem: as
evidências que eu levantei sustentam a causa raiz? Achar por sorte não conta.
```

**Regra de ouro:** primeiro você quebra *sabendo* o que quebrou — para aprender a assinatura de cada sintoma. Só depois vem a sabotagem às cegas.

---

## PROMPT 4 — Ser avaliado ao fim de cada bloco

```
Terminei o bloco [nome]. Segue meu resumo:

[cole seu resumo.md preenchido]

Me avalie usando o avaliacao.md deste bloco. Seja rigoroso:
- Resposta certa sem justificativa não passa
- Aponte onde eu decorei em vez de entender
- Se eu não souber algo, quero saber disso agora, não no final

Escreva o resultado no feedback.md: o que passou, o que ficou raso, e o
que eu preciso revisar antes de avançar para a próxima etapa.
```

---

## O que sai no final

```
roadmap/
├── README.md              # visão geral: etapas, ordem, como usar
├── modo-sabotagem.md      # o protocolo do diagnóstico às cegas
├── progresso.md           # onde você marca o que já fez
│
├── etapa-1/
│   ├── README.md          # o foco desta etapa
│   └── bloco-1/
│       ├── conteudo.md    # o que estudar + vídeos, artigos, cursos
│       ├── resumo.md      # você anota o que aprendeu, com suas palavras
│       ├── avaliacao.md   # perguntas sobre o tema (o freio)
│       └── feedback.md    # a correção da sua avaliação
│
├── etapa-2/ …             # mesma estrutura, uma por etapa
│
└── projeto-integrador/    # o projeto que junta tudo
    ├── fase-1.md … fase-N.md
    └── avaliacao-final.md # a defesa do fim
```

---

## Checklist — seu roadmap está pronto?

- [ ] Parti de insumos reais e específicos meus — não de um roadmap pronto da internet
- [ ] Colei a orientação do mentor **literal**, sem reescrever
- [ ] Pedi para a IA **me fazer perguntas** antes de gerar o plano
- [ ] As etapas são dependentes e cada uma tem um foco verbal claro
- [ ] **Validei com um mentor** antes de estudar a primeira linha
- [ ] Separei o que é sensível/interno — isso vai só para o mentor
- [ ] Cada bloco tem conteúdo, resumo, avaliação e feedback
- [ ] O `conteudo.md` indica material de verdade: vídeos, artigos, docs, cursos
- [ ] Tenho um projeto prático com restrições que forçam decisões
- [ ] Planejei rodadas de Modo Sabotagem (se houver projeto)
- [ ] Defini uma avaliação final de defesa, não de produzir mais coisa
- [ ] Vou registrar meu progresso e ser honesto sobre o que ainda trava

---

*Método aberto — adapte, quebre e compartilhe.*
