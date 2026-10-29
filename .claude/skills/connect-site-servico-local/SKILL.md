---
name: connect-site-servico-local
description: Cria site de prestador de serviço local (encanador, desentupidora, eletricista, chaveiro, dedetizadora etc.) focado em Google Ads e SEO local, no padrão Connect Digital, e monta/otimiza a campanha de Google Ads do cliente. Use quando pedirem "site novo pra cliente", "site igual ao da Dutra Hidráulica", "site de encanador/desentupidora/serviço 24h", landing page para Google Ads de serviço local, abertura animada/3D do site, análise de termos de pesquisa, lista de palavras-chave negativas, títulos, descrições e sitelinks de anúncio, ou relatório de resultado de campanha para o cliente.
---

# Site de serviço local + Google Ads (padrão Connect Digital)

Playbook construído no projeto **Dutra Hidráulica** (repositório `ConnecteDigital/Hidraulica_Dutra`, site hidraulicadutra.com.br). Resultado de referência: CPA caiu de R$ 72 para ~R$ 33 e o CPC de R$ 27 para R$ 17 no primeiro dia da campanha nova.

Fale com o usuário em português do Brasil, direto e sem jargão. Ele é gestor de tráfego, não programador.

## Fluxo de trabalho

1. **Briefing** — peça tudo de uma vez (lista em `references/site.md#briefing`). Não comece sem: nome, serviços que FAZ e que NÃO FAZ, regiões, WhatsApp/telefone, logo, diferenciais (24h, tempo de chegada, garantia), domínio.
2. **Site** — parta do repositório `ConnecteDigital/Hidraulica_Dutra` como base (adicione o repo à sessão e copie a estrutura) em vez de começar do zero. Troque só os dados: `src/data/site.ts`, `servicos.ts`, `bairros.ts`, `fotos.ts`, logo, fotos, textos da home. Detalhes em `references/site.md`.
3. **Fotos reais** — o cliente sobe em `fotos/<slug-do-serviço>/`; `scripts/fotos.mjs` otimiza no build. Confira cada foto (foto repetida, foto no serviço errado, marca d'água).
4. **Abertura animada** — cena 3D gravada em vídeo, NÃO 3D ao vivo. Ver `references/abertura-video.md` (inclui por quê).
5. **Publicar** — Vercel ligada ao GitHub; cada push na branch publica. Domínio no projeto da Vercel.
6. **Rastreamento** — instalar GTM (head + noscript no body) e/ou gtag que o cliente mandar. Conversões = clique em `api.whatsapp.com` e em `tel:`. Ver `references/google-ads.md#conversoes`.
7. **Google Ads** — analisar relatório de termos de pesquisa da conta antiga (`scripts/analisar_termos.py`), gerar negativas nas 3 correspondências, palavras-chave, 15 títulos, 4 descrições, 6 sitelinks, e relatório antes × depois. Ver `references/google-ads.md`.

## Regras que valem sempre

- **Pergunte o que o cliente NÃO faz** antes de escrever textos, páginas ou palavras-chave. Na Dutra: marido de aluguel, pressurizador, caça-vazamento, aquecedor — cada um gerou chamado errado e dinheiro perdido.
- **Não invente promessas** ("orçamento antes de começar", "resolvido na primeira visita") sem o cliente confirmar. Diga quando um texto é sugestão sua.
- **Velocidade acima de tudo**: o tráfego é de Google Ads, então toda visita é a primeira visita (sem cache). Nada pesado no carregamento: sem bibliotecas 3D na página, sem imagens enormes, JS mínimo.
- **WhatsApp**: sempre `https://api.whatsapp.com/send?phone=55DDDNUMERO&text=...` com mensagem que cita o nome da empresa.
- **Nome da empresa** num lugar só (`site.name` em `src/data/site.ts`); se mudar, procure também em textos, blog e `alt` das fotos.
- **Teste no celular** (390px e 360px) antes de cada push: sem rolagem lateral, botões grandes, barra fixa Ligar/WhatsApp embaixo.
- Commits e explicações em português.
