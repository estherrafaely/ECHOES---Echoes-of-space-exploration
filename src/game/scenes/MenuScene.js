import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('#080d18');

    this.add.text(480, 150, 'ECHOES', {
      fontSize: '64px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(480, 215, 'Ecos da Exploração Espacial', {
      fontSize: '22px',
      color: '#94a3b8'
    }).setOrigin(0.5);

    this.add.text(480, 310, 'Explore a Lua e Marte.', {
      fontSize: '20px',
      color: '#ffffff'
    }).setOrigin(0.5);

    const start = this.add.text(480, 390, '[ INICIAR EXPLORAÇÃO ]', {
      fontSize: '22px',
      color: '#facc15',
      backgroundColor: '#1e293b',
      padding: { x: 18, y: 12 }
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    start.on('pointerdown', () => {
      this.scene.start('BriefingScene');
    });
  }
}
