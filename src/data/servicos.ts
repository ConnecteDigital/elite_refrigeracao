import type { IconName } from './icons';

export interface Faq {
  q: string;
  a: string;
}

export interface Servico {
  slug: string;
  nome: string;
  // Palavra-chave principal da página (usada no H1 e no title)
  keyword: string;
  resumo: string;
  metaDescription: string;
  icon: IconName;
  intro: string[];
  sinais: string[];
  comoFazemos: string[];
  faq: Faq[];
  destaque?: boolean;
}

export const servicos: Servico[] = [
  {
    slug: 'conserto-de-geladeira',
    nome: 'Conserto de Geladeira',
    keyword: 'Conserto de geladeira 24 horas em Fortaleza',
    resumo: 'Geladeira que não gela, não liga, faz barulho ou vaza água. Uma e duas portas, todas as marcas.',
    metaDescription:
      'Conserto de geladeira 24h em Fortaleza: não gela, não liga, vaza água ou faz barulho. Chegamos em até 20 minutos, visita grátis e 1 ano de garantia.',
    icon: 'fridge',
    destaque: true,
    intro: [
      'Geladeira parada em Fortaleza é comida estragando em poucas horas. A Elite Refrigeração atende 24 horas, inclusive à noite, nos fins de semana e feriados, e chega em até 20 minutos para descobrir o defeito e resolver.',
      'Consertamos geladeiras de uma e duas portas, frost free e degelo manual, das marcas Brastemp, Consul, Electrolux, GE, Bosch, Mabe, LG e Samsung. O diagnóstico é feito no local, com manifold e equipamentos próprios, e a visita é gratuita.',
    ],
    sinais: [
      'A geladeira liga, mas não gela ou gela pouco',
      'O freezer congela e a parte de baixo fica quente',
      'Água acumulando embaixo da geladeira ou dentro das gavetas',
      'Barulho alto, estalos ou o motor ligando e desligando sem parar',
      'Gelo em excesso no fundo ou na parede do freezer',
      'A geladeira não liga ou desarma o disjuntor',
    ],
    comoFazemos: [
      'Ouvimos o que está acontecendo e já saímos para o endereço',
      'Medimos pressão, temperatura e corrente para achar a causa real',
      'Explicamos o defeito encontrado',
      'Fazemos o reparo e testamos a geladeira funcionando',
    ],
    faq: [
      {
        q: 'A visita para avaliar a geladeira é cobrada?',
        a: 'Não. A visita é gratuita: o técnico vai até você, faz o diagnóstico e explica o defeito.',
      },
      {
        q: 'Vocês consertam geladeira frost free?',
        a: 'Sim. Atendemos geladeiras frost free e de degelo manual, de uma e duas portas, de todas as principais marcas.',
      },
      {
        q: 'O conserto de geladeira tem garantia?',
        a: 'Sim. Todos os serviços da Elite Refrigeração têm 1 ano de garantia.',
      },
    ],
  },
  {
    slug: 'conserto-de-freezer',
    nome: 'Conserto de Freezer',
    keyword: 'Conserto de freezer horizontal e vertical em Fortaleza',
    resumo: 'Freezer que não congela, forma gelo demais ou não liga. Horizontal e vertical, casa ou comércio.',
    metaDescription:
      'Conserto de freezer horizontal e vertical em Fortaleza, 24 horas. Termostato, resistência, vedação, gás e compressor. Chegamos em até 20 minutos.',
    icon: 'freezer',
    destaque: true,
    intro: [
      'Freezer parado em sorveteria, açaíteria, mercadinho ou bar é prejuízo que cresce a cada hora. Por isso a Elite Refrigeração atende freezer horizontal e vertical 24 horas em Fortaleza, com chegada em até 20 minutos.',
      'Trocamos termostato, resistência e borracha de vedação, fazemos solda, carga de gás com laudo e troca de compressor. Atendemos freezers de casa e de comércio, de tampa de vidro ou tampa cega.',
    ],
    sinais: [
      'O freezer não congela ou o sorvete fica mole',
      'Gelo grosso nas paredes ou na tampa',
      'A tampa não fecha direito ou a borracha está rasgada',
      'O motor não desliga nunca, ou não liga',
      'Água escorrendo por baixo do freezer',
    ],
    comoFazemos: [
      'Verificamos temperatura, termostato e vedação da tampa',
      'Medimos a pressão do gás com manifold para achar vazamentos',
      'Trocamos a peça com defeito ou fazemos a solda e a carga',
      'Deixamos o freezer funcionando e conferimos a temperatura',
    ],
    faq: [
      {
        q: 'Vocês atendem freezer de comércio?',
        a: 'Sim. Atendemos freezers horizontais e verticais de sorveterias, açaíterias, mercadinhos, bares, restaurantes e padarias, a qualquer hora.',
      },
      {
        q: 'Freezer com gelo demais tem conserto?',
        a: 'Na maioria das vezes, sim. Costuma ser borracha de vedação gasta, termostato desregulado ou resistência de degelo queimada. O técnico confirma no local.',
      },
    ],
  },
  {
    slug: 'conserto-de-camara-fria',
    nome: 'Conserto de Câmara Fria',
    keyword: 'Conserto e manutenção de câmara fria em Fortaleza',
    resumo: 'Câmara fria que não chega na temperatura, forma gelo ou parou. Atendimento 24h para o seu negócio.',
    metaDescription:
      'Conserto e manutenção de câmara fria em Fortaleza, 24 horas. Carga de gás com laudo, solda, termostato e vedação. Chegamos em até 20 minutos.',
    icon: 'coldroom',
    destaque: true,
    intro: [
      'Uma câmara fria parada pode comprometer todo o estoque de um restaurante, açougue, mercado ou distribuidora. A Elite Refrigeração atende câmara fria 24 horas em Fortaleza e chega em até 20 minutos para conter o problema.',
      'Fazemos diagnóstico do sistema de refrigeração, detecção de vazamento de gás, solda de tubulação, recarga de gás com laudo, troca de termostato e controlador e revisão da vedação da porta.',
    ],
    sinais: [
      'A temperatura não baixa ou sobe ao longo do dia',
      'Gelo acumulado no evaporador ou no piso',
      'Porta que não veda e deixa o frio escapar',
      'O sistema desarma ou faz barulho fora do normal',
    ],
    comoFazemos: [
      'Avaliamos temperatura, pressões e o funcionamento do controlador',
      'Localizamos vazamentos e pontos de perda de frio',
      'Fazemos o reparo, a solda ou a carga de gás necessária',
      'Conferimos o funcionamento e a temperatura da câmara',
    ],
    faq: [
      {
        q: 'Vocês atendem câmara fria de madrugada?',
        a: 'Sim. O atendimento é 24 horas, todos os dias, e chegamos em até 20 minutos.',
      },
      {
        q: 'A carga de gás da câmara fria sai com laudo?',
        a: 'Sim. A recarga de gás refrigerante é feita com laudo.',
      },
    ],
  },
  {
    slug: 'troca-de-compressor',
    nome: 'Troca de Compressor (Motor)',
    keyword: 'Troca de compressor de geladeira e freezer em Fortaleza',
    resumo: 'Motor da geladeira queimado ou travado? Trocamos o compressor com vácuo, solda e carga de gás.',
    metaDescription:
      'Troca de compressor (motor) de geladeira e freezer em Fortaleza. Vácuo, solda e carga de gás com laudo. Atendimento 24h, chegamos em até 20 minutos.',
    icon: 'compressor',
    intro: [
      'O compressor é o motor da geladeira: é ele que faz o gás circular e gerar frio. Quando ele queima, trava ou perde força, a geladeira liga mas não gela, ou nem liga.',
      'Antes de trocar, testamos relé, protetor térmico e partida, porque muitas vezes o defeito está nessas peças e não no motor. Quando a troca é necessária, instalamos o compressor novo com solda, vácuo na tubulação e carga de gás com laudo.',
    ],
    sinais: [
      'O motor faz um clique, tenta ligar e desliga',
      'O motor esquenta muito e a geladeira não gela',
      'Barulho forte de batida vindo de trás da geladeira',
      'A geladeira desarma o disjuntor quando o motor liga',
    ],
    comoFazemos: [
      'Testamos o compressor, o relé e o protetor térmico',
      'Se for o motor, retiramos o antigo e instalamos o novo',
      'Fazemos solda, vácuo na tubulação e carga de gás',
      'Testamos pressões, corrente e temperatura antes de liberar',
    ],
    faq: [
      {
        q: 'Vale a pena trocar o motor da geladeira?',
        a: 'Depende da idade e do estado da geladeira. O técnico avalia no local e explica se a troca compensa, para você decidir com segurança.',
      },
      {
        q: 'Troca de compressor tem garantia?',
        a: 'Sim. O serviço tem 1 ano de garantia.',
      },
    ],
  },
  {
    slug: 'carga-de-gas',
    nome: 'Carga de Gás com Laudo',
    keyword: 'Recarga de gás de geladeira e freezer com laudo em Fortaleza',
    resumo: 'Recarga de gás refrigerante com vácuo, medição de pressão e laudo do serviço.',
    metaDescription:
      'Recarga de gás de geladeira, freezer e câmara fria em Fortaleza, com laudo. Detecção de vazamento antes da carga. Atendimento 24h, até 20 minutos.',
    icon: 'gauge',
    intro: [
      'Geladeira sem gás não gela. Mas gás não “acaba” sozinho: se está faltando, existe um vazamento. Por isso, antes da recarga, localizamos e corrigimos o vazamento, senão o problema volta em poucos dias.',
      'Depois do reparo, fazemos vácuo na tubulação e a carga com a quantidade certa de gás refrigerante para o seu aparelho, medindo as pressões com manifold. A recarga de gás sai com laudo.',
    ],
    sinais: [
      'A geladeira funciona o tempo todo e gela pouco',
      'O freezer até forma um pouco de gelo, mas a parte de baixo fica quente',
      'O motor está ligado, mas a grade de trás não esquenta',
      'Mancha de óleo perto dos tubos ou do motor',
    ],
    comoFazemos: [
      'Medimos as pressões do sistema com manifold',
      'Localizamos e corrigimos o vazamento',
      'Fazemos vácuo e a carga de gás na medida certa',
      'Entregamos o laudo do serviço',
    ],
    faq: [
      {
        q: 'A carga de gás sai com laudo?',
        a: 'Sim. Toda recarga de gás refrigerante feita pela Elite Refrigeração sai com laudo.',
      },
      {
        q: 'Por que precisa achar o vazamento antes de colocar gás?',
        a: 'Porque o gás circula num sistema fechado. Se faltou gás, há um furo. Sem corrigir o furo, a geladeira volta a parar de gelar em pouco tempo.',
      },
    ],
  },
  {
    slug: 'vazamento-de-gas-e-solda',
    nome: 'Vazamento de Gás e Solda',
    keyword: 'Detecção de vazamento de gás e solda de tubulação de geladeira',
    resumo: 'Localizamos o vazamento de gás e fazemos a solda da tubulação de geladeira, freezer e câmara fria.',
    metaDescription:
      'Detecção de vazamento de gás e solda de tubulação de geladeira, freezer e câmara fria em Fortaleza. 24 horas, chegamos em até 20 minutos.',
    icon: 'flame',
    intro: [
      'Em Fortaleza, a maresia acelera a corrosão de tubos e serpentinas, principalmente nos bairros perto da praia. Com o tempo aparecem microfuros e o gás vai embora aos poucos, até a geladeira parar de gelar.',
      'Localizamos o ponto exato do vazamento, fazemos a solda da tubulação e, em seguida, o vácuo e a recarga de gás com laudo, para o aparelho voltar a gelar como antes.',
    ],
    sinais: [
      'A geladeira gelava bem e foi perdendo força com o tempo',
      'Já colocou gás e voltou a parar depois de alguns dias',
      'Mancha de óleo nos tubos ou embaixo do motor',
      'Tubos ou serpentina com ferrugem ou esverdeados',
    ],
    comoFazemos: [
      'Pressurizamos o sistema e procuramos o vazamento',
      'Fazemos a solda no ponto danificado',
      'Testamos a estanqueidade antes de colocar gás',
      'Fazemos vácuo e a carga de gás com laudo',
    ],
    faq: [
      {
        q: 'Todo vazamento de gás tem conserto?',
        a: 'A maioria, sim, com solda no ponto do furo. Quando o vazamento está dentro do gabinete, o técnico explica as opções de reparo.',
      },
      {
        q: 'Morar perto da praia estraga a geladeira?',
        a: 'A maresia acelera a corrosão de partes metálicas, como tubos e serpentina. Uma manutenção preventiva ajuda a identificar o problema cedo.',
      },
    ],
  },
  {
    slug: 'troca-de-termostato-e-sensor',
    nome: 'Termostato e Sensor de Temperatura',
    keyword: 'Troca de termostato e sensor de temperatura de geladeira e freezer',
    resumo: 'Geladeira que congela tudo ou não desliga? Trocamos termostato e sensor de temperatura.',
    metaDescription:
      'Troca de termostato e sensor de temperatura de geladeira e freezer em Fortaleza. Atendimento 24h, chegamos em até 20 minutos, 1 ano de garantia.',
    icon: 'thermometer',
    intro: [
      'O termostato e o sensor de temperatura dizem para a geladeira quando ligar e desligar o motor. Quando falham, a geladeira congela tudo, inclusive verduras, ou fica quente mesmo com o motor funcionando.',
      'Testamos o termostato, os sensores e a placa e trocamos apenas a peça com defeito, regulando a temperatura para o seu uso.',
    ],
    sinais: [
      'Tudo congelando na parte de baixo da geladeira',
      'O motor não desliga nunca',
      'O motor não liga, mesmo com a geladeira quente',
      'O painel mostra temperatura errada ou código de erro',
    ],
    comoFazemos: [
      'Medimos a temperatura real em cada compartimento',
      'Testamos termostato, sensores e placa',
      'Trocamos a peça com defeito',
      'Regulamos e conferimos o funcionamento',
    ],
    faq: [
      {
        q: 'Geladeira congelando tudo é termostato?',
        a: 'É uma das causas mais comuns, junto com o sensor de temperatura e o damper (a portinha que controla o ar frio). O técnico testa no local para confirmar.',
      },
    ],
  },
  {
    slug: 'troca-de-resistencia',
    nome: 'Troca de Resistência de Degelo',
    keyword: 'Troca de resistência de degelo de geladeira e freezer',
    resumo: 'Gelo acumulado no fundo do freezer e geladeira quente: trocamos a resistência de degelo.',
    metaDescription:
      'Troca de resistência de degelo de geladeira frost free e freezer em Fortaleza. Atendimento 24h, chegamos em até 20 minutos, 1 ano de garantia.',
    icon: 'heat',
    intro: [
      'Nas geladeiras frost free e em muitos freezers, a resistência derrete o gelo que se forma no evaporador. Quando ela queima, o gelo vai se acumulando, bloqueia a passagem de ar frio e a geladeira para de gelar embaixo.',
      'Testamos a resistência, o termostato de degelo e o timer ou placa, e trocamos o que estiver com defeito.',
    ],
    sinais: [
      'Bloco de gelo no fundo do freezer',
      'O freezer gela, mas a parte de baixo fica quente',
      'Água pingando dentro da geladeira depois de desligar',
    ],
    comoFazemos: [
      'Retiramos o painel do evaporador e avaliamos o gelo',
      'Testamos a resistência e o termostato de degelo',
      'Trocamos a peça com defeito',
      'Fazemos o degelo completo e testamos o ciclo',
    ],
    faq: [
      {
        q: 'Posso só desligar a geladeira para derreter o gelo?',
        a: 'Ajuda por alguns dias, mas se a resistência estiver queimada o gelo volta a se formar. A troca resolve a causa.',
      },
    ],
  },
  {
    slug: 'troca-de-borracha-de-geladeira',
    nome: 'Borracha de Vedação da Porta',
    keyword: 'Troca de borracha de vedação de geladeira e freezer',
    resumo: 'Porta que não veda deixa o frio escapar. Trocamos a borracha de geladeira e freezer.',
    metaDescription:
      'Troca de borracha de vedação de porta de geladeira e freezer horizontal e vertical em Fortaleza. Atendimento 24h, chegamos em até 20 minutos.',
    icon: 'seal',
    intro: [
      'Borracha ressecada, rasgada ou descolada deixa o ar quente entrar. A geladeira trabalha o dia inteiro, gasta mais energia, forma gelo demais e mesmo assim não gela direito.',
      'Trocamos a borracha de vedação de geladeiras e de freezers horizontais e verticais e ajustamos a porta ou a tampa para fechar certinho.',
    ],
    sinais: [
      'A porta não “gruda” ao fechar',
      'Borracha rasgada, ressecada ou com mofo',
      'Gelo se formando perto da porta ou da tampa',
      'Suor (água) na lateral da porta',
    ],
    comoFazemos: [
      'Testamos a vedação em toda a volta da porta',
      'Retiramos a borracha antiga',
      'Instalamos a borracha nova e ajustamos a porta',
      'Conferimos se a vedação ficou completa',
    ],
    faq: [
      {
        q: 'Como sei se a borracha da geladeira está ruim?',
        a: 'Feche a porta prendendo uma folha de papel. Se o papel sair fácil em algum ponto, a vedação está falhando ali.',
      },
    ],
  },
  {
    slug: 'manutencao-preventiva',
    nome: 'Manutenção Preventiva',
    keyword: 'Manutenção de geladeira, freezer e câmara fria em Fortaleza',
    resumo: 'Revisão completa para evitar parada: limpeza do condensador, vedação, pressões e elétrica.',
    metaDescription:
      'Manutenção preventiva de geladeira, freezer e câmara fria em Fortaleza, para casas e comércios. Evite parada e prejuízo. Atendimento 24h.',
    icon: 'wrench',
    intro: [
      'No calor de Fortaleza, geladeiras, freezers e câmaras frias trabalham no limite o ano inteiro. Uma revisão periódica evita a parada no pior momento, como num fim de semana de movimento no seu comércio.',
      'Na manutenção preventiva limpamos o condensador, conferimos a vedação, medimos pressões e corrente do motor e verificamos a parte elétrica, apontando qualquer peça que esteja perto de dar problema.',
    ],
    sinais: [
      'Aparelho com mais de dois anos sem nenhuma revisão',
      'Conta de energia subindo sem motivo',
      'Motor ligando por muito tempo seguido',
      'Comércio que depende do frio para não perder mercadoria',
    ],
    comoFazemos: [
      'Limpamos o condensador e a parte de trás',
      'Medimos pressões, temperatura e corrente',
      'Revisamos vedação, dreno e parte elétrica',
      'Apontamos as peças que precisam de atenção',
    ],
    faq: [
      {
        q: 'De quanto em quanto tempo fazer manutenção?',
        a: 'Para comércio, o ideal é revisar a cada 3 a 6 meses. Em casa, uma vez por ano já ajuda bastante, principalmente perto da praia.',
      },
    ],
  },
];

export const servicosDestaque = servicos.filter((s) => s.destaque);

export function getServico(slug: string) {
  return servicos.find((s) => s.slug === slug);
}
