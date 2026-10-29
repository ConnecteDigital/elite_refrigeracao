// Dados centrais da empresa. Altere aqui e o site inteiro é atualizado.

// Formato: 55 + DDD + número, só dígitos
const PHONE_DIGITS = '5585985864441';

export const site = {
  name: 'Elite Refrigeração',
  // como aparece no logo novo
  legalName: 'Elite da Refrigeração',
  url: 'https://www.eliterefrigeracaofortaleza.com.br',
  city: 'Fortaleza',
  state: 'CE',
  phoneDigits: PHONE_DIGITS,
  // Exibição: (85) 98586-4441
  phoneDisplay: `(${PHONE_DIGITS.slice(2, 4)}) ${PHONE_DIGITS.slice(4, 9)}-${PHONE_DIGITS.slice(9)}`,
  tel: `tel:+${PHONE_DIGITS}`,
  arrivalMinutes: 20,
  warrantyDays: 30,
  yearsExperience: 10,
  description:
    'Conserto de geladeira, freezer e câmara fria 24 horas em Fortaleza. Troca de compressor, carga de gás com laudo, termostato e vedação. Chegamos em até 20 minutos, visita grátis e 30 dias de garantia.',
};

export const DEFAULT_WHATSAPP_MESSAGE =
  'Olá! Vim pelo site da Elite Refrigeração e preciso de um técnico de refrigeração.';

export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://api.whatsapp.com/send?phone=${site.phoneDigits}&text=${encodeURIComponent(message)}`;
}

// Tag do Google (gtag.js). Vazio = não instala (configurar quando o cliente mandar)
export const googleTagId = '';

// Contêiner do Google Tag Manager. Vazio = não instala
export const gtmId = '';
