import Phaser from 'phaser';

export default class BriefingScene extends Phaser.Scene {
  constructor() {
    super('BriefingScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('#080d18');

    // Fundo visual do briefing
    this.add.image(480, 270, 'fundo-briefing')
        .setDisplaySize(960, 540)
        .setDepth(0);

    this.add.text(480, 65, 'BRIEFING DA EXPEDIÇÃO', {
      fontSize: '34px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(2);

    this.add.text(480, 145,
      'A humanidade deixou equipamentos científicos\n' +
      'na superfície da Lua e de Marte.\n\n' +
      'Sua missão é explorar esses locais, investigar\n' +
      'os equipamentos e descobrir suas histórias.',
      {
        fontSize: '20px',
        color: '#cbd5e1',
        align: 'center',
        lineSpacing: 8
      }
    ).setOrigin(0.5).setDepth(2);

    // Título dos controles
    this.add.text(480, 340, 'CONTROLES', {
        fontSize: '22px',
        color: '#facc15',
        fontStyle: 'bold'
    })
    .setOrigin(0.5)
    .setDepth(2);

    // Movimento
    this.add.text(
        480,
        380,
        'WASD ou SETAS: movimentar o astronauta',
        {
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        }
    )
    .setOrigin(0.5)
    .setDepth(2);

    // Investigação
    this.add.text(
        480,
        415,
        'E: investigar equipamentos próximos',
        {
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        }
    )
    .setOrigin(0.5)
    .setDepth(2);


    const start = this.add.text(
      480, 485, '[ INICIAR MISSÃO ]',
      {
        fontSize: '22px',
        color: '#facc15',
        backgroundColor: '#1e293b',
        padding: { x: 18, y: 12 }
      }
    )
    .setOrigin(0.5).setDepth(2)
    .setInteractive({ useHandCursor: true });

    start.on('pointerdown', () => {
      this.scene.start('MoonScene');
    });
  }
}
