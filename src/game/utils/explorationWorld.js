
import Phaser from 'phaser';

export const SCREEN_WIDTH = 960;
export const SCREEN_HEIGHT = 540;

const GRID_SIZE = 7;
const CENTER = 3;

// Os 13 setores da exploração.
const SECTORS = [
  { suffix: 'centro', column: 3, row: 3 },

  { suffix: 'cima-1', column: 3, row: 2 },
  { suffix: 'cima-2', column: 3, row: 1 },
  { suffix: 'cima-3', column: 3, row: 0 },

  { suffix: 'baixo-1', column: 3, row: 4 },
  { suffix: 'baixo-2', column: 3, row: 5 },
  { suffix: 'baixo-3', column: 3, row: 6 },

  { suffix: 'esquerda-1', column: 2, row: 3 },
  { suffix: 'esquerda-2', column: 1, row: 3 },
  { suffix: 'esquerda-3', column: 0, row: 3 },

  { suffix: 'direita-1', column: 4, row: 3 },
  { suffix: 'direita-2', column: 5, row: 3 },
  { suffix: 'direita-3', column: 6, row: 3 }
];

export function createExplorationWorld(
  scene,
  planet,
  backgroundKey,
  decorKey,
  decorations
) {
  const worldWidth = GRID_SIZE * SCREEN_WIDTH;
  const worldHeight = GRID_SIZE * SCREEN_HEIGHT;

  // Limites do mundo.
  scene.physics.world.setBounds(
    0,
    0,
    worldWidth,
    worldHeight
  );

  scene.cameras.main.setBounds(
    0,
    0,
    worldWidth,
    worldHeight
  );

  // Usa o mapa completo para garantir continuidade visual.
  const mapKey = `mapa-${planet}-completo`;

  scene.add.image(
    worldWidth / 2,
    worldHeight / 2,
    mapKey
  )
    .setOrigin(0.5)
    .setDisplaySize(worldWidth, worldHeight)
    .setDepth(0);

  // Sobrepõe os cenários individuais somente quando existem.
  // Isso preserva os detalhes da Lua e evita texturas verdes em Marte.
  SECTORS.forEach(sector => {
    const textureKey = `${planet}-${sector.suffix}`;

    if (!scene.textures.exists(textureKey)) {
      return;
    }

    scene.add.image(
      sector.column * SCREEN_WIDTH + SCREEN_WIDTH / 2,
      sector.row * SCREEN_HEIGHT + SCREEN_HEIGHT / 2,
      textureKey
    )
      .setOrigin(0.5)
      .setDisplaySize(SCREEN_WIDTH, SCREEN_HEIGHT)
      .setDepth(1);
  });

  // Bloqueia somente as regiões diagonais.
  // O mapa continua visível por baixo dessas regiões.
  const blockers = scene.physics.add.staticGroup();

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let column = 0; column < GRID_SIZE; column++) {
      const isExplorationArea =
        row === CENTER || column === CENTER;

      if (isExplorationArea) {
        continue;
      }

      const blocker = scene.add.zone(
        column * SCREEN_WIDTH + SCREEN_WIDTH / 2,
        row * SCREEN_HEIGHT + SCREEN_HEIGHT / 2,
        SCREEN_WIDTH,
        SCREEN_HEIGHT
      );

      scene.physics.add.existing(blocker, true);
      blockers.add(blocker);
    }
  }

  return {
    width: worldWidth,
    height: worldHeight,

    centerX: worldWidth / 2,
    centerY: worldHeight / 2,

    blockers
  };
}

// Posicionamento dos equipamentos científicos.
export function getArtifactPosition(planet, id) {
  const centerX =
    CENTER * SCREEN_WIDTH + SCREEN_WIDTH / 2;

  const centerY =
    CENTER * SCREEN_HEIGHT + SCREEN_HEIGHT / 2;

  const positions = {
    lua: {
      'apollo-lm': {
        x: centerX,
        y: SCREEN_HEIGHT + SCREEN_HEIGHT / 2
      },

      'alsep': {
        x: centerX,
        y: 5 * SCREEN_HEIGHT + SCREEN_HEIGHT / 2
      }
    },

    marte: {
      'spirit-opportunity': {
        x: SCREEN_WIDTH + SCREEN_WIDTH / 2,
        y: centerY
      },

      'ingenuity': {
        x: 5 * SCREEN_WIDTH + SCREEN_WIDTH / 2,
        y: centerY
      }
    }
  };

  return positions[planet]?.[id] || {
    x: centerX,
    y: centerY
  };
}

// Rosa dos ventos fixa no canto inferior esquerdo.
export function createCompass(scene) {
  const directions = [
    'neutra',
    'norte',
    'sul',
    'leste',
    'oeste'
  ];

  // Recorta a área correta da bússola nas imagens.
  directions.forEach(direction => {
    const texture = scene.textures.get(`rosa-${direction}`);

    if (!texture.has('icone')) {
      texture.add(
        'icone',
        0,
        388,
        346,
        184,
        184
      );
    }
  });

  const compass = scene.add.image(
    90,
    450,
    'rosa-neutra',
    'icone'
  )
    .setDisplaySize(76, 76)
    .setScrollFactor(0)
    .setDepth(20);

  return {
    update(playerX, playerY) {
      const column = Math.floor(
        playerX / SCREEN_WIDTH
      );

      const row = Math.floor(
        playerY / SCREEN_HEIGHT
      );

      const horizontalDistance = column - CENTER;
      const verticalDistance = row - CENTER;

      let direction = 'neutra';

      if (
        horizontalDistance === 0 &&
        verticalDistance === 0
      ) {
        direction = 'neutra';
      } else if (
        Math.abs(verticalDistance) >=
        Math.abs(horizontalDistance)
      ) {
        direction =
          verticalDistance < 0 ? 'norte' : 'sul';
      } else {
        direction =
          horizontalDistance < 0 ? 'oeste' : 'leste';
      }

      compass.setTexture(
        `rosa-${direction}`,
        'icone'
      );
    }
  };
}
