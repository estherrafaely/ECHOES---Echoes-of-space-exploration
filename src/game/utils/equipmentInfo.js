
export function formatEquipmentInfo(data) {
  return [
    'CONTEXTO HISTÓRICO',
    data.description,
    '',
    'INFORMAÇÕES CIENTÍFICAS',
    data.scientificContext,
    '',
    'LEGADO DA MISSÃO',
    data.legacy,
    '',
    'PISTA PARA REFLEXÃO',
    data.clue,
    '',
    `FONTE: ${data.sourceName}`,
    data.source
  ].join('\n');
}

export function createScrollableInfoPanel(scene) {
  const background = scene.add.image(
    480,
    270,
    'painel-descoberta'
  )
    .setDisplaySize(800, 440)
    .setDepth(30)
    .setScrollFactor(0)
    .setVisible(false);

  const title = scene.add.text(145, 105, '', {
    fontSize: '17px',
    color: '#ffffff',
    wordWrap: { width: 660 }
  })
    .setDepth(32)
    .setScrollFactor(0)
    .setVisible(false);

  const subtitle = scene.add.text(145, 137, '', {
    fontSize: '12px',
    color: '#e7d56b',
    wordWrap: { width: 660 }
  })
    .setDepth(32)
    .setScrollFactor(0)
    .setVisible(false);

  const viewport = {
    x: 145,
    y: 180,
    width: 665,
    height: 245
  };

  const maskGraphics = scene.make.graphics({
    x: 0,
    y: 0,
    add: false
  });

  maskGraphics.fillStyle(0xffffff);
  maskGraphics.fillRect(
    viewport.x,
    viewport.y,
    viewport.width,
    viewport.height
  );

  maskGraphics.setScrollFactor(0);

  const textMask = maskGraphics.createGeometryMask();

  const content = scene.add.text(
    viewport.x,
    viewport.y,
    '',
    {
      fontSize: '13px',
      color: '#ffffff',
      wordWrap: { width: 645 },
      lineSpacing: 3
    }
  )
    .setDepth(32)
    .setScrollFactor(0)
    .setMask(textMask)
    .setVisible(false);

  const scrollbar = scene.add.graphics()
    .setDepth(33)
    .setScrollFactor(0)
    .setVisible(false);

  const footer = scene.add.text(
    145,
    445,
    'Use ↑/↓ ou a roda do mouse para rolar | E ou ESC para fechar',
    {
      fontSize: '10px',
      color: '#d8d8e8'
    }
  )
    .setDepth(32)
    .setScrollFactor(0)
    .setVisible(false);

  let scrollOffset = 0;
  let maxScroll = 0;

  const startY = viewport.y;

  function updateScrollbar() {
    scrollbar.clear();

    scrollbar.fillStyle(0x777799, 0.65);

    scrollbar.fillRect(
      820,
      viewport.y,
      5,
      viewport.height
    );

    if (maxScroll > 0) {
      const thumbHeight = Math.max(
        28,
        viewport.height * (viewport.height / content.height)
      );

      const thumbY = viewport.y +
        (scrollOffset / maxScroll) *
        (viewport.height - thumbHeight);

      scrollbar.fillStyle(0xe7d56b, 1);

      scrollbar.fillRect(
        818,
        thumbY,
        9,
        thumbHeight
      );
    } else {
      scrollbar.fillStyle(0xe7d56b, 1);

      scrollbar.fillRect(
        818,
        viewport.y,
        9,
        viewport.height
      );
    }
  }

  function scroll(amount) {
    scrollOffset = Math.max(
      0,
      Math.min(maxScroll, scrollOffset + amount)
    );

    content.y = startY - scrollOffset;

    updateScrollbar();
  }

  const wheelHandler = (
    pointer,
    gameObjects,
    deltaX,
    deltaY
  ) => {
    if (!background.visible) {
      return;
    }

    const inside =
      pointer.x >= viewport.x &&
      pointer.x <= viewport.x + viewport.width &&
      pointer.y >= viewport.y &&
      pointer.y <= viewport.y + viewport.height;

    if (inside) {
      scroll(deltaY * 0.7);
    }
  };

  scene.input.on('wheel', wheelHandler);

  return {
    open(data) {
      title.setText(data.name);

      subtitle.setText(
        `Missão: ${data.mission} | Período: ${data.year}`
      );

      content.setText(formatEquipmentInfo(data));

      content.y = startY;
      scrollOffset = 0;

      maxScroll = Math.max(
        0,
        content.height - viewport.height
      );

      background.setVisible(true);
      title.setVisible(true);
      subtitle.setVisible(true);
      content.setVisible(true);
      scrollbar.setVisible(true);
      footer.setVisible(true);

      updateScrollbar();
    },

    close() {
      background.setVisible(false);
      title.setVisible(false);
      subtitle.setVisible(false);
      content.setVisible(false);
      scrollbar.setVisible(false);
      footer.setVisible(false);
    },

    scroll
  };
}
