export type Zona = 'Zona Leste' | 'Centro' | 'Zona Oeste' | 'Zona Sul';

export interface Bairro {
  slug: string;
  nome: string;
  zona: Zona;
  // Texto exclusivo da página para não repetir conteúdo entre bairros
  sobre: string;
  vizinhos: string[];
}

// Zonas em foco aparecem marcadas nas listagens (vazio = todas iguais)
export const zonasPrioritarias: Zona[] = [];
export const ordemZonas: Zona[] = ['Zona Leste', 'Centro', 'Zona Oeste', 'Zona Sul'];

export const bairros: Bairro[] = [
  // Zona Leste
  {
    slug: 'aldeota',
    nome: 'Aldeota',
    zona: 'Zona Leste',
    sobre:
      'A Aldeota reúne prédios residenciais, clínicas, escritórios e muitos restaurantes. Atendemos desde a geladeira frost free do apartamento até freezers e câmaras frias de restaurantes e lanchonetes, inclusive à noite e nos fins de semana.',
    vizinhos: ['Meireles', 'Varjota', 'Joaquim Távora', 'Dionísio Torres'],
  },
  {
    slug: 'coco',
    nome: 'Cocó',
    zona: 'Zona Leste',
    sobre:
      'No Cocó, perto do parque, predominam condomínios e prédios altos, onde geladeiras de duas portas e frost free trabalham o dia inteiro. Fazemos conserto, troca de termostato, sensor e resistência sem precisar tirar a geladeira do apartamento na maioria dos casos.',
    vizinhos: ['Papicu', 'Dionísio Torres', 'Salinas', 'Guararapes'],
  },
  {
    slug: 'papicu',
    nome: 'Papicu',
    zona: 'Zona Leste',
    sobre:
      'O Papicu mistura prédios residenciais, casas e um comércio movimentado perto do terminal. Atendemos geladeiras de casa e freezers de lanchonetes, mercadinhos e depósitos de bebidas da região.',
    vizinhos: ['Aldeota', 'Varjota', 'Cocó', 'Vicente Pinzón'],
  },
  {
    slug: 'mucuripe',
    nome: 'Mucuripe',
    zona: 'Zona Leste',
    sobre:
      'No Mucuripe, a maresia do mar chega forte e acelera a corrosão de tubos e serpentinas. É comum atendermos vazamento de gás por corrosão, com solda e recarga de gás com laudo, em casas, prédios e comércios perto da orla.',
    vizinhos: ['Meireles', 'Varjota', 'Cais do Porto', 'Vicente Pinzón'],
  },
  {
    slug: 'cais-do-porto',
    nome: 'Cais do Porto',
    zona: 'Zona Leste',
    sobre:
      'No Cais do Porto, perto do porto do Mucuripe, muitos negócios dependem de frio para conservar pescado e bebidas. Atendemos câmaras frias e freezers horizontais 24 horas, além das geladeiras das casas do bairro.',
    vizinhos: ['Mucuripe', 'Vicente Pinzón', 'Praia do Futuro', 'Papicu'],
  },
  {
    slug: 'praia-do-futuro',
    nome: 'Praia do Futuro',
    zona: 'Zona Leste',
    sobre:
      'Na Praia do Futuro, as barracas de praia e os restaurantes trabalham com freezers e câmaras frias cheios, e a maresia castiga qualquer equipamento. Fazemos manutenção preventiva, solda de tubulação e conserto rápido para o seu negócio não parar.',
    vizinhos: ['Cais do Porto', 'Vicente Pinzón', 'Edson Queiroz', 'Sabiaguaba'],
  },
  {
    slug: 'edson-queiroz',
    nome: 'Edson Queiroz',
    zona: 'Zona Leste',
    sobre:
      'O Edson Queiroz cresceu com condomínios de casas e prédios, além do movimento em torno da Unifor. Atendemos geladeiras de casa, freezers de repúblicas e lanchonetes e câmaras frias de restaurantes da região.',
    vizinhos: ['Cocó', 'Guararapes', 'Cidade dos Funcionários', 'Sapiranga'],
  },
  {
    slug: 'guararapes',
    nome: 'Guararapes',
    zona: 'Zona Leste',
    sobre:
      'O Guararapes é um bairro de condomínios e casas amplas, com muitas geladeiras de duas portas e freezers verticais. Atendemos conserto, troca de borracha de vedação, termostato e compressor com chegada em até 20 minutos.',
    vizinhos: ['Cocó', 'Edson Queiroz', 'Salinas', 'Engenheiro Luciano Cavalcante'],
  },
  // Centro
  {
    slug: 'centro',
    nome: 'Centro',
    zona: 'Centro',
    sobre:
      'O Centro de Fortaleza tem comércio intenso, lanchonetes, restaurantes e lojas que dependem de freezers e expositores funcionando o dia todo. Atendemos 24 horas, com chegada rápida para o seu comércio não perder mercadoria.',
    vizinhos: ['Praia de Iracema', 'Jacarecanga', 'Farias Brito', 'José Bonifácio'],
  },
  {
    slug: 'praia-de-iracema',
    nome: 'Praia de Iracema',
    zona: 'Centro',
    sobre:
      'A Praia de Iracema concentra bares, restaurantes e prédios residenciais perto do mar. Freezers de bebidas e câmaras frias sofrem com a maresia e com o uso intenso; fazemos manutenção, solda e carga de gás com laudo.',
    vizinhos: ['Centro', 'Meireles', 'Aldeota', 'Moura Brasil'],
  },
  {
    slug: 'jacarecanga',
    nome: 'Jacarecanga',
    zona: 'Centro',
    sobre:
      'A Jacarecanga, ao lado do Centro, tem casas antigas, oficinas e pequenos comércios. Atendemos geladeiras de uma e duas portas, freezers e câmaras frias de mercadinhos e depósitos do bairro.',
    vizinhos: ['Centro', 'Farias Brito', 'Carlito Pamplona', 'Moura Brasil'],
  },
  {
    slug: 'farias-brito',
    nome: 'Farias Brito',
    zona: 'Centro',
    sobre:
      'O Farias Brito é um bairro residencial e de comércio de rua entre o Centro e a Bezerra de Menezes. Fazemos conserto de geladeira, troca de compressor e carga de gás em casas, apartamentos e lojas da região.',
    vizinhos: ['Centro', 'Jacarecanga', 'São Gerardo', 'Monte Castelo'],
  },
  {
    slug: 'benfica',
    nome: 'Benfica',
    zona: 'Centro',
    sobre:
      'O Benfica tem muitos estudantes, repúblicas, bares e restaurantes por causa das universidades. Geladeira de república parada não espera: atendemos 24 horas e também cuidamos dos freezers e câmaras frias dos comércios do bairro.',
    vizinhos: ['Fátima', 'José Bonifácio', 'Jardim América', 'Rodolfo Teófilo'],
  },
  {
    slug: 'fatima',
    nome: 'Fátima',
    zona: 'Centro',
    sobre:
      'O bairro de Fátima, em volta da Avenida 13 de Maio e do santuário, é residencial com comércio forte. Atendemos geladeiras frost free, freezers verticais e horizontais e câmaras frias de restaurantes e padarias.',
    vizinhos: ['Benfica', 'Joaquim Távora', 'Parreão', 'José Bonifácio'],
  },
  {
    slug: 'joaquim-tavora',
    nome: 'Joaquim Távora',
    zona: 'Centro',
    sobre:
      'O Joaquim Távora fica entre o Centro e a Aldeota e tem casas, prédios e muitos pequenos negócios. Fazemos conserto de geladeira e freezer, troca de termostato, resistência e borracha de vedação.',
    vizinhos: ['Aldeota', 'Fátima', 'Dionísio Torres', 'José Bonifácio'],
  },
  // Zona Oeste
  {
    slug: 'barra-do-ceara',
    nome: 'Barra do Ceará',
    zona: 'Zona Oeste',
    sobre:
      'Na Barra do Ceará, onde o rio encontra o mar, a maresia é forte e os tubos de cobre e a serpentina corroem mais rápido. Atendemos vazamento de gás, solda e recarga com laudo, além de conserto geral de geladeira e freezer.',
    vizinhos: ['Cristo Redentor', 'Pirambu', 'Vila Velha', 'Jardim Iracema'],
  },
  {
    slug: 'pirambu',
    nome: 'Pirambu',
    zona: 'Zona Oeste',
    sobre:
      'O Pirambu, no litoral oeste, é um bairro populoso com muitas casas e comércios pequenos. Atendemos geladeiras de uma e duas portas e freezers de mercadinhos e bares, com a maresia sempre no radar do diagnóstico.',
    vizinhos: ['Cristo Redentor', 'Carlito Pamplona', 'Jacarecanga', 'Barra do Ceará'],
  },
  {
    slug: 'cristo-redentor',
    nome: 'Cristo Redentor',
    zona: 'Zona Oeste',
    sobre:
      'No Cristo Redentor, perto da praia, as geladeiras sofrem com a umidade e o sal do ar. Fazemos conserto, troca de compressor e manutenção preventiva para evitar que a geladeira pare de gelar de repente.',
    vizinhos: ['Pirambu', 'Barra do Ceará', 'Álvaro Weyne', 'Carlito Pamplona'],
  },
  {
    slug: 'carlito-pamplona',
    nome: 'Carlito Pamplona',
    zona: 'Zona Oeste',
    sobre:
      'O Carlito Pamplona tem casas, galpões e comércio ao longo das avenidas. Atendemos geladeiras de casa e câmaras frias e freezers de distribuidoras, depósitos e mercados do bairro.',
    vizinhos: ['Pirambu', 'Jacarecanga', 'Álvaro Weyne', 'Cristo Redentor'],
  },
  {
    slug: 'alvaro-weyne',
    nome: 'Álvaro Weyne',
    zona: 'Zona Oeste',
    sobre:
      'O Álvaro Weyne é um bairro residencial e de comércio de rua na zona oeste. Consertamos geladeiras que não gelam, freezers com gelo demais e fazemos carga de gás com laudo, 24 horas.',
    vizinhos: ['Carlito Pamplona', 'Vila Ellery', 'Jardim Iracema', 'Cristo Redentor'],
  },
  {
    slug: 'amadeu-furtado',
    nome: 'Amadeu Furtado',
    zona: 'Zona Oeste',
    sobre:
      'O Amadeu Furtado fica perto da Bezerra de Menezes, com prédios, casas e muito comércio. Atendemos geladeiras frost free, freezers e câmaras frias de restaurantes e lanchonetes da região.',
    vizinhos: ['Parquelândia', 'Rodolfo Teófilo', 'Monte Castelo', 'Bela Vista'],
  },
  {
    slug: 'antonio-bezerra',
    nome: 'Antônio Bezerra',
    zona: 'Zona Oeste',
    sobre:
      'O Antônio Bezerra tem comércio forte em torno do terminal e muitas casas residenciais. Atendemos 24 horas geladeiras, freezers de bares e mercadinhos e câmaras frias de açougues e frigoríficos pequenos.',
    vizinhos: ['Quintino Cunha', 'Autran Nunes', 'Padre Andrade', 'Dom Lustosa'],
  },
  {
    slug: 'autran-nunes',
    nome: 'Autran Nunes',
    zona: 'Zona Oeste',
    sobre:
      'O Autran Nunes é um bairro residencial com comércio de bairro. Fazemos conserto de geladeira de uma e duas portas, troca de motor, termostato e sensor de temperatura com 30 dias de garantia.',
    vizinhos: ['Antônio Bezerra', 'Dom Lustosa', 'Genibaú', 'Henrique Jorge'],
  },
  {
    slug: 'henrique-jorge',
    nome: 'Henrique Jorge',
    zona: 'Zona Oeste',
    sobre:
      'O Henrique Jorge tem ruas residenciais e muito comércio de bairro, com mercadinhos e lanchonetes. Atendemos geladeiras e freezers de casa e de comércio, com visita grátis e chegada em até 20 minutos.',
    vizinhos: ['João XXIII', 'Autran Nunes', 'Bonsucesso', 'Jóquei Clube'],
  },
  {
    slug: 'bonsucesso',
    nome: 'Bonsucesso',
    zona: 'Zona Oeste',
    sobre:
      'O Bonsucesso é residencial, com muitas famílias e comércio local. Fazemos conserto de geladeira que não gela, troca de borracha de vedação, resistência de degelo e carga de gás com laudo.',
    vizinhos: ['João XXIII', 'Henrique Jorge', 'Granja Portugal', 'Jóquei Clube'],
  },
  {
    slug: 'bom-jardim',
    nome: 'Bom Jardim',
    zona: 'Zona Oeste',
    sobre:
      'O Bom Jardim é um dos bairros mais populosos de Fortaleza, com comércio forte nas ruas principais. Atendemos geladeiras de casa e freezers de mercadinhos, bares e sorveterias, 24 horas por dia.',
    vizinhos: ['Granja Lisboa', 'Siqueira', 'Canindezinho', 'Granja Portugal'],
  },
  {
    slug: 'granja-lisboa',
    nome: 'Granja Lisboa',
    zona: 'Zona Oeste',
    sobre:
      'A Granja Lisboa tem muitas casas e comércio de bairro. Fazemos conserto de geladeira e freezer, troca de compressor e solda de tubulação, com visita gratuita para avaliar o defeito.',
    vizinhos: ['Bom Jardim', 'Granja Portugal', 'Siqueira', 'Canindezinho'],
  },
  {
    slug: 'bela-vista',
    nome: 'Bela Vista',
    zona: 'Zona Oeste',
    sobre:
      'A Bela Vista é residencial, com casas e pequenos comércios. Atendemos geladeiras de uma e duas portas, freezers horizontais e verticais e fazemos manutenção preventiva para quem depende do frio no trabalho.',
    vizinhos: ['Pan Americano', 'Couto Fernandes', 'Amadeu Furtado', 'Demócrito Rocha'],
  },
  // Zona Sul
  {
    slug: 'parangaba',
    nome: 'Parangaba',
    zona: 'Zona Sul',
    sobre:
      'A Parangaba, em volta da lagoa, tem um dos comércios mais fortes da cidade. Atendemos freezers e câmaras frias de lojas, restaurantes e mercados e as geladeiras das casas e apartamentos do bairro.',
    vizinhos: ['Montese', 'Itaoca', 'Vila Peri', 'Maraponga'],
  },
  {
    slug: 'messejana',
    nome: 'Messejana',
    zona: 'Zona Sul',
    sobre:
      'Messejana tem centro comercial próprio em volta da lagoa e muitos bairros residenciais ao redor. Atendemos 24 horas geladeiras, freezers e câmaras frias, com chegada em até 20 minutos.',
    vizinhos: ['Cambeba', 'Curió', 'Guajeru', 'Lagoa Redonda'],
  },
  {
    slug: 'aerolandia',
    nome: 'Aerolândia',
    zona: 'Zona Sul',
    sobre:
      'A Aerolândia fica às margens da BR-116, com casas, oficinas e comércio. Fazemos conserto de geladeira e freezer, carga de gás com laudo e troca de compressor para casas e negócios do bairro.',
    vizinhos: ['Alto da Balança', 'Dias Macedo', 'Jardim das Oliveiras', 'Cajazeiras'],
  },
  {
    slug: 'alto-da-balanca',
    nome: 'Alto da Balança',
    zona: 'Zona Sul',
    sobre:
      'O Alto da Balança é residencial e tem acesso rápido pela BR-116. Atendemos geladeiras que não gelam, freezers com excesso de gelo e trocamos termostato, sensor e resistência.',
    vizinhos: ['Aerolândia', 'Salinas', 'São João do Tauape', 'Dias Macedo'],
  },
  {
    slug: 'aeroporto',
    nome: 'Aeroporto',
    zona: 'Zona Sul',
    sobre:
      'O bairro do Aeroporto, em volta do Pinto Martins, tem casas, hotéis, restaurantes e serviços. Atendemos geladeiras de casa e freezers e câmaras frias de restaurantes e lanchonetes da região.',
    vizinhos: ['Serrinha', 'Vila União', 'Montese', 'Itaperi'],
  },
  {
    slug: 'bom-futuro',
    nome: 'Bom Futuro',
    zona: 'Zona Sul',
    sobre:
      'O Bom Futuro é um bairro residencial vizinho ao Montese e seu comércio. Fazemos conserto de geladeira de uma e duas portas, troca de borracha, termostato e carga de gás com laudo.',
    vizinhos: ['Montese', 'Vila União', 'Damas', 'Parreão'],
  },
  {
    slug: 'itaoca',
    nome: 'Itaoca',
    zona: 'Zona Sul',
    sobre:
      'A Itaoca é residencial e fica perto da Parangaba. Atendemos geladeiras e freezers de casa e de pequenos comércios, com visita grátis e 30 dias de garantia no serviço.',
    vizinhos: ['Parangaba', 'Itaperi', 'Vila Peri', 'Serrinha'],
  },
  {
    slug: 'itaperi',
    nome: 'Itaperi',
    zona: 'Zona Sul',
    sobre:
      'O Itaperi tem casas, repúblicas e comércio em volta do campus da UECE. Atendemos geladeiras de estudantes e famílias e freezers de lanchonetes e mercadinhos, 24 horas.',
    vizinhos: ['Serrinha', 'Dendê', 'Parangaba', 'Itaoca'],
  },
  {
    slug: 'boa-vista-castelao',
    nome: 'Boa Vista / Castelão',
    zona: 'Zona Sul',
    sobre:
      'O Boa Vista, perto da Arena Castelão, tem casas e um comércio que lota em dia de jogo. Freezer de bebida parado nessa hora é prejuízo: atendemos 24 horas e chegamos em até 20 minutos.',
    vizinhos: ['Passaré', 'Dias Macedo', 'Cajazeiras', 'Mata Galinha'],
  },
  {
    slug: 'cidade-dos-funcionarios',
    nome: 'Cidade dos Funcionários',
    zona: 'Zona Sul',
    sobre:
      'A Cidade dos Funcionários é residencial, com casas grandes e condomínios perto da Washington Soares. Atendemos geladeiras de duas portas, frost free e freezers verticais com conserto e manutenção preventiva.',
    vizinhos: ['Cambeba', 'Parque Manibura', 'Jardim das Oliveiras', 'Edson Queiroz'],
  },
  {
    slug: 'barroso',
    nome: 'Barroso',
    zona: 'Zona Sul',
    sobre:
      'O Barroso é um bairro residencial com comércio de bairro. Fazemos conserto de geladeira e freezer, troca de compressor, solda e carga de gás com laudo.',
    vizinhos: ['Jangurussu', 'Passaré', 'Cajazeiras', 'Ancuri'],
  },
  {
    slug: 'jangurussu',
    nome: 'Jangurussu',
    zona: 'Zona Sul',
    sobre:
      'O Jangurussu é grande e populoso, com muitas casas e comércio local. Atendemos geladeiras de uma e duas portas e freezers de mercadinhos e bares, 24 horas por dia.',
    vizinhos: ['Barroso', 'Ancuri', 'Passaré', 'Messejana'],
  },
  {
    slug: 'ancuri',
    nome: 'Ancuri',
    zona: 'Zona Sul',
    sobre:
      'O Ancuri fica no extremo sul de Fortaleza, com ruas residenciais e comércio de bairro. Atendemos conserto de geladeira, freezer e troca de borracha de vedação, com visita gratuita.',
    vizinhos: ['Jangurussu', 'Pedras', 'Messejana', 'Barroso'],
  },
];

export function bairroPath(b: Bairro) {
  return `/conserto-de-geladeira-em-${b.slug}/`;
}

export function bairrosPorZona() {
  return ordemZonas
    .map((zona) => ({ zona, bairros: bairros.filter((b) => b.zona === zona) }))
    .filter((g) => g.bairros.length > 0);
}
