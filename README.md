# Elite Refrigeração · site

Site institucional com foco em SEO local (conserto de geladeira, freezer e câmara fria 24h em Fortaleza). Feito com [Astro](https://astro.build), gera páginas estáticas e é publicado na Vercel. Estrutura herdada do site da Dutra Hidráulica.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Telefone/WhatsApp, nome, tempo de chegada, garantia, IDs do Google | `src/data/site.ts` |
| Serviços (textos, FAQ, SEO) | `src/data/servicos.ts` |
| Bairros atendidos | `src/data/bairros.ts` |
| Fotos reais | `fotos/<slug-do-serviço>/` (ver `fotos/README.md`) |
| Posts do blog | `src/content/blog/*.md` |
| Abertura animada (cena 3D da geladeira) | `src/scripts/intro-scene.ts` |

Cada serviço vira `/servicos/<slug>/`, cada bairro vira `/conserto-de-geladeira-em-<slug>/` e cada post vira `/blog/<arquivo>/`. O sitemap é gerado automaticamente.

## Abertura em vídeo

A cena 3D não roda no site: ela é gravada em vídeo (`public/intro/`) para abrir rápido em qualquer celular.
Para regravar depois de mudar `src/scripts/intro-scene.ts`:

```bash
npx vite intro-render --port 5199 --strictPort &
node scripts/gravar-abertura.mjs m   # celular
node scripts/gravar-abertura.mjs d   # computador
```
