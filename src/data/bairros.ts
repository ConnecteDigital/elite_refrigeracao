// Bairros atendidos, organizados pelas regionais da Prefeitura de Fortaleza.
// Cada bairro vira uma página /conserto-de-geladeira-em-<slug>/ (SEO local).

export type RegiaoId = 'centro' | 'regional-1' | 'regional-2' | 'regional-3' | 'regional-4' | 'regional-5' | 'regional-6';

// Perfil do bairro: muda os problemas mais comuns e a pergunta extra do FAQ
export type Perfil = 'residencial' | 'misto' | 'comercio' | 'praia';

export interface Regiao {
  id: RegiaoId;
  nome: string;
  // Como o povo chama a região
  apelido: string;
  descricao: string;
}

export interface Bairro {
  slug: string;
  nome: string;
  regiao: RegiaoId;
  perfil: Perfil;
  // Texto exclusivo da página para não repetir conteúdo entre bairros
  sobre: string;
  // Bairros próximos (os que têm página viram link)
  vizinhos: string[];
}

export const regioes: Regiao[] = [
  {
    id: 'centro',
    nome: 'Centro',
    apelido: 'Centro',
    descricao: 'O coração comercial de Fortaleza, com lojas, lanchonetes e restaurantes que dependem de frio o dia inteiro.',
  },
  {
    id: 'regional-1',
    nome: 'Regional I',
    apelido: 'Oeste',
    descricao: 'Litoral oeste, da Barra do Ceará ao Farias Brito: bairros residenciais, comércio de rua e muita maresia perto da praia.',
  },
  {
    id: 'regional-2',
    nome: 'Regional II',
    apelido: 'Leste',
    descricao: 'Aldeota, Meireles, Cocó, Varjota e Praia do Futuro: prédios, restaurantes, barracas de praia e condomínios.',
  },
  {
    id: 'regional-3',
    nome: 'Regional III',
    apelido: 'Noroeste',
    descricao: 'Antônio Bezerra, Parquelândia, Pici e arredores da Bezerra de Menezes: casas, comércio forte e campus da UFC.',
  },
  {
    id: 'regional-4',
    nome: 'Regional IV',
    apelido: 'Centro-Sul',
    descricao: 'Benfica, Fátima, Montese, Parangaba e Itaperi: bairros tradicionais, universidades e comércio de bairro movimentado.',
  },
  {
    id: 'regional-5',
    nome: 'Regional V',
    apelido: 'Sudoeste',
    descricao: 'Conjunto Ceará, Mondubim, José Walter, Bom Jardim e Maraponga: grandes conjuntos residenciais e comércio local.',
  },
  {
    id: 'regional-6',
    nome: 'Regional VI',
    apelido: 'Sudeste',
    descricao: 'Messejana, Edson Queiroz, Cambeba, Castelão e Sabiaguaba: condomínios, a Washington Soares e a maior área da cidade.',
  },
];

export const bairros: Bairro[] = [
  // centro
  {
    slug: 'centro',
    nome: 'Centro',
    regiao: 'centro',
    perfil: 'comercio',
    sobre:
      'O Centro de Fortaleza tem comércio intenso, lanchonetes, restaurantes e lojas que dependem de freezers e expositores funcionando o dia todo. Atendemos 24 horas, com chegada rápida para o seu comércio não perder mercadoria.',
    vizinhos: ['Praia de Iracema', 'Jacarecanga', 'Farias Brito', 'José Bonifácio'],
  },
  // regional-1
  {
    slug: 'jacarecanga',
    nome: 'Jacarecanga',
    regiao: 'regional-1',
    perfil: 'misto',
    sobre:
      'A Jacarecanga, ao lado do Centro, tem casas antigas, oficinas e pequenos comércios. Atendemos geladeiras de uma e duas portas, freezers e câmaras frias de mercadinhos e depósitos do bairro.',
    vizinhos: ['Centro', 'Farias Brito', 'Carlito Pamplona', 'Moura Brasil'],
  },
  {
    slug: 'farias-brito',
    nome: 'Farias Brito',
    regiao: 'regional-1',
    perfil: 'misto',
    sobre:
      'O Farias Brito é um bairro residencial e de comércio de rua entre o Centro e a Bezerra de Menezes. Fazemos conserto de geladeira, troca de compressor e carga de gás em casas, apartamentos e lojas da região.',
    vizinhos: ['Centro', 'Jacarecanga', 'São Gerardo', 'Monte Castelo'],
  },
  {
    slug: 'barra-do-ceara',
    nome: 'Barra do Ceará',
    regiao: 'regional-1',
    perfil: 'praia',
    sobre:
      'Na Barra do Ceará, onde o rio encontra o mar, a maresia é forte e os tubos de cobre e a serpentina corroem mais rápido. Atendemos vazamento de gás, solda e recarga com laudo, além de conserto geral de geladeira e freezer.',
    vizinhos: ['Cristo Redentor', 'Pirambu', 'Vila Velha', 'Jardim Iracema'],
  },
  {
    slug: 'pirambu',
    nome: 'Pirambu',
    regiao: 'regional-1',
    perfil: 'praia',
    sobre:
      'O Pirambu, no litoral oeste, é um bairro populoso com muitas casas e comércios pequenos. Atendemos geladeiras de uma e duas portas e freezers de mercadinhos e bares, com a maresia sempre no radar do diagnóstico.',
    vizinhos: ['Cristo Redentor', 'Carlito Pamplona', 'Jacarecanga', 'Barra do Ceará'],
  },
  {
    slug: 'cristo-redentor',
    nome: 'Cristo Redentor',
    regiao: 'regional-1',
    perfil: 'praia',
    sobre:
      'No Cristo Redentor, perto da praia, as geladeiras sofrem com a umidade e o sal do ar. Fazemos conserto, troca de compressor e manutenção preventiva para evitar que a geladeira pare de gelar de repente.',
    vizinhos: ['Pirambu', 'Barra do Ceará', 'Álvaro Weyne', 'Carlito Pamplona'],
  },
  {
    slug: 'carlito-pamplona',
    nome: 'Carlito Pamplona',
    regiao: 'regional-1',
    perfil: 'misto',
    sobre:
      'O Carlito Pamplona tem casas, galpões e comércio ao longo das avenidas. Atendemos geladeiras de casa e câmaras frias e freezers de distribuidoras, depósitos e mercados do bairro.',
    vizinhos: ['Pirambu', 'Jacarecanga', 'Álvaro Weyne', 'Cristo Redentor'],
  },
  {
    slug: 'alvaro-weyne',
    nome: 'Álvaro Weyne',
    regiao: 'regional-1',
    perfil: 'residencial',
    sobre:
      'O Álvaro Weyne é um bairro residencial e de comércio de rua na zona oeste. Consertamos geladeiras que não gelam, freezers com gelo demais e fazemos carga de gás com laudo, 24 horas.',
    vizinhos: ['Carlito Pamplona', 'Vila Ellery', 'Jardim Iracema', 'Cristo Redentor'],
  },
  {
    slug: 'vila-velha',
    nome: 'Vila Velha',
    regiao: 'regional-1',
    perfil: 'residencial',
    sobre:
      'A Vila Velha é um dos bairros mais populosos do oeste de Fortaleza, perto do encontro do Rio Ceará com o mar. São muitas casas e comércio de bairro, e a umidade da região pede atenção com ferrugem na grade de trás da geladeira e nos tubos de cobre.',
    vizinhos: ['Barra do Ceará', 'Jardim Guanabara', 'Quintino Cunha', 'Antônio Bezerra'],
  },
  {
    slug: 'jardim-guanabara',
    nome: 'Jardim Guanabara',
    regiao: 'regional-1',
    perfil: 'residencial',
    sobre:
      'O Jardim Guanabara é residencial, com ruas de casas entre a Barra do Ceará e o Jardim Iracema. Atendemos geladeiras de uma e duas portas e freezers de mercadinhos e lanchonetes do bairro, de dia ou de madrugada.',
    vizinhos: ['Barra do Ceará', 'Vila Velha', 'Jardim Iracema', 'Floresta'],
  },
  {
    slug: 'jardim-iracema',
    nome: 'Jardim Iracema',
    regiao: 'regional-1',
    perfil: 'residencial',
    sobre:
      'O Jardim Iracema mistura casas antigas, pequenos prédios e comércio de rua. Fazemos conserto de geladeira que não gela, troca de termostato e borracha de vedação e carga de gás com laudo para as famílias e os comércios do bairro.',
    vizinhos: ['Barra do Ceará', 'Jardim Guanabara', 'Floresta', 'Álvaro Weyne'],
  },
  {
    slug: 'floresta',
    nome: 'Floresta',
    regiao: 'regional-1',
    perfil: 'residencial',
    sobre:
      'A Floresta é um bairro residencial da zona oeste, com muitas famílias e comércio local. Atendemos geladeira frost free, geladeira de degelo manual e freezer horizontal, com chegada rápida pela Regional I.',
    vizinhos: ['Jardim Iracema', 'Álvaro Weyne', 'Jardim Guanabara', 'Padre Andrade'],
  },
  {
    slug: 'vila-ellery',
    nome: 'Vila Ellery',
    regiao: 'regional-1',
    perfil: 'residencial',
    sobre:
      'A Vila Ellery é um bairro residencial e tranquilo, entre o Álvaro Weyne e o São Gerardo. Fazemos conserto de geladeira, troca de compressor e de resistência de degelo nas casas e apartamentos da região.',
    vizinhos: ['São Gerardo', 'Monte Castelo', 'Álvaro Weyne', 'Presidente Kennedy'],
  },
  {
    slug: 'sao-gerardo',
    nome: 'São Gerardo',
    regiao: 'regional-1',
    perfil: 'misto',
    sobre:
      'O São Gerardo tem prédios, casas e muito comércio perto da Avenida Bezerra de Menezes. Atendemos geladeiras residenciais e freezers, expositores e câmaras frias de lojas, restaurantes e lanchonetes do bairro.',
    vizinhos: ['Farias Brito', 'Monte Castelo', 'Vila Ellery', 'Parquelândia'],
  },
  {
    slug: 'monte-castelo',
    nome: 'Monte Castelo',
    regiao: 'regional-1',
    perfil: 'misto',
    sobre:
      'O Monte Castelo é um bairro tradicional, com casas, pequenos prédios e comércio de bairro. Consertamos geladeiras de uma e duas portas, fazemos carga de gás com laudo e manutenção de freezers de mercadinhos e padarias.',
    vizinhos: ['São Gerardo', 'Farias Brito', 'Amadeu Furtado', 'Vila Ellery'],
  },
  {
    slug: 'moura-brasil',
    nome: 'Moura Brasil',
    regiao: 'regional-1',
    perfil: 'praia',
    sobre:
      'O Moura Brasil fica entre o Centro e a orla oeste, onde a maresia chega forte. Atendemos geladeiras e freezers com corrosão nos tubos e na serpentina, com solda, recarga de gás com laudo e troca de peças.',
    vizinhos: ['Centro', 'Jacarecanga', 'Pirambu', 'Carlito Pamplona'],
  },
  // regional-2
  {
    slug: 'aldeota',
    nome: 'Aldeota',
    regiao: 'regional-2',
    perfil: 'comercio',
    sobre:
      'A Aldeota reúne prédios residenciais, clínicas, escritórios e muitos restaurantes. Atendemos desde a geladeira frost free do apartamento até freezers e câmaras frias de restaurantes e lanchonetes, inclusive à noite e nos fins de semana.',
    vizinhos: ['Meireles', 'Varjota', 'Joaquim Távora', 'Dionísio Torres'],
  },
  {
    slug: 'coco',
    nome: 'Cocó',
    regiao: 'regional-2',
    perfil: 'residencial',
    sobre:
      'No Cocó, perto do parque, predominam condomínios e prédios altos, onde geladeiras de duas portas e frost free trabalham o dia inteiro. Fazemos conserto, troca de termostato, sensor e resistência sem precisar tirar a geladeira do apartamento na maioria dos casos.',
    vizinhos: ['Papicu', 'Dionísio Torres', 'Salinas', 'Guararapes'],
  },
  {
    slug: 'papicu',
    nome: 'Papicu',
    regiao: 'regional-2',
    perfil: 'misto',
    sobre:
      'O Papicu mistura prédios residenciais, casas e um comércio movimentado perto do terminal. Atendemos geladeiras de casa e freezers de lanchonetes, mercadinhos e depósitos de bebidas da região.',
    vizinhos: ['Aldeota', 'Varjota', 'Cocó', 'Vicente Pinzon'],
  },
  {
    slug: 'mucuripe',
    nome: 'Mucuripe',
    regiao: 'regional-2',
    perfil: 'praia',
    sobre:
      'No Mucuripe, a maresia do mar chega forte e acelera a corrosão de tubos e serpentinas. É comum atendermos vazamento de gás por corrosão, com solda e recarga de gás com laudo, em casas, prédios e comércios perto da orla.',
    vizinhos: ['Meireles', 'Varjota', 'Cais do Porto', 'Vicente Pinzon'],
  },
  {
    slug: 'cais-do-porto',
    nome: 'Cais do Porto',
    regiao: 'regional-2',
    perfil: 'comercio',
    sobre:
      'No Cais do Porto, perto do porto do Mucuripe, muitos negócios dependem de frio para conservar pescado e bebidas. Atendemos câmaras frias e freezers horizontais 24 horas, além das geladeiras das casas do bairro.',
    vizinhos: ['Mucuripe', 'Vicente Pinzon', 'Praia do Futuro', 'Papicu'],
  },
  {
    slug: 'praia-do-futuro',
    nome: 'Praia do Futuro',
    regiao: 'regional-2',
    perfil: 'praia',
    sobre:
      'Na Praia do Futuro, as barracas de praia e os restaurantes trabalham com freezers e câmaras frias cheios, e a maresia castiga qualquer equipamento. Fazemos manutenção preventiva, solda de tubulação e conserto rápido para o seu negócio não parar.',
    vizinhos: ['Cais do Porto', 'Vicente Pinzon', 'Edson Queiroz', 'Sabiaguaba'],
  },
  {
    slug: 'guararapes',
    nome: 'Guararapes',
    regiao: 'regional-2',
    perfil: 'residencial',
    sobre:
      'O Guararapes é um bairro de condomínios e casas amplas, com muitas geladeiras de duas portas e freezers verticais. Atendemos conserto, troca de borracha de vedação, termostato e compressor com chegada em até 20 minutos.',
    vizinhos: ['Cocó', 'Edson Queiroz', 'Salinas', 'Engenheiro Luciano Cavalcante'],
  },
  {
    slug: 'praia-de-iracema',
    nome: 'Praia de Iracema',
    regiao: 'regional-2',
    perfil: 'praia',
    sobre:
      'A Praia de Iracema concentra bares, restaurantes e prédios residenciais perto do mar. Freezers de bebidas e câmaras frias sofrem com a maresia e com o uso intenso; fazemos manutenção, solda e carga de gás com laudo.',
    vizinhos: ['Centro', 'Meireles', 'Aldeota', 'Moura Brasil'],
  },
  {
    slug: 'joaquim-tavora',
    nome: 'Joaquim Távora',
    regiao: 'regional-2',
    perfil: 'misto',
    sobre:
      'O Joaquim Távora fica entre o Centro e a Aldeota e tem casas, prédios e muitos pequenos negócios. Fazemos conserto de geladeira e freezer, troca de termostato, resistência e borracha de vedação.',
    vizinhos: ['Aldeota', 'Fátima', 'Dionísio Torres', 'José Bonifácio'],
  },
  {
    slug: 'cidade-2000',
    nome: 'Cidade 2000',
    regiao: 'regional-2',
    perfil: 'residencial',
    sobre:
      'A Cidade 2000 é um conjunto residencial com ruas de casas e um comércio bem movimentado à noite. Atendemos geladeiras das famílias e freezers de bares, lanchonetes e açaíterias do bairro, 24 horas.',
    vizinhos: ['Manuel Dias Branco', 'Praia do Futuro', 'Cocó', 'Papicu'],
  },
  {
    slug: 'de-lourdes',
    nome: 'De Lourdes',
    regiao: 'regional-2',
    perfil: 'residencial',
    sobre:
      'O De Lourdes é um bairro residencial de casas amplas e condomínios na zona leste. Atendemos geladeiras de duas portas e frost free e freezers verticais, com manutenção e conserto.',
    vizinhos: ['Cocó', 'Guararapes', 'Edson Queiroz', 'Manuel Dias Branco'],
  },
  {
    slug: 'dionisio-torres',
    nome: 'Dionísio Torres',
    regiao: 'regional-2',
    perfil: 'misto',
    sobre:
      'O Dionísio Torres tem muitos prédios residenciais, clínicas e comércio perto das avenidas Antônio Sales e Pontes Vieira. Fazemos conserto de geladeira em apartamento, troca de compressor e manutenção de freezers e câmaras frias de restaurantes.',
    vizinhos: ['Aldeota', 'Joaquim Távora', 'São João do Tauape', 'Cocó'],
  },
  {
    slug: 'engenheiro-luciano-cavalcante',
    nome: 'Engenheiro Luciano Cavalcante',
    regiao: 'regional-2',
    perfil: 'residencial',
    sobre:
      'O Engenheiro Luciano Cavalcante é residencial, com condomínios e casas perto da Avenida Washington Soares. Atendemos geladeiras frost free e de duas portas e freezers verticais, com chegada em até 20 minutos.',
    vizinhos: ['Guararapes', 'Salinas', 'Edson Queiroz', 'Cocó'],
  },
  {
    slug: 'manuel-dias-branco',
    nome: 'Manuel Dias Branco',
    regiao: 'regional-2',
    perfil: 'praia',
    sobre:
      'O Manuel Dias Branco fica perto das dunas e da Praia do Futuro, com condomínios novos e o vento salgado do mar. A maresia acelera a corrosão das geladeiras; fazemos detecção de vazamento, solda e recarga de gás com laudo.',
    vizinhos: ['Cidade 2000', 'Praia do Futuro', 'De Lourdes', 'Cocó'],
  },
  {
    slug: 'meireles',
    nome: 'Meireles',
    regiao: 'regional-2',
    perfil: 'praia',
    sobre:
      'O Meireles concentra os prédios altos da Avenida Beira-Mar, hotéis, bares e restaurantes. Atendemos geladeiras de apartamento e freezers e câmaras frias de comércio, sempre de olho na corrosão causada pela maresia.',
    vizinhos: ['Aldeota', 'Praia de Iracema', 'Mucuripe', 'Varjota'],
  },
  {
    slug: 'salinas',
    nome: 'Salinas',
    regiao: 'regional-2',
    perfil: 'residencial',
    sobre:
      'O Salinas é um bairro residencial com casas e prédios na zona leste. Fazemos conserto de geladeira que não gela, troca de termostato, sensor e resistência de degelo, a qualquer hora do dia.',
    vizinhos: ['Cocó', 'Guararapes', 'São João do Tauape', 'Alto da Balança'],
  },
  {
    slug: 'sao-joao-do-tauape',
    nome: 'São João do Tauape',
    regiao: 'regional-2',
    perfil: 'misto',
    sobre:
      'O São João do Tauape tem ruas residenciais e comércio ao longo das avenidas Pontes Vieira e Visconde do Rio Branco. Atendemos geladeiras de casa e freezers e câmaras frias de mercadinhos, açougues e restaurantes.',
    vizinhos: ['Dionísio Torres', 'Fátima', 'Salinas', 'Alto da Balança'],
  },
  {
    slug: 'varjota',
    nome: 'Varjota',
    regiao: 'regional-2',
    perfil: 'comercio',
    sobre:
      'A Varjota é conhecida pelo polo gastronômico, com bares e restaurantes que dependem de freezer de bebida e câmara fria funcionando a noite toda. Atendemos 24 horas para o seu comércio não perder mercadoria.',
    vizinhos: ['Meireles', 'Aldeota', 'Papicu', 'Mucuripe'],
  },
  {
    slug: 'vicente-pinzon',
    nome: 'Vicente Pinzon',
    regiao: 'regional-2',
    perfil: 'praia',
    sobre:
      'O Vicente Pinzon fica no alto, perto do porto do Mucuripe, com muitas casas e comércio de bairro. A maresia castiga tubos e serpentinas; consertamos vazamentos de gás com solda e carga com laudo.',
    vizinhos: ['Mucuripe', 'Cais do Porto', 'Papicu', 'Praia do Futuro'],
  },
  // regional-3
  {
    slug: 'amadeu-furtado',
    nome: 'Amadeu Furtado',
    regiao: 'regional-3',
    perfil: 'misto',
    sobre:
      'O Amadeu Furtado fica perto da Bezerra de Menezes, com prédios, casas e muito comércio. Atendemos geladeiras frost free, freezers e câmaras frias de restaurantes e lanchonetes da região.',
    vizinhos: ['Parquelândia', 'Rodolfo Teófilo', 'Monte Castelo', 'Bela Vista'],
  },
  {
    slug: 'antonio-bezerra',
    nome: 'Antônio Bezerra',
    regiao: 'regional-3',
    perfil: 'comercio',
    sobre:
      'O Antônio Bezerra tem comércio forte em torno do terminal e muitas casas residenciais. Atendemos 24 horas geladeiras, freezers de bares e mercadinhos e câmaras frias de açougues e frigoríficos pequenos.',
    vizinhos: ['Quintino Cunha', 'Autran Nunes', 'Padre Andrade', 'Dom Lustosa'],
  },
  {
    slug: 'autran-nunes',
    nome: 'Autran Nunes',
    regiao: 'regional-3',
    perfil: 'residencial',
    sobre:
      'O Autran Nunes é um bairro residencial com comércio de bairro. Fazemos conserto de geladeira de uma e duas portas, troca de motor, termostato e sensor de temperatura com 1 ano de garantia.',
    vizinhos: ['Antônio Bezerra', 'Dom Lustosa', 'Genibaú', 'Henrique Jorge'],
  },
  {
    slug: 'henrique-jorge',
    nome: 'Henrique Jorge',
    regiao: 'regional-3',
    perfil: 'residencial',
    sobre:
      'O Henrique Jorge tem ruas residenciais e muito comércio de bairro, com mercadinhos e lanchonetes. Atendemos geladeiras e freezers de casa e de comércio, com chegada em até 20 minutos.',
    vizinhos: ['João XXIII', 'Autran Nunes', 'Bonsucesso', 'Jóquei Clube'],
  },
  {
    slug: 'bonsucesso',
    nome: 'Bonsucesso',
    regiao: 'regional-3',
    perfil: 'residencial',
    sobre:
      'O Bonsucesso é residencial, com muitas famílias e comércio local. Fazemos conserto de geladeira que não gela, troca de borracha de vedação, resistência de degelo e carga de gás com laudo.',
    vizinhos: ['João XXIII', 'Henrique Jorge', 'Granja Portugal', 'Jóquei Clube'],
  },
  {
    slug: 'bela-vista',
    nome: 'Bela Vista',
    regiao: 'regional-3',
    perfil: 'residencial',
    sobre:
      'A Bela Vista é residencial, com casas e pequenos comércios. Atendemos geladeiras de uma e duas portas, freezers horizontais e verticais e fazemos manutenção preventiva para quem depende do frio no trabalho.',
    vizinhos: ['Pan Americano', 'Couto Fernandes', 'Amadeu Furtado', 'Demócrito Rocha'],
  },
  {
    slug: 'dom-lustosa',
    nome: 'Dom Lustosa',
    regiao: 'regional-3',
    perfil: 'residencial',
    sobre:
      'O Dom Lustosa é um bairro residencial da Regional III, com casas e comércio local. Atendemos geladeiras de uma e duas portas e freezers, com troca de motor, termostato e borracha de vedação.',
    vizinhos: ['Autran Nunes', 'Antônio Bezerra', 'Pici', 'Henrique Jorge'],
  },
  {
    slug: 'joao-xxiii',
    nome: 'João XXIII',
    regiao: 'regional-3',
    perfil: 'residencial',
    sobre:
      'O João XXIII é residencial, com ruas de casas e comércio de bairro. Fazemos conserto de geladeira, carga de gás com laudo e manutenção de freezers de mercadinhos e bares da região.',
    vizinhos: ['Henrique Jorge', 'Bonsucesso', 'Jóquei Clube', 'Dom Lustosa'],
  },
  {
    slug: 'joquei-clube',
    nome: 'Jóquei Clube',
    regiao: 'regional-3',
    perfil: 'misto',
    sobre:
      'O Jóquei Clube tem casas, prédios e um comércio forte nas avenidas que cortam o bairro. Atendemos geladeiras residenciais e freezers, expositores e câmaras frias de lojas e restaurantes.',
    vizinhos: ['Henrique Jorge', 'Pan Americano', 'Parangaba', 'João XXIII'],
  },
  {
    slug: 'olavo-oliveira',
    nome: 'Olavo Oliveira',
    regiao: 'regional-3',
    perfil: 'residencial',
    sobre:
      'O Olavo Oliveira é um bairro pequeno e residencial perto do Antônio Bezerra. Atendemos geladeiras e freezers das famílias do bairro 24 horas, com chegada em até 20 minutos.',
    vizinhos: ['Antônio Bezerra', 'Quintino Cunha', 'Padre Andrade', 'Autran Nunes'],
  },
  {
    slug: 'padre-andrade',
    nome: 'Padre Andrade',
    regiao: 'regional-3',
    perfil: 'residencial',
    sobre:
      'O Padre Andrade é residencial, com muitas casas e comércio de rua. Consertamos geladeira que não gela, freezer com gelo demais e fazemos troca de compressor e recarga de gás com laudo.',
    vizinhos: ['Antônio Bezerra', 'Floresta', 'Presidente Kennedy', 'Quintino Cunha'],
  },
  {
    slug: 'parque-araxa',
    nome: 'Parque Araxá',
    regiao: 'regional-3',
    perfil: 'residencial',
    sobre:
      'O Parque Araxá é um bairro residencial perto da Parquelândia e da Bezerra de Menezes. Atendemos geladeiras frost free e de degelo manual e freezers verticais e horizontais.',
    vizinhos: ['Parquelândia', 'Amadeu Furtado', 'Rodolfo Teófilo', 'Bela Vista'],
  },
  {
    slug: 'pici',
    nome: 'Pici',
    regiao: 'regional-3',
    perfil: 'residencial',
    sobre:
      'O Pici é conhecido pelo campus da UFC e tem muitas casas, repúblicas e comércio de bairro. Atendemos geladeiras de estudantes e famílias e freezers de lanchonetes e mercadinhos, 24 horas.',
    vizinhos: ['Bela Vista', 'Dom Lustosa', 'Autran Nunes', 'Pan Americano'],
  },
  {
    slug: 'parquelandia',
    nome: 'Parquelândia',
    regiao: 'regional-3',
    perfil: 'misto',
    sobre:
      'A Parquelândia tem prédios, casas e comércio perto da Avenida Bezerra de Menezes. Fazemos conserto de geladeira em apartamento e manutenção de freezers e câmaras frias de lojas, padarias e restaurantes.',
    vizinhos: ['Amadeu Furtado', 'Parque Araxá', 'São Gerardo', 'Presidente Kennedy'],
  },
  {
    slug: 'presidente-kennedy',
    nome: 'Presidente Kennedy',
    regiao: 'regional-3',
    perfil: 'comercio',
    sobre:
      'O Presidente Kennedy tem comércio forte ao longo da Avenida Bezerra de Menezes, com lojas, restaurantes e supermercados. Atendemos câmaras frias, freezers e expositores e também as geladeiras das casas do bairro.',
    vizinhos: ['Parquelândia', 'Padre Andrade', 'Vila Ellery', 'São Gerardo'],
  },
  {
    slug: 'rodolfo-teofilo',
    nome: 'Rodolfo Teófilo',
    regiao: 'regional-3',
    perfil: 'misto',
    sobre:
      'O Rodolfo Teófilo reúne hospitais, clínicas, o campus de saúde da UFC e muitas casas. Atendemos geladeiras residenciais e freezers e geladeiras de comércio, com rapidez para quem não pode esperar.',
    vizinhos: ['Benfica', 'Amadeu Furtado', 'Parque Araxá', 'Jardim América'],
  },
  {
    slug: 'quintino-cunha',
    nome: 'Quintino Cunha',
    regiao: 'regional-3',
    perfil: 'residencial',
    sobre:
      'O Quintino Cunha é um bairro grande e residencial na zona oeste, perto do Rio Ceará. Atendemos geladeiras e freezers das famílias e dos comércios do bairro, com 1 ano de garantia no serviço.',
    vizinhos: ['Antônio Bezerra', 'Vila Velha', 'Olavo Oliveira', 'Padre Andrade'],
  },
  // regional-4
  {
    slug: 'benfica',
    nome: 'Benfica',
    regiao: 'regional-4',
    perfil: 'misto',
    sobre:
      'O Benfica tem muitos estudantes, repúblicas, bares e restaurantes por causa das universidades. Geladeira de república parada não espera: atendemos 24 horas e também cuidamos dos freezers e câmaras frias dos comércios do bairro.',
    vizinhos: ['Fátima', 'José Bonifácio', 'Jardim América', 'Rodolfo Teófilo'],
  },
  {
    slug: 'fatima',
    nome: 'Fátima',
    regiao: 'regional-4',
    perfil: 'misto',
    sobre:
      'O bairro de Fátima, em volta da Avenida 13 de Maio e do santuário, é residencial com comércio forte. Atendemos geladeiras frost free, freezers verticais e horizontais e câmaras frias de restaurantes e padarias.',
    vizinhos: ['Benfica', 'Joaquim Távora', 'Parreão', 'José Bonifácio'],
  },
  {
    slug: 'parangaba',
    nome: 'Parangaba',
    regiao: 'regional-4',
    perfil: 'comercio',
    sobre:
      'A Parangaba, em volta da lagoa, tem um dos comércios mais fortes da cidade. Atendemos freezers e câmaras frias de lojas, restaurantes e mercados e as geladeiras das casas e apartamentos do bairro.',
    vizinhos: ['Montese', 'Itaoca', 'Vila Peri', 'Maraponga'],
  },
  {
    slug: 'aeroporto',
    nome: 'Aeroporto',
    regiao: 'regional-4',
    perfil: 'misto',
    sobre:
      'O bairro do Aeroporto, em volta do Pinto Martins, tem casas, hotéis, restaurantes e serviços. Atendemos geladeiras de casa e freezers e câmaras frias de restaurantes e lanchonetes da região.',
    vizinhos: ['Serrinha', 'Vila União', 'Montese', 'Itaperi'],
  },
  {
    slug: 'bom-futuro',
    nome: 'Bom Futuro',
    regiao: 'regional-4',
    perfil: 'residencial',
    sobre:
      'O Bom Futuro é um bairro residencial vizinho ao Montese e seu comércio. Fazemos conserto de geladeira de uma e duas portas, troca de borracha, termostato e carga de gás com laudo.',
    vizinhos: ['Montese', 'Vila União', 'Damas', 'Parreão'],
  },
  {
    slug: 'itaoca',
    nome: 'Itaoca',
    regiao: 'regional-4',
    perfil: 'residencial',
    sobre:
      'A Itaoca é residencial e fica perto da Parangaba. Atendemos geladeiras e freezers de casa e de pequenos comércios, com 1 ano de garantia no serviço.',
    vizinhos: ['Parangaba', 'Itaperi', 'Vila Peri', 'Serrinha'],
  },
  {
    slug: 'itaperi',
    nome: 'Itaperi',
    regiao: 'regional-4',
    perfil: 'residencial',
    sobre:
      'O Itaperi tem casas, repúblicas e comércio em volta do campus da UECE. Atendemos geladeiras de estudantes e famílias e freezers de lanchonetes e mercadinhos, 24 horas.',
    vizinhos: ['Serrinha', 'Dendê', 'Parangaba', 'Itaoca'],
  },
  {
    slug: 'jose-bonifacio',
    nome: 'José Bonifácio',
    regiao: 'regional-4',
    perfil: 'misto',
    sobre:
      'O José Bonifácio fica colado ao Centro, com casas antigas, pensões, oficinas e comércio. Atendemos geladeiras de casa e freezers e câmaras frias de lanchonetes e restaurantes da região.',
    vizinhos: ['Centro', 'Benfica', 'Fátima', 'Joaquim Távora'],
  },
  {
    slug: 'jardim-america',
    nome: 'Jardim América',
    regiao: 'regional-4',
    perfil: 'residencial',
    sobre:
      'O Jardim América é um bairro residencial entre o Benfica e o Damas. Fazemos conserto de geladeira, troca de termostato, sensor e resistência e carga de gás com laudo.',
    vizinhos: ['Benfica', 'Damas', 'Rodolfo Teófilo', 'Fátima'],
  },
  {
    slug: 'damas',
    nome: 'Damas',
    regiao: 'regional-4',
    perfil: 'residencial',
    sobre:
      'O Damas é residencial, com ruas de casas e pequenos prédios. Atendemos geladeiras de uma e duas portas e freezers de casa e de pequenos comércios, 24 horas.',
    vizinhos: ['Jardim América', 'Parreão', 'Bom Futuro', 'Benfica'],
  },
  {
    slug: 'parreao',
    nome: 'Parreão',
    regiao: 'regional-4',
    perfil: 'residencial',
    sobre:
      'O Parreão é um bairro residencial perto de Fátima e do Montese. Consertamos geladeira que não gela, troca de compressor e borracha de vedação e manutenção de freezers.',
    vizinhos: ['Fátima', 'Damas', 'Bom Futuro', 'Vila União'],
  },
  {
    slug: 'vila-uniao',
    nome: 'Vila União',
    regiao: 'regional-4',
    perfil: 'residencial',
    sobre:
      'A Vila União fica perto do aeroporto, com casas e comércio de bairro. Atendemos geladeiras e freezers residenciais e de comércio, com chegada em até 20 minutos.',
    vizinhos: ['Montese', 'Bom Futuro', 'Aeroporto', 'Parreão'],
  },
  {
    slug: 'montese',
    nome: 'Montese',
    regiao: 'regional-4',
    perfil: 'comercio',
    sobre:
      'O Montese tem um dos comércios de bairro mais fortes de Fortaleza, na Avenida Gomes de Matos. Atendemos câmaras frias, freezers e expositores de lojas, lanchonetes e mercados, além das geladeiras das casas.',
    vizinhos: ['Bom Futuro', 'Vila União', 'Parangaba', 'Itaoca'],
  },
  {
    slug: 'couto-fernandes',
    nome: 'Couto Fernandes',
    regiao: 'regional-4',
    perfil: 'residencial',
    sobre:
      'O Couto Fernandes é residencial, com casas e comércio local. Fazemos conserto de geladeira, carga de gás com laudo e troca de termostato e resistência de degelo.',
    vizinhos: ['Pan Americano', 'Demócrito Rocha', 'Bela Vista', 'Montese'],
  },
  {
    slug: 'pan-americano',
    nome: 'Pan Americano',
    regiao: 'regional-4',
    perfil: 'residencial',
    sobre:
      'O Pan Americano é um bairro residencial da Regional IV. Atendemos geladeiras de uma e duas portas e freezers de casa e de pequenos comércios, a qualquer hora.',
    vizinhos: ['Couto Fernandes', 'Bela Vista', 'Jóquei Clube', 'Demócrito Rocha'],
  },
  {
    slug: 'democrito-rocha',
    nome: 'Demócrito Rocha',
    regiao: 'regional-4',
    perfil: 'residencial',
    sobre:
      'O Demócrito Rocha é residencial, com ruas de casas e mercadinhos. Consertamos geladeira que não gela, freezer com excesso de gelo e fazemos troca de compressor e borracha.',
    vizinhos: ['Couto Fernandes', 'Pan Americano', 'Itaoca', 'Jóquei Clube'],
  },
  {
    slug: 'serrinha',
    nome: 'Serrinha',
    regiao: 'regional-4',
    perfil: 'misto',
    sobre:
      'A Serrinha tem casas, repúblicas e comércio perto da UECE e do aeroporto. Atendemos geladeiras de famílias e estudantes e freezers de lanchonetes e mercadinhos da região.',
    vizinhos: ['Itaperi', 'Aeroporto', 'Dendê', 'Itaoca'],
  },
  {
    slug: 'dende',
    nome: 'Dendê',
    regiao: 'regional-4',
    perfil: 'residencial',
    sobre:
      'O Dendê é um bairro residencial perto do Itaperi. Fazemos conserto de geladeira e freezer, carga de gás com laudo e troca de compressor com chegada rápida.',
    vizinhos: ['Itaperi', 'Serrinha', 'Passaré', 'Boa Vista / Castelão'],
  },
  {
    slug: 'vila-peri',
    nome: 'Vila Peri',
    regiao: 'regional-4',
    perfil: 'residencial',
    sobre:
      'A Vila Peri é residencial, com muitas casas e comércio local entre a Parangaba e a Maraponga. Atendemos geladeiras de uma e duas portas e freezers, com 1 ano de garantia.',
    vizinhos: ['Parangaba', 'Maraponga', 'Itaperi', 'Vila Manoel Sátiro'],
  },
  // regional-5
  {
    slug: 'bom-jardim',
    nome: 'Bom Jardim',
    regiao: 'regional-5',
    perfil: 'misto',
    sobre:
      'O Bom Jardim é um dos bairros mais populosos de Fortaleza, com comércio forte nas ruas principais. Atendemos geladeiras de casa e freezers de mercadinhos, bares e sorveterias, 24 horas por dia.',
    vizinhos: ['Granja Lisboa', 'Siqueira', 'Canindezinho', 'Granja Portugal'],
  },
  {
    slug: 'granja-lisboa',
    nome: 'Granja Lisboa',
    regiao: 'regional-5',
    perfil: 'residencial',
    sobre:
      'A Granja Lisboa tem muitas casas e comércio de bairro. Fazemos conserto de geladeira e freezer, troca de compressor e solda de tubulação, com 1 ano de garantia.',
    vizinhos: ['Bom Jardim', 'Granja Portugal', 'Siqueira', 'Canindezinho'],
  },
  {
    slug: 'conjunto-ceara',
    nome: 'Conjunto Ceará',
    regiao: 'regional-5',
    perfil: 'comercio',
    sobre:
      'O Conjunto Ceará é um dos maiores conjuntos habitacionais de Fortaleza, com comércio próprio e muito movimento. Atendemos geladeiras das casas e freezers, expositores e câmaras frias de mercadinhos, açougues e lanchonetes.',
    vizinhos: ['Granja Portugal', 'Bom Jardim', 'Genibaú', 'Siqueira'],
  },
  {
    slug: 'siqueira',
    nome: 'Siqueira',
    regiao: 'regional-5',
    perfil: 'residencial',
    sobre:
      'O Siqueira é um bairro residencial da Regional V, com casas e comércio de bairro. Fazemos conserto de geladeira, troca de motor e termostato e carga de gás com laudo, 24 horas.',
    vizinhos: ['Bom Jardim', 'Granja Lisboa', 'Canindezinho', 'Conjunto Esperança'],
  },
  {
    slug: 'mondubim',
    nome: 'Mondubim',
    regiao: 'regional-5',
    perfil: 'residencial',
    sobre:
      'O Mondubim é grande e residencial, com conjuntos, casas e comércio local. Atendemos geladeiras e freezers de famílias e de pequenos comércios, com chegada em até 20 minutos.',
    vizinhos: ['Maraponga', 'Jardim Cearense', 'Conjunto Esperança', 'Novo Mondubim'],
  },
  {
    slug: 'conjunto-jose-walter',
    nome: 'Conjunto José Walter',
    regiao: 'regional-5',
    perfil: 'residencial',
    sobre:
      'O Conjunto José Walter é um dos maiores conjuntos residenciais da cidade, com comércio próprio ao longo das avenidas. Atendemos geladeiras de uma e duas portas e freezers de mercadinhos e bares do conjunto.',
    vizinhos: ['Planalto Ayrton Senna', 'Mondubim', 'Novo Mondubim', 'Parque Santa Rosa'],
  },
  {
    slug: 'granja-portugal',
    nome: 'Granja Portugal',
    regiao: 'regional-5',
    perfil: 'residencial',
    sobre:
      'A Granja Portugal é residencial, com muitas famílias e comércio de rua. Consertamos geladeira que não gela, freezer que não congela e fazemos solda e carga de gás com laudo.',
    vizinhos: ['Granja Lisboa', 'Bom Jardim', 'Conjunto Ceará', 'Bonsucesso'],
  },
  {
    slug: 'genibau',
    nome: 'Genibaú',
    regiao: 'regional-5',
    perfil: 'residencial',
    sobre:
      'O Genibaú é um bairro residencial perto do Conjunto Ceará. Atendemos geladeiras e freezers de casas e comércios do bairro, com troca de compressor, termostato e borracha de vedação.',
    vizinhos: ['Conjunto Ceará', 'Autran Nunes', 'Granja Portugal', 'Antônio Bezerra'],
  },
  {
    slug: 'canindezinho',
    nome: 'Canindezinho',
    regiao: 'regional-5',
    perfil: 'residencial',
    sobre:
      'O Canindezinho é residencial, na parte sul da Regional V. Atendemos geladeiras de uma e duas portas e freezers, 24 horas, com chegada rápida.',
    vizinhos: ['Siqueira', 'Bom Jardim', 'Parque São José', 'Conjunto Esperança'],
  },
  {
    slug: 'vila-manoel-satiro',
    nome: 'Vila Manoel Sátiro',
    regiao: 'regional-5',
    perfil: 'residencial',
    sobre:
      'A Vila Manoel Sátiro é residencial, com ruas de casas e comércio local. Fazemos conserto de geladeira e freezer, troca de resistência e sensor de temperatura e recarga de gás com laudo.',
    vizinhos: ['Maraponga', 'Parque São José', 'Vila Peri', 'Mondubim'],
  },
  {
    slug: 'parque-sao-jose',
    nome: 'Parque São José',
    regiao: 'regional-5',
    perfil: 'residencial',
    sobre:
      'O Parque São José é um bairro residencial da Regional V. Atendemos geladeiras e freezers das famílias do bairro, com 1 ano de garantia no serviço.',
    vizinhos: ['Vila Manoel Sátiro', 'Canindezinho', 'Maraponga', 'Bom Jardim'],
  },
  {
    slug: 'parque-santa-rosa',
    nome: 'Parque Santa Rosa',
    regiao: 'regional-5',
    perfil: 'residencial',
    sobre:
      'O Parque Santa Rosa é residencial, perto do Mondubim e do José Walter. Consertamos geladeira que não gela e freezer com gelo demais, a qualquer hora.',
    vizinhos: ['Mondubim', 'Conjunto Esperança', 'Novo Mondubim', 'Conjunto José Walter'],
  },
  {
    slug: 'maraponga',
    nome: 'Maraponga',
    regiao: 'regional-5',
    perfil: 'misto',
    sobre:
      'A Maraponga, em volta da lagoa, tem casas, condomínios e comércio ao longo da Avenida Godofredo Maciel. Atendemos geladeiras residenciais e freezers e câmaras frias de restaurantes e mercados.',
    vizinhos: ['Parangaba', 'Jardim Cearense', 'Mondubim', 'Vila Manoel Sátiro'],
  },
  {
    slug: 'jardim-cearense',
    nome: 'Jardim Cearense',
    regiao: 'regional-5',
    perfil: 'residencial',
    sobre:
      'O Jardim Cearense é um bairro residencial perto da Maraponga. Atendemos geladeiras frost free e de degelo manual e freezers de casa e de comércio.',
    vizinhos: ['Maraponga', 'Mondubim', 'Vila Peri', 'Parangaba'],
  },
  {
    slug: 'conjunto-esperanca',
    nome: 'Conjunto Esperança',
    regiao: 'regional-5',
    perfil: 'residencial',
    sobre:
      'O Conjunto Esperança é residencial, com casas e comércio de bairro. Fazemos conserto de geladeira, troca de motor e carga de gás com laudo, 24 horas.',
    vizinhos: ['Mondubim', 'Parque Santa Rosa', 'Siqueira', 'Canindezinho'],
  },
  {
    slug: 'presidente-vargas',
    nome: 'Presidente Vargas',
    regiao: 'regional-5',
    perfil: 'residencial',
    sobre:
      'O Presidente Vargas é um bairro residencial da Regional V. Atendemos geladeiras e freezers das famílias e dos pequenos comércios, com chegada em até 20 minutos.',
    vizinhos: ['Mondubim', 'Planalto Ayrton Senna', 'Conjunto Esperança', 'Parque Santa Rosa'],
  },
  {
    slug: 'planalto-ayrton-senna',
    nome: 'Planalto Ayrton Senna',
    regiao: 'regional-5',
    perfil: 'residencial',
    sobre:
      'O Planalto Ayrton Senna é residencial, com muitas casas e comércio local. Consertamos geladeira e freezer, trocamos compressor, termostato e borracha de vedação.',
    vizinhos: ['Conjunto José Walter', 'Presidente Vargas', 'Mondubim', 'Passaré'],
  },
  {
    slug: 'novo-mondubim',
    nome: 'Novo Mondubim',
    regiao: 'regional-5',
    perfil: 'residencial',
    sobre:
      'O Novo Mondubim é um bairro residencial ao lado do Mondubim. Atendemos geladeiras de uma e duas portas e freezers, 24 horas, com 1 ano de garantia.',
    vizinhos: ['Mondubim', 'Parque Santa Rosa', 'Conjunto José Walter', 'Jardim Cearense'],
  },
  // regional-6
  {
    slug: 'edson-queiroz',
    nome: 'Edson Queiroz',
    regiao: 'regional-6',
    perfil: 'misto',
    sobre:
      'O Edson Queiroz cresceu com condomínios de casas e prédios, além do movimento em torno da Unifor. Atendemos geladeiras de casa, freezers de repúblicas e lanchonetes e câmaras frias de restaurantes da região.',
    vizinhos: ['Cocó', 'Guararapes', 'Cidade dos Funcionários', 'Sapiranga'],
  },
  {
    slug: 'messejana',
    nome: 'Messejana',
    regiao: 'regional-6',
    perfil: 'comercio',
    sobre:
      'Messejana tem centro comercial próprio em volta da lagoa e muitos bairros residenciais ao redor. Atendemos 24 horas geladeiras, freezers e câmaras frias, com chegada em até 20 minutos.',
    vizinhos: ['Cambeba', 'Curió', 'Guajeru', 'Lagoa Redonda'],
  },
  {
    slug: 'aerolandia',
    nome: 'Aerolândia',
    regiao: 'regional-6',
    perfil: 'misto',
    sobre:
      'A Aerolândia fica às margens da BR-116, com casas, oficinas e comércio. Fazemos conserto de geladeira e freezer, carga de gás com laudo e troca de compressor para casas e negócios do bairro.',
    vizinhos: ['Alto da Balança', 'Dias Macedo', 'Jardim das Oliveiras', 'Cajazeiras'],
  },
  {
    slug: 'alto-da-balanca',
    nome: 'Alto da Balança',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Alto da Balança é residencial e tem acesso rápido pela BR-116. Atendemos geladeiras que não gelam, freezers com excesso de gelo e trocamos termostato, sensor e resistência.',
    vizinhos: ['Aerolândia', 'Salinas', 'São João do Tauape', 'Dias Macedo'],
  },
  {
    slug: 'boa-vista-castelao',
    nome: 'Boa Vista / Castelão',
    regiao: 'regional-6',
    perfil: 'misto',
    sobre:
      'O Boa Vista, perto da Arena Castelão, tem casas e um comércio que lota em dia de jogo. Freezer de bebida parado nessa hora é prejuízo: atendemos 24 horas e chegamos em até 20 minutos.',
    vizinhos: ['Passaré', 'Dias Macedo', 'Cajazeiras', 'Mata Galinha'],
  },
  {
    slug: 'cidade-dos-funcionarios',
    nome: 'Cidade dos Funcionários',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'A Cidade dos Funcionários é residencial, com casas grandes e condomínios perto da Washington Soares. Atendemos geladeiras de duas portas, frost free e freezers verticais com conserto e manutenção preventiva.',
    vizinhos: ['Cambeba', 'Parque Manibura', 'Jardim das Oliveiras', 'Edson Queiroz'],
  },
  {
    slug: 'barroso',
    nome: 'Barroso',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Barroso é um bairro residencial com comércio de bairro. Fazemos conserto de geladeira e freezer, troca de compressor, solda e carga de gás com laudo.',
    vizinhos: ['Jangurussu', 'Passaré', 'Cajazeiras', 'Ancuri'],
  },
  {
    slug: 'jangurussu',
    nome: 'Jangurussu',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Jangurussu é grande e populoso, com muitas casas e comércio local. Atendemos geladeiras de uma e duas portas e freezers de mercadinhos e bares, 24 horas por dia.',
    vizinhos: ['Barroso', 'Ancuri', 'Passaré', 'Messejana'],
  },
  {
    slug: 'ancuri',
    nome: 'Ancuri',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Ancuri fica no extremo sul de Fortaleza, com ruas residenciais e comércio de bairro. Atendemos conserto de geladeira, freezer e troca de borracha de vedação, 24 horas por dia.',
    vizinhos: ['Jangurussu', 'Pedras', 'Messejana', 'Barroso'],
  },
  {
    slug: 'sabiaguaba',
    nome: 'Sabiaguaba',
    regiao: 'regional-6',
    perfil: 'praia',
    sobre:
      'A Sabiaguaba tem praia, dunas, barracas e restaurantes, e a maresia é forte o ano todo. Atendemos freezers e câmaras frias de barracas e restaurantes e as geladeiras das casas, com solda e carga de gás com laudo.',
    vizinhos: ['Praia do Futuro', 'Edson Queiroz', 'Lagoa Redonda', 'Sapiranga'],
  },
  {
    slug: 'sapiranga',
    nome: 'Sapiranga',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'A Sapiranga é residencial, com condomínios e casas entre o Edson Queiroz e a Lagoa Redonda. Atendemos geladeiras frost free e de duas portas e freezers verticais e horizontais.',
    vizinhos: ['Edson Queiroz', 'Lagoa Redonda', 'Alagadiço Novo', 'Sabiaguaba'],
  },
  {
    slug: 'alagadico-novo',
    nome: 'Alagadiço Novo',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Alagadiço Novo é residencial, perto do Cambeba e de Messejana. Fazemos conserto de geladeira, troca de termostato e resistência e carga de gás com laudo.',
    vizinhos: ['Sapiranga', 'Cambeba', 'Messejana', 'Lagoa Redonda'],
  },
  {
    slug: 'curio',
    nome: 'Curió',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Curió é um bairro residencial perto de Messejana. Atendemos geladeiras e freezers de casa e de pequenos comércios, 24 horas, com chegada rápida.',
    vizinhos: ['Messejana', 'Guajeru', 'Lagoa Redonda', 'Coaçu'],
  },
  {
    slug: 'guajeru',
    nome: 'Guajeru',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Guajeru é residencial, vizinho de Messejana. Consertamos geladeira que não gela, freezer que não congela e fazemos troca de compressor e borracha de vedação.',
    vizinhos: ['Messejana', 'Curió', 'Coaçu', 'Paupina'],
  },
  {
    slug: 'coacu',
    nome: 'Coaçu',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Coaçu é um bairro residencial no extremo sudeste de Fortaleza. Atendemos geladeiras e freezers das famílias do bairro, com 1 ano de garantia.',
    vizinhos: ['Paupina', 'Guajeru', 'Curió', 'Lagoa Redonda'],
  },
  {
    slug: 'paupina',
    nome: 'Paupina',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'A Paupina é residencial, com casas e comércio local ao sul de Messejana. Fazemos conserto de geladeira e freezer e carga de gás com laudo, a qualquer hora.',
    vizinhos: ['Messejana', 'Coaçu', 'Pedras', 'Ancuri'],
  },
  {
    slug: 'parque-manibura',
    nome: 'Parque Manibura',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Parque Manibura tem condomínios e casas perto da Avenida Washington Soares. Atendemos geladeiras de duas portas e frost free e freezers verticais.',
    vizinhos: ['Cambeba', 'Cidade dos Funcionários', 'Sapiranga', 'Edson Queiroz'],
  },
  {
    slug: 'cambeba',
    nome: 'Cambeba',
    regiao: 'regional-6',
    perfil: 'misto',
    sobre:
      'O Cambeba reúne o Centro Administrativo do Estado, condomínios e comércio. Atendemos geladeiras residenciais e freezers e câmaras frias de restaurantes e lanchonetes da região.',
    vizinhos: ['Messejana', 'Parque Manibura', 'Cidade dos Funcionários', 'Alagadiço Novo'],
  },
  {
    slug: 'pedras',
    nome: 'Pedras',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O bairro Pedras fica no extremo sul de Fortaleza, com casas e comércio local. Atendemos geladeiras e freezers 24 horas, com chegada rápida e 1 ano de garantia.',
    vizinhos: ['Ancuri', 'Paupina', 'Jangurussu', 'Messejana'],
  },
  {
    slug: 'jardim-das-oliveiras',
    nome: 'Jardim das Oliveiras',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Jardim das Oliveiras é residencial, com muitas casas e comércio de bairro. Consertamos geladeira, freezer e fazemos troca de motor, termostato e sensor de temperatura.',
    vizinhos: ['Cidade dos Funcionários', 'Aerolândia', 'Cajazeiras', 'Messejana'],
  },
  {
    slug: 'parque-iracema',
    nome: 'Parque Iracema',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Parque Iracema é um bairro residencial perto da Cidade dos Funcionários. Atendemos geladeiras de duas portas e freezers verticais e horizontais com conserto e manutenção.',
    vizinhos: ['Cidade dos Funcionários', 'Cambeba', 'Parque Manibura', 'Jardim das Oliveiras'],
  },
  {
    slug: 'dias-macedo',
    nome: 'Dias Macedo',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Dias Macedo é residencial, perto da BR-116 e da Arena Castelão. Fazemos conserto de geladeira, troca de compressor e carga de gás com laudo, 24 horas.',
    vizinhos: ['Alto da Balança', 'Aerolândia', 'Boa Vista / Castelão', 'Passaré'],
  },
  {
    slug: 'mata-galinha',
    nome: 'Mata Galinha',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Mata Galinha é um bairro residencial perto do Castelão. Atendemos geladeiras e freezers de casa e de pequenos comércios, com chegada em até 20 minutos.',
    vizinhos: ['Boa Vista / Castelão', 'Cajazeiras', 'Barroso', 'Passaré'],
  },
  {
    slug: 'cajazeiras',
    nome: 'Cajazeiras',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Cajazeiras é residencial, com casas e comércio de bairro. Consertamos geladeira que não gela e freezer com excesso de gelo, com troca de termostato e resistência.',
    vizinhos: ['Jardim das Oliveiras', 'Barroso', 'Mata Galinha', 'Aerolândia'],
  },
  {
    slug: 'passare',
    nome: 'Passaré',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Passaré é um bairro grande e residencial da Regional VI. Atendemos geladeiras de uma e duas portas e freezers de casas, mercadinhos e bares, 24 horas.',
    vizinhos: ['Boa Vista / Castelão', 'Dendê', 'Jangurussu', 'Barroso'],
  },
  {
    slug: 'parque-dois-irmaos',
    nome: 'Parque Dois Irmãos',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'O Parque Dois Irmãos é residencial, perto do Passaré. Fazemos conserto de geladeira e freezer, solda e recarga de gás com laudo, com 1 ano de garantia.',
    vizinhos: ['Passaré', 'Planalto Ayrton Senna', 'Jangurussu', 'Conjunto José Walter'],
  },
  {
    slug: 'lagoa-redonda',
    nome: 'Lagoa Redonda',
    regiao: 'regional-6',
    perfil: 'residencial',
    sobre:
      'A Lagoa Redonda tem casas, sítios e condomínios no caminho da Sabiaguaba. Atendemos geladeiras e freezers residenciais e de pequenos comércios, a qualquer hora.',
    vizinhos: ['Sabiaguaba', 'Curió', 'Sapiranga', 'Coaçu'],
  },
];

export function bairroPath(b: Bairro) {
  return `/conserto-de-geladeira-em-${b.slug}/`;
}

export function getRegiao(id: RegiaoId) {
  return regioes.find((r) => r.id === id)!;
}

// "Regional II (Leste)" ou "Centro"
export function regiaoLabel(r: Regiao) {
  return r.id === 'centro' ? r.nome : `${r.nome} (${r.apelido})`;
}

export function bairrosPorRegiao() {
  return regioes
    .map((regiao) => ({
      regiao,
      bairros: bairros.filter((b) => b.regiao === regiao.id).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')),
    }))
    .filter((g) => g.bairros.length > 0);
}

export function bairroPorNome(nome: string) {
  return bairros.find((b) => b.nome === nome);
}
