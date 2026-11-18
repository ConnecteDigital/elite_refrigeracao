import type { ImageMetadata } from 'astro';

// Fotos reais, uma por pasta (src/assets/fotos/<slug>.jpg).
// Os originais ficam em fotos/<slug>/ na raiz do repositório.
const arquivos = import.meta.glob<{ default: ImageMetadata }>('../assets/fotos/*.jpg', { eager: true });

const alts: Record<string, string> = {
  equipe: 'Equipe da Elite Refrigeração uniformizada ao lado do carro da empresa em Fortaleza',
  'conserto-de-geladeira': 'Técnico da Elite Refrigeração medindo a pressão do gás no compressor de uma geladeira',
  'troca-de-compressor': 'Compressor antigo retirado de uma geladeira durante a troca, com maçarico e ferramentas no chão',
  atendimento: 'Dois técnicos da Elite Refrigeração trabalhando no compressor de uma geladeira',
  'conserto-de-freezer': 'Compressor, filtro secador soldado e termostato de um freezer em conserto',
  'carga-de-gas': 'Manifold ligado na válvula do compressor para medir a pressão e fazer a carga de gás',
  'vazamento-de-gas-e-solda': 'Parte de trás de uma geladeira com o filtro secador novo e o material de solda',
  'manutencao-preventiva': 'Mangueira do manifold ligada no compressor Embraco para medir a pressão do gás',
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
