
import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Carrega o astronauta e suas animações.
    this.load.atlas(
      'astronauta',
      new URL('../../assets/astronauta/astronauta-caminhada.png', import.meta.url).href,
      new URL('../../assets/astronauta/astronauta-caminhada.atlas.json', import.meta.url).href
    );

    // Mantém os fundos antigos carregados.
    this.load.image(
      'fundo-lua',
      new URL('../../assets/lua/fundo-lua.png', import.meta.url).href
    );

    this.load.image(
      'fundo-marte',
      new URL('../../assets/marte/fundo-marte.png', import.meta.url).href
    );


    // Mapas completos da Lua e de Marte.
    this.load.image(
    'mapa-lua-completo',
    new URL('../../assets/lua/lua-mapa-completo.png', import.meta.url).href
    );

    this.load.image(
    'mapa-marte-completo',
    new URL('../../assets/marte/marte-mapa-completo.png', import.meta.url).href
    );


    // Carrega os elementos dos cenários.
    this.load.atlas(
      'elementos-lua',
      new URL('../../assets/lua/elementos-lua.png', import.meta.url).href,
      new URL('../../assets/lua/elementos-lua.atlas.json', import.meta.url).href
    );

    this.load.atlas(
      'elementos-marte',
      new URL('../../assets/marte/elementos-marte.png', import.meta.url).href,
      new URL('../../assets/marte/elementos-marte.atlas.json', import.meta.url).href
    );

    // Carrega os equipamentos científicos.
    const equipmentImages = [
      ['apollo-eagle', '../../assets/equipamentos/apollo-eagle-descida.png'],
      ['alsep', '../../assets/equipamentos/alsep.png'],
      ['spirit', '../../assets/equipamentos/spirit.png'],
      ['opportunity', '../../assets/equipamentos/opportunity.png'],
      ['ingenuity', '../../assets/equipamentos/ingenuity.png']
    ];

    equipmentImages.forEach(([key, path]) => {
      this.load.image(
        key,
        new URL(path, import.meta.url).href
      );
    });

    // Carrega as imagens da interface.
    const interfaceImages = [
      ['tecla-w', 'tecla-w.png'],
      ['tecla-a', 'tecla-a.png'],
      ['tecla-s', 'tecla-s.png'],
      ['tecla-d', 'tecla-d.png'],
      ['tecla-e', 'tecla-e.png'],
      ['controles-wasd', 'controles-wasd.png'],
      ['controles-setas', 'controles-setas.png'],
      ['identificacao-lua', 'identificacao-lua.png'],
      ['identificacao-marte', 'identificacao-marte.png'],
      ['icone-descoberta', 'icone-descoberta.png'],
      ['icone-missao-lua', 'icone-missao-lua.png'],
      ['icone-missao-marte', 'icone-missao-marte.png'],
      ['painel-descoberta', 'painel-descoberta.png'],
      ['fundo-briefing', 'fundo-briefing.png']
    ];

    interfaceImages.forEach(([key, file]) => {
      this.load.image(
        key,
        new URL(
          `../../assets/interface/${file}`,
          import.meta.url
        ).href
      );
    });

    // Carrega os 13 cenários da Lua.
    const moonScenarios = [
      'lua-centro',

      'lua-cima-1',
      'lua-cima-2',
      'lua-cima-3',

      'lua-baixo-1',
      'lua-baixo-2',
      'lua-baixo-3',

      'lua-esquerda-1',
      'lua-esquerda-2',
      'lua-esquerda-3',

      'lua-direita-1',
      'lua-direita-2',
      'lua-direita-3'
    ];

    moonScenarios.forEach(name => {
      this.load.image(
        name,
        new URL(
          `../../assets/lua/cenarios/${name}.png`,
          import.meta.url
        ).href
      );
    });

    // Carrega os 13 cenários de Marte.
    const marsScenarios = [
      'marte-centro',

      'marte-cima-1',
      'marte-cima-2',
      'marte-cima-3',

      'marte-baixo-1',
      'marte-baixo-2',
      'marte-baixo-3',

      'marte-esquerda-1',
      'marte-esquerda-2',
      'marte-esquerda-3',

      'marte-direita-1',
      'marte-direita-2',
      'marte-direita-3'
    ];

    marsScenarios.forEach(name => {
      this.load.image(
        name,
        new URL(
          `../../assets/marte/cenarios/${name}.png`,
          import.meta.url
        ).href
      );
    });

    // Carrega os cinco estados da rosa dos ventos.
    const compassDirections = [
      'neutra',
      'norte',
      'sul',
      'leste',
      'oeste'
    ];

    compassDirections.forEach(direction => {
      this.load.image(
        `rosa-${direction}`,
        new URL(
          `../../assets/interface/rosa-dos-ventos/rosa-${direction}.png`,
          import.meta.url
        ).href
      );
    });
  }

  create() {
    // Cria as animações de caminhada do astronauta.
    const directions = [
      { key: 'baixo', prefix: 'baixo-' },
      { key: 'esquerda', prefix: 'esquerda-' },
      { key: 'direita', prefix: 'direita-' },
      { key: 'cima', prefix: 'cima-' }
    ];

    directions.forEach(direction => {
      this.anims.create({
        key: `andar-${direction.key}`,
        frames: this.anims.generateFrameNames('astronauta', {
          prefix: direction.prefix,
          start: 0,
          end: 3
        }),
        frameRate: 8,
        repeat: -1
      });
    });

    // Depois de carregar tudo, abre o menu.
    this.scene.start('MenuScene');
  }
}
