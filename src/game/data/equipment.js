
const equipment = [
  {
    id: 'apollo-lm',
    name: 'Apollo Lunar Module - Eagle',
    location: 'Lua',
    year: '1969',
    mission: 'Apollo 11',
    x: 220,
    y: 250,
    color: 0xfacc15,
    textures: ['apollo-eagle'],

    description:
      'O Eagle foi o módulo lunar da missão Apollo 11, responsável por transportar Neil Armstrong e Buzz Aldrin até a superfície da Lua. O pouso aconteceu em 20 de julho de 1969, na região conhecida como Mar da Tranquilidade. O veículo era composto por dois estágios que desempenhavam funções diferentes durante a operação lunar.',

    scientificContext:
      'O estágio de descida era responsável pelo pouso e continha o motor utilizado na aproximação à superfície, além dos equipamentos necessários às atividades lunares. Ele permaneceu na Lua após a missão. Já o estágio de ascensão possuía o compartimento pressurizado dos astronautas e o motor que permitiu seu retorno à órbita lunar, onde reencontraram o módulo de comando. A nave também utilizava sistemas de orientação, navegação, comunicação e controle ambiental. Durante a missão, os astronautas instalaram separadamente o EASEP, um conjunto de experimentos científicos que incluía um sismômetro passivo e um detector de poeira lunar.',

    legacy:
      'A Apollo 11 marcou a primeira vez que seres humanos pousaram e caminharam na superfície da Lua. Além do feito histórico, a missão permitiu coletar amostras de rochas e solo lunar e instalar instrumentos científicos que continuariam fornecendo informações após a partida dos astronautas.',

    clue:
      'Como a divisão do módulo lunar em dois estágios tornou possível pousar na Lua e depois retornar à órbita lunar?',

    sourceName:
      'NASA - Space Science Data Coordinated Archive (Apollo 11 LM/EASEP)',

    source:
      'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C'
  },

  {
    id: 'alsep',
    name: 'ALSEP',
    location: 'Lua',
    year: '1969–1977',
    mission: 'Apollo 12',
    x: 700,
    y: 170,
    color: 0x38bdf8,
    textures: ['alsep'],

    description:
      'O Apollo Lunar Surface Experiments Package (ALSEP) foi um conjunto de instrumentos científicos instalado pelos astronautas da Apollo 12 na superfície lunar, em novembro de 1969. Diferentemente de equipamentos utilizados apenas durante a presença humana, o conjunto foi projetado para permanecer na Lua, coletando dados e transmitindo informações à Terra mesmo depois que os astronautas retornaram.',

    scientificContext:
      'O ALSEP possuía uma estação central responsável pela alimentação elétrica, processamento e transmissão dos dados científicos. O conjunto da Apollo 12 incluía seis instrumentos: um sismômetro passivo, que investigava a atividade sísmica e a estrutura interna lunar; um detector de íons supratérmicos, que analisava partículas carregadas; um medidor de íons de cátodo frio, destinado ao estudo da atmosfera lunar; um detector de poeira, que monitorava seu acúmulo e outros efeitos ambientais; um magnetômetro, que media o campo magnético na superfície; e um espectrômetro de vento solar, que investigava partículas provenientes do Sol. A energia era fornecida por um gerador termoelétrico de radioisótopos SNAP-27, capaz de produzir aproximadamente 70 watts de corrente contínua.',

    legacy:
      'O ALSEP ampliou a capacidade de investigação científica da Lua para além das caminhadas dos astronautas. Seus instrumentos permitiram acompanhar fenômenos lunares durante anos. A estação da Apollo 12 começou a operar em 19 de novembro de 1969, e as operações das estações ALSEP foram encerradas em 30 de setembro de 1977.',

    clue:
      'Por que instalar instrumentos científicos capazes de transmitir dados durante anos foi importante para compreender a Lua?',

    sourceName:
      'NASA - Space Science Data Coordinated Archive (Apollo 12 LM/ALSEP)',

    source:
      'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C'
  },

  {
    id: 'spirit-opportunity',
    name: 'Spirit & Opportunity',
    location: 'Marte',
    year: '2004–2018',
    mission: 'Mars Exploration Rover',

    x: 250,
    y: 300,
    color: 0xf97316,
    textures: ['spirit', 'opportunity'],

    description:
      'Spirit e Opportunity foram dois rovers robóticos gêmeos enviados pela NASA a Marte em 2004. Projetados para investigar a superfície e a história geológica do planeta, os exploradores procuraram evidências de que a água líquida esteve presente em Marte no passado. O Spirit pousou na Cratera Gusev em 3 de janeiro de 2004, enquanto o Opportunity chegou a Meridiani Planum em 24 de janeiro do mesmo ano.',

    scientificContext:
      'Os dois rovers estudaram rochas, solos e formações geológicas em regiões diferentes de Marte. A Cratera Gusev, onde o Spirit pousou, era considerada um possível antigo lago. Já Meridiani Planum, região explorada pelo Opportunity, apresentava depósitos minerais que sugeriam uma história relacionada à água. Ao investigar o registro geológico das rochas, os veículos confirmaram que a água esteve presente na superfície marciana durante períodos prolongados da história antiga do planeta.',

    legacy:
      'As descobertas dos dois exploradores contribuíram para transformar a compreensão científica sobre o passado de Marte. O Spirit encerrou sua missão em 2010. O Opportunity realizou seu último contato com a Terra em 10 de junho de 2018, quando uma tempestade de poeira em escala planetária atingiu sua região. Juntos, os rovers deixaram um importante registro da exploração robótica de Marte.',

    clue:
      'Como a análise das rochas e dos minerais pode revelar que existiu água líquida em Marte há bilhões de anos?',

    sourceName:
      'NASA Science - Mars Exploration Rovers: Spirit and Opportunity',

    source:
      'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/'
  },

  {
    id: 'ingenuity',
    name: 'Ingenuity Mars Helicopter',
    location: 'Marte',
    year: '2021–2024',
    mission: 'Mars 2020 - Perseverance',

    x: 700,
    y: 300,
    color: 0xa3a3a3,
    textures: ['ingenuity'],

    description:
      'O Ingenuity foi um helicóptero experimental desenvolvido pela NASA e transportado até Marte junto ao rover Perseverance, como parte da missão Mars 2020. Seu objetivo inicial era demonstrar que um voo motorizado e controlado seria possível na atmosfera extremamente rarefeita de outro planeta. Em 19 de abril de 2021, realizou o primeiro voo motorizado e controlado em outro planeta.',

    scientificContext:
      'Voar em Marte representa um desafio tecnológico porque sua atmosfera possui menos de 1% da densidade da atmosfera terrestre. Para realizar seus voos, o Ingenuity utilizava rotores, energia solar e baterias de íons de lítio. Inicialmente, foi planejado como uma demonstração tecnológica com até cinco voos de teste em 30 dias. Entretanto, superou essa expectativa e completou 72 voos ao longo de quase três anos. Após os primeiros testes, passou também a atuar como explorador aéreo, ajudando cientistas e planejadores a observar regiões de interesse para o rover Perseverance.',

    legacy:
      'O Ingenuity demonstrou que aeronaves podem realizar voos motorizados e controlados em outro planeta. Seu último voo ocorreu em 18 de janeiro de 2024, e a NASA declarou a missão encerrada em 25 de janeiro de 2024. Ao todo, o helicóptero acumulou 72 voos históricos, ampliando as possibilidades de exploração aérea de outros mundos.',

    clue:
      'Por que a atmosfera rarefeita de Marte torna o voo de um helicóptero tão desafiador, e o que o sucesso do Ingenuity representa para futuras explorações?',

    sourceName:
      'NASA Science - Ingenuity Mars Helicopter',

    source:
      'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/'
  }
];

export default equipment;
