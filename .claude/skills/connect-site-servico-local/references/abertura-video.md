# Abertura animada (cena 3D gravada em vídeo)

## Por que vídeo e não 3D ao vivo

Tentamos Three.js ao vivo na página. Visual ótimo, mas na primeira visita (que é TODA visita vinda de anúncio) o aparelho precisa baixar ~150 KB de JS e compilar os shaders: 1–3 s de tela preta, travadas no meio, e em PC sem placa de vídeo / Chrome no Windows a animação nem aparecia (passava do limite e pulava direto pro site). Pré-compilar e mostrar imagem de capa não resolveu. Solução final: **renderizar a cena offline, quadro a quadro, e entregar como vídeo**. Toca na hora em qualquer aparelho, com qualidade maior (desfoque de lente e água com refração que seriam caros ao vivo).

Resultado: vídeo começa a tocar em ~0,5 s; AV1 ~420 KB e H.264 ~690 KB por formato (celular 720×1280 e PC 1280×720), 6,4 s, 30 fps. A home ficou sem nenhum JS externo.

## Peças no repositório base

- `src/scripts/intro-scene.ts` — a cena Three.js (r186). Modo `record: { fps }`: passo fixo de 1/fps, `preserveDrawingBuffer`, BokehPass, água `MeshPhysicalMaterial` com `transmission`. Texturas com semente fixa (`rand()`), para cena determinística.
- `intro-render/` — página Vite separada (fora do build do site) que roda a cena em modo gravação.
- `scripts/gravar-abertura.mjs` — Playwright + SwiftShader: chama `__introRecord.step()`, captura `canvas.toDataURL()`, salva PNGs, gera H.264 (CRF 28), AV1 (SVT, CRF 42), capa `.webp` do quadro 0, e `src/data/abertura-revelacao.json` (linha de revelação por quadro).
- `src/components/IntroVideo.astro` — player inline no topo do `<body>` (slot `top`): escolhe AV1 via `navigator.mediaCapabilities.decodingInfo` (só se `smooth && powerEfficient`), senão H.264; legendas por `currentTime`; revelação do site com `mask-image` seguindo o cano que desce (mapeando a fração da tabela com o mesmo cálculo do `object-fit: cover`); fecha no `ended`; fallback de 2,5 s se não tocar (iOS em economia de energia bloqueia autoplay); botão Pular; roda 1× por sessão (`sessionStorage`), respeita `prefers-reduced-motion`.

## Como gravar

```bash
npx vite intro-render --port 5199 --strictPort &   # deixa rodando
node scripts/gravar-abertura.mjs m   # celular (~5 min de preparo + ~6 min)
node scripts/gravar-abertura.mjs d   # computador
```

No ambiente cloud sem GPU o PRIMEIRO quadro demora 4–15 min (SwiftShader compila shaders); depois ~2 s/quadro. Rode em segundo plano (`run_in_background`) e acompanhe pelo número de PNGs em `.gravacao-<m|d>/`. Playwright não é dependência do projeto: use o global trocando o import por caminho absoluto numa cópia do script no scratchpad.

## Adaptar para outro nicho

Mantenha o roteiro (problema → técnico/ferramenta resolve → "chegamos em X minutos" → cena desce e revela o site) e troque objetos/cenário em `intro-scene.ts`. Lições:
- Cenário tem que ser reconhecível (banheiro com azulejo, pia, ralo); fundo cinza liso parece esgoto.
- Câmera em movimento (close → giro → lateral → plano frontal) dá o ar "imersivo".
- Parede/piso largos (40 unidades) para não aparecer vazio preto em tela larga; considerar teto e parede lateral.
- Textos (legendas) no centro da tela (~54% da altura), grandes, com sombra radial atrás.
- Revise quadro a quadro antes de publicar (gere mosaico dos PNGs).
