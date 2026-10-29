# Site — estrutura, design e SEO local

## Briefing

Peça numa mensagem só:
- Nome da empresa (como aparece no logo) e domínio
- Serviços que faz (lista completa) e **serviços que NÃO faz**
- Diferenciais: 24h? Tempo de chegada (ex.: "chegamos em 20 minutos")? Garantia?
- Regiões/bairros atendidos e regiões de foco
- WhatsApp e telefone (os dois), horário
- Logo (PNG/SVG; se vier com fundo preto, recortar mantendo o interior do selo)
- Fotos reais dos serviços (subir no Git em `fotos/<slug>/`)
- Concorrentes e sites de referência (prints, porque o ambiente pode bloquear acesso aos sites)
- Tem conta Google Ads? Mandar relatório de termos de pesquisa dos últimos 7–90 dias.

## Stack

Astro 5 estático + Vercel. Sem framework de UI. Fontes via @fontsource (Barlow Condensed nos títulos, Inter no texto). Imagens com `astro:assets`. `@astrojs/sitemap`. Tudo que muda por cliente fica em `src/data/`.

| Arquivo | O que tem |
|---|---|
| `src/data/site.ts` | nome, telefone, tempo de chegada, descrição, `whatsappUrl()`, IDs de GTM/gtag |
| `src/data/servicos.ts` | cada serviço: slug, nome, keyword (H1), resumo, metaDescription, ícone, intro, sinais, comoFazemos, FAQ |
| `src/data/bairros.ts` | bairro, zona, texto exclusivo, vizinhos (gera `/encanador-em-<bairro>/`) |
| `src/data/fotos.ts` | `alt` de cada foto por slug |
| `src/data/schema.ts` | JSON-LD: LocalBusiness (tipo do nicho, ex. `Plumber`), FAQPage, BreadcrumbList, Service |
| `src/components/IntroVideo.astro` | abertura em vídeo |
| `src/components/GoogleTagManager.astro`, `GoogleTag.astro` | rastreamento |

Ao trocar de nicho, renomeie a rota de bairro (`encanador-em-[slug].astro` → `desentupidora-em-[slug].astro` etc.) e os textos fixos das páginas.

## Páginas

- **Home**: topo com foto real escurecida de fundo (técnico trabalhando), tudo centralizado: eyebrow, H1 "Serviço 24 horas em Cidade: chegamos em até X minutos", descrição curta (1 frase), botões WhatsApp + Ligar, 3 destaques lado a lado (24h, chegada, garantia). Depois: faixa de confiança, grade de serviços com foto, "como funciona" (3 passos), por que nós (foto + 4 diferenciais), CTA, trabalhos realizados (galeria), áreas atendidas por zona, blog, FAQ, CTA final.
- **Serviço** (`/servicos/<slug>/`): H1 = keyword, intro, foto real, "quando chamar", "como fazemos", por que nós, FAQ, links para todos os bairros, galeria de outros serviços, sidebar com CTA.
- **Bairro** (`/<servico>-em-<bairro>/`): texto exclusivo do bairro (evita conteúdo duplicado), vizinhos, FAQ local, grade de serviços.
- **Áreas atendidas**, **Blog** (3 posts iniciais úteis: "furei o cano", "como saber se tem vazamento" etc.), **404**.
- Cabeçalho com submenus (Serviços e Áreas) por hover no desktop e `<details>` no celular; barra fixa "Ligar | WhatsApp" no rodapé do celular; botão redondo do WhatsApp no desktop.

## SEO local

Title até ~60 caracteres com "Serviço + Cidade/Bairro + 24h + Nome". Meta description com chegada e garantia. Canonical, OG image, sitemap, robots.txt, JSON-LD em todas as páginas. Sem endereço quando o cliente não tem loja (só cidade + areaServed).

## Fotos

`scripts/fotos.mjs` roda no `prebuild`: pega a primeira foto de cada `fotos/<slug>/` e gera `src/assets/fotos/<slug>.jpg` (1600px, q85) se ainda não existir. Para trocar uma foto, apague o jpg gerado. Corte marcas d'água ("Shot on…") antes. Se duas pastas tiverem a mesma foto, avise o usuário.

## Verificação antes de cada push

`npx astro check` (0 erros), `npm run build`, screenshots com Playwright em 390×844, 360×740 e 1366×800, checar rolagem lateral (`scrollWidth > innerWidth`). Chromium fica em `/opt/pw-browsers`; importe o Playwright global por caminho absoluto.
