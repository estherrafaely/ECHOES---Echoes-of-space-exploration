export default class Artifact {
  constructor(scene, data) {
    this.scene = scene;
    this.data = data;
    this.discovered = false;

    // Guarda as imagens do equipamento
    this.objects = [];

    // Recupera as texturas cadastradas em equipment.js
    const textures = data.textures || [];

    // Cria uma imagem para cada textura
    textures.forEach((texture, index) => {
      const total = textures.length;

      let offsetX = 0;

      // Se forem dois rovers, separa as imagens
      if (total === 2) {
        offsetX = index === 0 ? -35 : 35;
      }

      const object = scene.add.image(
        data.x + offsetX,
        data.y,
        texture
      );

      // Ajusta o tamanho da imagem
      if (total === 2) {
        object.setDisplaySize(85, 57);
      } else {
        object.setDisplaySize(115, 77);
      }

      object.setDepth(3);

      this.objects.push(object);
    });

    // Nome do equipamento
    this.label = scene.add.text(
      data.x,
      data.y + 55,
      data.name,
      {
        fontSize: '12px',
        color: '#ffffff',
        backgroundColor: '#222222',
        padding: { x: 4, y: 3 },
        align: 'center'
      }
    ).setOrigin(0.5);

    this.label.setDepth(4);
  }

  // Retorna a posição usada para verificar a proximidade
  getPosition() {
    return {
      x: this.data.x,
      y: this.data.y
    };
  }

  // Registra a descoberta
  discover() {
    if (this.discovered) {
      return false;
    }

    this.discovered = true;

    // Destaca as imagens descobertas
    this.objects.forEach(object => {
      object.setTint(0x9affb2);
    });

    this.label.setText('✓ ' + this.data.name);

    return true;
  }
}
