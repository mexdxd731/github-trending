# discord-verify

Verificação de membros para bots **discord.py** contra spam, contas fake, alts de banidos e raids.

Quem entra no servidor só vê o canal de verificação. A pessoa aperta **Verificar**, entra com o Discord
(OAuth2) e o bot confere o email, o IP, a localização e se ela usa VPN. Se estiver tudo certo, ela ganha o
cargo verificado na hora. Se algo parecer estranho, o caso vai para a staff decidir com um botão:
**Banir**, **Liberar** ou **Analisar**.

## O que ele detecta

| Alerta | Quando dispara |
|---|---|
| IP banido | Mesmo IP de alguém já banido. No IPv6, compara o bloco /64, porque o final do endereço muda sozinho. |
| Email banido / parecido | Email igual ou parecido com o de um banido (`joaosilva` × `joaosilva2`). No Gmail, ignora pontos e `+tag`. |
| Email descartável | Domínio de email temporário (lista com mais de 100 mil domínios, atualizada toda semana) ou domínio que você bloqueou. |
| Sem email / não verificado | Conta do Discord sem email, ou com email não confirmado. |
| VPN / proxy / datacenter | IP de VPN, proxy ou hospedagem (via [ip-api.com](https://ip-api.com)). |
| IP compartilhado | Outra conta se verificou do mesmo IP nos últimos 30 dias. |

Além disso:

- Quando alguém é **banido por qualquer meio**, o IP e o email dele entram sozinhos na lista negra. Assim, a
  conta alternativa cai na verificação.
- **Dois níveis de privacidade:** o canal de logs mostra email e IP completos (só para o dono). O canal de
  suspeitos mostra tudo mascarado (`j***a@gmail.com`, `189.45.*.*`) para a staff.
- O botão **Analisar** abre um canal privado (pessoa + staff) e salva a conversa nos logs quando é fechado.
- Os dados são apagados depois de 90 dias, menos os de contas banidas.

## Como funciona

```
membro ──► #verificação ──► botão "Verificar" ──► página (seu domínio, HTTPS)
                                                    │  login OAuth2 do Discord (identify + email)
                                                    ▼
                                    bot: email + IP + geolocalização/VPN + lista negra
                                          │                         │
                                     tudo limpo                  suspeito
                                          ▼                         ▼
                                  cargo Verificado       #suspeitos: Banir · Liberar · Analisar
```

A página roda **dentro do próprio bot** (aiohttp, em `127.0.0.1:8095`). Você só precisa expor essa porta com
HTTPS: Cloudflare Tunnel, nginx ou Caddy.

## Instalação

### 1. Developer Portal

Em <https://discord.com/developers/applications>, abra a aplicação do seu bot:

1. **Bot → Privileged Gateway Intents:** ligue **Server Members Intent**.
2. **OAuth2:** copie o **Client ID** e gere/copie o **Client Secret**.
3. **OAuth2 → Redirects:** adicione `https://verify.seudominio.com/callback`, trocando pelo seu domínio.

### 2. Servidor do Discord

1. Crie o cargo **✅ Verificado**.
2. Arraste o **cargo do bot para cima** do cargo Verificado. Se não fizer isso, o bot não consegue dar o cargo.
3. Crie os canais:
   - `#verificação`: `@everyone` só lê. É aqui que vai o painel.
   - `#verify-logs`: só o dono vê (email e IP completos).
   - `#suspeitos`: só a staff vê.
4. Bloqueie o resto para quem não é verificado. Em cada categoria, tire **Ver canal** de `@everyone` e dê
   **Ver canal** para **✅ Verificado**.

O bot precisa das permissões **Gerenciar cargos**, **Gerenciar canais**, **Banir membros** e **Ver registro
de auditoria**.

### 3. Colocar no seu bot

Copie a pasta `verify/` para dentro do projeto do bot, instale as dependências
(`pip install -r requirements.txt`) e carregue a extensão:

```python
intents = discord.Intents.default()
intents.members = True                 # obrigatório

class Bot(commands.Bot):
    async def setup_hook(self):
        await self.load_extension("verify")
        await self.tree.sync()         # registra /verify e /blacklist
```

Preencha as variáveis de ambiente a partir do `.env.example`. Se o bot já usa `python-dotenv`, basta
acrescentar as linhas no `.env` dele. Para testar isolado antes de mexer no seu bot, rode o `example_bot.py`.

### 4. HTTPS

Exemplo com Cloudflare Tunnel (o padrão `VERIFY_IP_HEADER=CF-Connecting-IP` já é para ele):

```yaml
# ~/.cloudflared/config.yml
ingress:
  - hostname: verify.seudominio.com
    service: http://127.0.0.1:8095
  - service: http_status:404
```

Com nginx ou Caddy, use `VERIFY_IP_HEADER=X-Real-IP` e repasse esse cabeçalho no proxy.

> **Importante:** deixe a porta 8095 escutando só em `127.0.0.1`. Se ela ficar aberta na internet, qualquer
> pessoa pode forjar o cabeçalho de IP.

### 5. Usar

No `#verificação`, rode `/verify panel`. Pronto.

## Comandos

| Comando | Quem | O que faz |
|---|---|---|
| `/verify panel` | admin | Posta o painel com o botão **Verificar** no canal atual. |
| `/verify info @pessoa` | dono | Mostra as últimas verificações da pessoa (email, IP, local, alertas). |
| `/blacklist add ip\|email\|domain <valor> [motivo]` | dono | Bloqueia um IP, email ou domínio. |
| `/blacklist remove …` | dono | Tira da lista. |
| `/blacklist list` | dono | Mostra a lista negra. |

## Configuração

Todas as variáveis estão comentadas no [`.env.example`](.env.example). As obrigatórias são:
`DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `VERIFY_URL`, `VERIFY_GUILD_ID`, `VERIFY_ROLE_ID`,
`VERIFY_LOG_CHANNEL_ID` e `VERIFY_SUSPECT_CHANNEL_ID`.

Os dados ficam em `data/verify.db` (SQLite, permissão 600). **Não suba essa pasta para o GitHub.** Ela já está
no `.gitignore`.

## Privacidade (LGPD / GDPR)

O bot guarda email, IP e localização aproximada de quem se verifica. A página tem um aviso em `/privacy`
explicando o que é coletado, para quê e por quanto tempo. Avise isso também no servidor e atenda pedidos de
remoção. Os dados servem só para proteger o servidor: não use para outra coisa.

O plano gratuito do ip-api.com aceita 45 consultas por minuto e é só para uso não comercial. Para um servidor
grande ou comercial, troque `GEO_URL` em `verify/intel.py` por um serviço pago.

## Testes

```bash
pip install -r requirements-dev.txt
pytest
```

## Licença

MIT
