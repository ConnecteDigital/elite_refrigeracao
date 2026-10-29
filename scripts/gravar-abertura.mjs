// Grava a abertura 3D em vídeo (um arquivo para celular e outro para computador).
//
// Uso:  npx vite intro-render --port 5199  (em outro terminal)
//       node scripts/gravar-abertura.mjs [m|d]
// Requer Playwright com Chromium e ffmpeg instalados na máquina.
// Saída: public/intro/abertura-<m|d>.mp4 (H.264), abertura-<m|d>-av1.mp4, abertura-<m|d>.webp
// e src/data/abertura-revelacao.json
import { chromium } from 'playwright';
import { mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const FORMATOS = {
  m: { width: 720, height: 1280 },
  d: { width: 1280, height: 720 },
};
const alvo = process.argv[2] ?? 'm';
const { width, height } = FORMATOS[alvo];
const pasta = path.resolve(`.gravacao-${alvo}`);
await rm(pasta, { recursive: true, force: true });
await mkdir(pasta, { recursive: true });

const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({ viewport: { width, height } });
page.on('pageerror', (e) => console.error('erro na página:', e.message));
await page.goto('http://localhost:5199/');
await page.waitForFunction(() => window.__introReady === true, null, { timeout: 0 });

const revelacao = [];
const inicio = Date.now();
for (let i = 0; ; i++) {
  const { done, png, reveal } = await page.evaluate(() => {
    const r = window.__introRecord.step();
    const png = document.querySelector('canvas').toDataURL('image/png');
    return { done: r.done, png, reveal: window.__introReveal };
  });
  await writeFile(path.join(pasta, `q${String(i).padStart(4, '0')}.png`), Buffer.from(png.split(',')[1], 'base64'));
  revelacao.push(Number(reveal.toFixed(4)));
  if (i % 10 === 0) console.log(`quadro ${i} (${Math.round((Date.now() - inicio) / 1000)} s)`);
  if (done) break;
}
await browser.close();

await mkdir('public/intro', { recursive: true });
const entrada = ['-y', '-loglevel', 'error', '-framerate', '30', '-i', path.join(pasta, 'q%04d.png')];
// H.264: toca em qualquer aparelho
execFileSync('ffmpeg', [...entrada, '-c:v', 'libx264', '-preset', 'veryslow', '-crf', '28', '-pix_fmt', 'yuv420p',
  '-profile:v', 'main', '-movflags', '+faststart', '-an', `public/intro/abertura-${alvo}.mp4`]);
// AV1: metade do tamanho, usado quando o aparelho decodifica por hardware
execFileSync('ffmpeg', [...entrada, '-c:v', 'libsvtav1', '-preset', '5', '-crf', '42', '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart', '-an', `public/intro/abertura-${alvo}-av1.mp4`]);
// capa: o primeiro quadro, mostrado só até o vídeo começar
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(pasta, 'q0000.png'), '-quality', '70',
  `public/intro/abertura-${alvo}.webp`]);
console.log('vídeos e capa: public/intro/abertura-' + alvo + '.*');

// raio do círculo de revelação por quadro (fração da altura), usado pelo site para revelar a página
const arquivoJson = 'src/data/abertura-revelacao.json';
let dados = {};
try {
  dados = JSON.parse(await readFile(arquivoJson, 'utf8'));
} catch {}
dados[alvo] = { fps: 30, width, height, reveal: revelacao };
await writeFile(arquivoJson, JSON.stringify(dados) + '\n');
console.log('revelação:', arquivoJson);
