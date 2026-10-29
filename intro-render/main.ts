// Estúdio de gravação da abertura: roda a cena em modo de gravação (passo fixo,
// qualidade máxima). O script scripts/gravar-abertura.mjs avança quadro a quadro.
// ?preview grava sem vidro com refração nem desfoque (revisão rápida de enquadramento).
import { startIntro } from '../src/scripts/intro-scene';

const canvas = document.getElementById('c') as HTMLCanvasElement;
const state = window as unknown as { __introReady: boolean; __introReveal: number; __introStage: string };
state.__introReveal = -1;
startIntro(
  canvas,
  {
    onReady: () => (state.__introReady = true),
    onStage: (s) => (state.__introStage = s),
    // raio do furo de revelação, como fração da altura do quadro
    onReveal: (frac) => (state.__introReveal = frac),
  },
  { record: { fps: 30, preview: new URLSearchParams(location.search).has('preview') } },
);
