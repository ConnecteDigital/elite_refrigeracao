import { site } from './site';
import { bairros } from './bairros';
import type { Faq, Servico } from './servicos';

const businessId = `${site.url}/#empresa`;

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': businessId,
    name: site.name,
    alternateName: site.legalName,
    url: site.url,
    logo: `${site.url}/logo.png`,
    image: `${site.url}/og.jpg`,
    telephone: `+${site.phoneDigits}`,
    description: site.description,
    priceRange: '$$',
    // Atendimento sem loja: só a cidade, sem endereço completo
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: 'BR',
    },
    areaServed: [
      { '@type': 'City', name: 'Fortaleza' },
      ...bairros.map((b) => ({ '@type': 'Place', name: `${b.nome}, Fortaleza - CE` })),
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  };
}

export function faqSchema(faq: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: new URL(it.path, site.url).href,
    })),
  };
}

export function serviceSchema(s: Servico, area = 'Fortaleza - CE') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.nome,
    serviceType: s.keyword,
    description: s.metaDescription,
    provider: { '@id': businessId },
    areaServed: { '@type': 'Place', name: area },
  };
}
