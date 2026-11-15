
export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    // Direção inicial
    this.direction = 'baixo';

    // Quadros usados quando o astronauta estiver parado
    this.idleFrames = {
      baixo: 'baixo-0',
      esquerda: 'esquerda-0',
      direita: 'direita-0',
      cima: 'cima-0'
    };

    // Cria o personagem usando o atlas carregado
    this.sprite = scene.physics.add.sprite(
      x,
      y,
      'astronauta',
      'baixo-0'
    );

    // Ajustes visuais
    this.sprite.setScale(0.16);
    this.sprite.setDepth(5);

    // Ajustes da colisão
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body.setSize(110, 160);
    this.sprite.body.setOffset(102, 100);

    // Controles WASD
    this.keys = scene.input.keyboard.addKeys({
      up: 'W',
      down: 'S',
      left: 'A',
      right: 'D'
    });

    // Setas direcionais
    this.cursors = scene.input.keyboard.createCursorKeys();

    this.speed = 160;
  }

  update() {
    const body = this.sprite.body;

    body.setVelocity(0);

    let moving = false;

    // Movimento para esquerda
    if (this.keys.left.isDown || this.cursors.left.isDown) {
      body.setVelocityX(-this.speed);
      this.direction = 'esquerda';
      moving = true;
    }

    // Movimento para direita
    else if (this.keys.right.isDown || this.cursors.right.isDown) {
      body.setVelocityX(this.speed);
      this.direction = 'direita';
      moving = true;
    }

    // Movimento para cima
    if (this.keys.up.isDown || this.cursors.up.isDown) {
      body.setVelocityY(-this.speed);

      if (Math.abs(body.velocity.y) > Math.abs(body.velocity.x)) {
        this.direction = 'cima';
      }

      moving = true;
    }

    // Movimento para baixo
    else if (this.keys.down.isDown || this.cursors.down.isDown) {
      body.setVelocityY(this.speed);

      if (Math.abs(body.velocity.y) > Math.abs(body.velocity.x)) {
        this.direction = 'baixo';
      }

      moving = true;
    }

    // Mantém a velocidade das diagonais
    body.velocity.normalize().scale(this.speed);

    // Animação de caminhada
    if (moving) {
      this.sprite.anims.play(
        `andar-${this.direction}`,
        true
      );
    } else {
      // Para a animação e mantém o quadro parado
      this.sprite.anims.stop();
      this.sprite.setFrame(this.idleFrames[this.direction]);
    }
  }
}
