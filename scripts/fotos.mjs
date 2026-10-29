// Converte a primeira foto de cada pasta fotos/<slug>/ em src/assets/fotos/<slug>.jpg
// (redimensionada e otimizada). Fotos já convertidas não são refeitas, então
// para trocar uma foto basta apagar o .jpg correspondente em src/assets/fotos.
import { readdir, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ORIGEM = 'fotos';
const DESTINO = 'src/assets/fotos';
const EXTENSOES = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const existe = (p) => access(p).then(() => true, () => false);

await mkdir(DESTINO, { recursive: true });
const pastas = (await readdir(ORIGEM, { withFileTypes: true })).filter((d) => d.isDirectory() && d.name !== 'geral');

for (const pasta of pastas) {
  const destino = path.join(DESTINO, `${pasta.name}.jpg`);
  if (await existe(destino)) continue;
  const arquivos = (await readdir(path.join(ORIGEM, pasta.name)))
    .filter((f) => EXTENSOES.has(path.extname(f).toLowerCase()))
    .sort();
  if (arquivos.length === 0) continue;
  await sharp(path.join(ORIGEM, pasta.name, arquivos[0]))
    .rotate()
    .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(destino);
  console.log(`foto convertida: ${destino}`);
}
