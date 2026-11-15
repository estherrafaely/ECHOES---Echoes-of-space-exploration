
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

export default class MarsScene extends Phaser.Scene {
  constructor() {
    super('MarsScene');
  }

  create() {
    // Verifica se a Lua foi explorada.
    const discoveries =
      this.registry.get('discoveredEquipment') || [];

    const lunarIds = ['apollo-lm', 'alsep'];

    const moonCompleted = lunarIds.every(
      id => discoveries.includes(id)
    );

    if (!moonCompleted) {
      this.scene.start('MoonScene');
      return;
    }

    // Cria o mapa maior de Marte.
    const world = createExplorationWorld(
      this,
      'marte',
      'fundo-marte',
      'elementos-marte',
      [
        { frame: 'pedra-pequena', x: 120, y: 160, scale: 0.10 },
        { frame: 'pedra-media', x: 830, y: 170, scale: 0.10 },
        { frame: 'rocha-grande', x: 800, y: 420, scale: 0.12 },
        { frame: 'cratera-pequena', x: 300, y: 440, scale: 0.10 },
        { frame: 'cratera-media', x: 600, y: 120, scale: 0.10 },
        { frame: 'rocha-baixa', x: 430, y: 470, scale: 0.10 }
      ]
    );

    // Astronauta começa no centro do mapa.
    this.player = new Player(
      this,
      world.centerX,
      world.centerY
    );

    

    // Câmera acompanha o astronauta.
    this.cameras.main.startFollow(
      this.player.sprite,
      true,
      0.08,
      0.08
    );

    // Rosa dos ventos.
    this.compass = createCompass(this);

    // Equipamentos marcianos.
    const martianEquipment = equipment.filter(
      item => item.location === 'Marte'
    );

    this.artifacts = martianEquipment.map(item => {
      const position = getArtifactPosition('marte', item.id);

      return new Artifact(this, {
        ...item,
        x: position.x,
        y: position.y
      });
    });

    this.discoveredEquipment = [...discoveries];

    this.artifacts.forEach(artifact => {
      if (this.discoveredEquipment.includes(artifact.data.id)) {
        artifact.discover();
      }
    });

    // Teclas principais.
    this.interactKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.E
    );

    this.closeKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );

    this.reportKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.R
    );

    // Teclas de rolagem.
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
    this.add.image(150, 35, 'identificacao-marte')
      .setDisplaySize(180, 48)
      .setScrollFactor(0)
      .setDepth(15);

    this.add.image(720, 35, 'icone-descoberta')
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

    // Pausa a movimentação enquanto o painel estiver aberto.
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

    if (this.allMarsArtifactsDiscovered()) {
      this.message.setText(
        'Exploração concluída! Pressione R para ver o relatório final.'
      );

      if (Phaser.Input.Keyboard.JustDown(this.reportKey)) {
        this.scene.start('ReportScene');
      }
    } else {
      this.message.setText(
        'Explore as regiões de Marte para encontrar os equipamentos.'
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

  allMarsArtifactsDiscovered() {
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
