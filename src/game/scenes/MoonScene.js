
import Phaser from 'phaser';
import Player from '../entities/Player';
import Artifact from '../entities/Artifact';
import equipment from '../data/equipment';
import { createScrollableInfoPanel } from '../utils/equipmentInfo';
import {
  createExplorationWorld,
  createCompass,
  getArtifactPosition
} from '../utils/explorationWorld';

export default class MoonScene extends Phaser.Scene {
  constructor() {
    super('MoonScene');
  }

  create() {
    // Cria o mapa maior da Lua.
    const world = createExplorationWorld(
      this,
      'lua',
      'fundo-lua',
      'elementos-lua',
      [
        { frame: 'pedra-pequena', x: 120, y: 170, displaySize: 55 },
        { frame: 'pedra-media', x: 830, y: 160, displaySize: 55 },
        { frame: 'rocha-grande', x: 800, y: 410, displaySize: 55 },
        { frame: 'cratera-pequena', x: 300, y: 440, displaySize: 55 },
        { frame: 'cratera-media', x: 600, y: 120, displaySize: 55 },
        { frame: 'rocha-baixa', x: 430, y: 470, displaySize: 55 }
      ]
    );

    // Astronauta começa no centro do mapa.
    this.player = new Player(
      this,
      world.centerX,
      world.centerY
    );

   
    // A câmera acompanha o astronauta.
    this.cameras.main.startFollow(
      this.player.sprite,
      true,
      0.08,
      0.08
    );

    // Rosa dos ventos.
    this.compass = createCompass(this);

    // Equipamentos lunares.
    const lunarEquipment = equipment.filter(
      item => item.location === 'Lua'
    );

    this.artifacts = lunarEquipment.map(item => {
      const position = getArtifactPosition('lua', item.id);

      return new Artifact(this, {
        ...item,
        x: position.x,
        y: position.y
      });
    });

    // Recupera descobertas anteriores.
    this.discoveredEquipment =
      this.registry.get('discoveredEquipment') || [];

    this.artifacts.forEach(artifact => {
      if (this.discoveredEquipment.includes(artifact.data.id)) {
        artifact.discover();
      }
    });

    // Teclas de interação.
    this.interactKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.E
    );

    this.closeKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );

    this.marsKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.M
    );

    // Teclas de rolagem do painel.
    this.scrollUpKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );

    this.scrollDownKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );

    this.pageUpKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.PAGE_UP
    );

    this.pageDownKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.PAGE_DOWN
    );

    // Interface fixa na tela.
    this.add.image(150, 35, 'identificacao-lua')
      .setDisplaySize(180, 48)
      .setScrollFactor(0)
      .setDepth(15);

    this.add.image(740, 35, 'icone-descoberta')
      .setDisplaySize(30, 30)
      .setScrollFactor(0)
      .setDepth(15);

    this.discoveryCount = this.add.text(
      765,
      25,
      'Descobertas: 0/2',
      {
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#222222',
        padding: { x: 5, y: 4 }
      }
    )
      .setScrollFactor(0)
      .setDepth(15);

    this.message = this.add.text(30, 85, '', {
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#222222',
      padding: { x: 8, y: 6 },
      wordWrap: { width: 500 }
    })
      .setScrollFactor(0)
      .setDepth(15);

    this.add.text(
      155,
      500,
      'WASD ou setas: explorar | E: investigar',
      {
        fontSize: '14px',
        color: '#ffffff',
        backgroundColor: '#222222',
        padding: { x: 6, y: 4 }
      }
    )
      .setScrollFactor(0)
      .setDepth(15);

    // Painel de informações.
    this.infoPanel = createScrollableInfoPanel(this);

    this.infoOpen = false;

    this.updateDiscoveryCount();
  }

  update() {
    if (!this.player) {
      return;
    }

    // O jogador não se movimenta enquanto lê o painel.
    if (this.infoOpen) {
      if (Phaser.Input.Keyboard.JustDown(this.scrollUpKey)) {
        this.infoPanel.scroll(-35);
      }

      if (Phaser.Input.Keyboard.JustDown(this.scrollDownKey)) {
        this.infoPanel.scroll(35);
      }

      if (Phaser.Input.Keyboard.JustDown(this.pageUpKey)) {
        this.infoPanel.scroll(-180);
      }

      if (Phaser.Input.Keyboard.JustDown(this.pageDownKey)) {
        this.infoPanel.scroll(180);
      }

      if (
        Phaser.Input.Keyboard.JustDown(this.interactKey) ||
        Phaser.Input.Keyboard.JustDown(this.closeKey)
      ) {
        this.closeInfoPanel();
      }

      return;
    }

    this.player.update();

    const position = this.player.sprite;

    // Atualiza a rosa dos ventos conforme a região.
    this.compass.update(position.x, position.y);

    let nearbyArtifact = null;

    for (const artifact of this.artifacts) {
      if (artifact.discovered) {
        continue;
      }

      const artifactPosition = artifact.getPosition();

      const distance = Phaser.Math.Distance.Between(
        position.x,
        position.y,
        artifactPosition.x,
        artifactPosition.y
      );

      if (distance < 75) {
        nearbyArtifact = artifact;
        break;
      }
    }

    if (nearbyArtifact) {
      this.message.setText(
        `Pressione E para investigar: ${nearbyArtifact.data.name}`
      );

      if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
        const discovered = nearbyArtifact.discover();

        if (discovered) {
          this.registerDiscovery(nearbyArtifact.data);
          this.updateDiscoveryCount();
          this.openInfoPanel(nearbyArtifact.data);
        }
      }

      return;
    }

    if (this.allMoonArtifactsDiscovered()) {
      this.message.setText(
        'Exploração lunar concluída! Pressione M para seguir para Marte.'
      );

      if (Phaser.Input.Keyboard.JustDown(this.marsKey)) {
        this.scene.start('MarsScene');
      }
    } else {
      this.message.setText(
        'Explore as regiões da Lua para encontrar os equipamentos.'
      );
    }
  }

  registerDiscovery(data) {
    if (!this.discoveredEquipment.includes(data.id)) {
      this.discoveredEquipment.push(data.id);

      this.registry.set(
        'discoveredEquipment',
        this.discoveredEquipment
      );
    }
  }

  allMoonArtifactsDiscovered() {
    return this.artifacts.every(
      artifact => artifact.discovered
    );
  }

  updateDiscoveryCount() {
    const total = this.artifacts.filter(
      artifact => artifact.discovered
    ).length;

    this.discoveryCount.setText(
      `Descobertas: ${total}/2`
    );
  }

  openInfoPanel(data) {
    this.infoOpen = true;
    this.infoPanel.open(data);
    this.message.setText('');
  }

  closeInfoPanel() {
    this.infoOpen = false;
    this.infoPanel.close();
  }
}
