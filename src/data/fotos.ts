import type { ImageMetadata } from 'astro';

// Fotos reais, uma por pasta (src/assets/fotos/<slug>.jpg).
// Os originais ficam em fotos/<slug>/ na raiz do repositório.
const arquivos = import.meta.glob<{ default: ImageMetadata }>('../assets/fotos/*.jpg', { eager: true });

const alts: Record<string, string> = {
  equipe: 'Equipe da Elite Refrigeração uniformizada ao lado do carro da empresa em Fortaleza',
  'conserto-de-geladeira': 'Técnico da Elite Refrigeração medindo a pressão do gás no compressor de uma geladeira',
  'troca-de-compressor': 'Dois técnicos da Elite Refrigeração trocando o compressor de uma geladeira',
};

export interface Foto {
  src: ImageMetadata;
  alt: string;
}

export function fotoDoServico(slug: string): Foto | undefined {
  const mod = arquivos[`../assets/fotos/${slug}.jpg`];
  if (!mod) return undefined;
  return { src: mod.default, alt: alts[slug] ?? 'Serviço realizado pela Elite Refrigeração em Fortaleza' };
}
