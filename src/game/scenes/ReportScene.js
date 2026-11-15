
import Phaser from 'phaser';
import equipment from '../data/equipment';

export default class ReportScene extends Phaser.Scene {
  constructor() {
    super('ReportScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('#080d18');

    const discoveries =
      this.registry.get('discoveredEquipment') || [];

    const discoveredItems = equipment.filter(item =>
      discoveries.includes(item.id)
    );

    // Título
    this.add.text(480, 30, 'ARQUIVO DE DESCOBERTAS', {
      fontSize: '32px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Subtítulo
    this.add.text(480, 68, 'Relatório final da expedição ECHOES', {
      fontSize: '18px',
      color: '#94a3b8'
    }).setOrigin(0.5);

    // Contador
    this.add.text(
      480,
      108,
      `Equipamentos descobertos: ${discoveredItems.length}/4`,
      {
        fontSize: '20px',
        color: '#facc15',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);

    // Ícone de descoberta
    this.add.image(
        730,
        108,
        'icone-descoberta'
    ).setDisplaySize(30, 30);
    
    // Cartões das descobertas
    let y = 160;

    for (const item of discoveredItems) {
      // Fundo do cartão
      const background = this.add.rectangle(
        480,
        y,
        780,
        60,
        0x1e293b
      );

      background.setStrokeStyle(1, 0x64748b);

      // Imagens do equipamento
      const textures = item.textures || [];

      if (textures.length === 2) {
        // Spirit e Opportunity
        this.add.image(140, y, textures[0])
          .setDisplaySize(48, 32);

        this.add.image(180, y, textures[1])
          .setDisplaySize(48, 32);
      } else if (textures.length === 1) {
        // Demais equipamentos
        this.add.image(160, y, textures[0])
          .setDisplaySize(65, 44);
      }

      // Nome e localização
      this.add.text(
        215,
        y - 14,
        `${item.name} — ${item.location}`,
        {
          fontSize: '18px',
          color: '#ffffff',
          fontStyle: 'bold'
        }
      );

      // Missão e ano
      this.add.text(
        215,
        y + 9,
        `Missão: ${item.mission} | Ano: ${item.year}`,
        {
          fontSize: '14px',
          color: '#cbd5e1'
        }
      );

      y += 65;
    }

    // Mensagem final
    this.add.text(
      480,
      430,
      'Sua expedição ajudou a registrar parte da história da exploração espacial.',
      {
        fontSize: '16px',
        color: '#cbd5e1',
        align: 'center',
        wordWrap: { width: 750 }
      }
    ).setOrigin(0.5);

    // Botão para jogar novamente
    const replayButton = this.add.text(
      480,
      490,
      '[ JOGAR NOVAMENTE ]',
      {
        fontSize: '20px',
        color: '#facc15',
        backgroundColor: '#1e293b',
        padding: { x: 16, y: 10 }
      }
    ).setOrigin(0.5).setInteractive({ useHandCursor: true });

    replayButton.on('pointerdown', () => {
      this.registry.set('discoveredEquipment', []);
      this.scene.start('MenuScene');
    });
  }
}
