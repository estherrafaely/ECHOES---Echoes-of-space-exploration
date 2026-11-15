import Phaser from 'phaser';
import BriefingScene from './scenes/BriefingScene';
import MenuScene from './scenes/MenuScene';
import MoonScene from './scenes/MoonScene';
import MarsScene from './scenes/MarsScene';
import ReportScene from './scenes/ReportScene';
import BootScene from './scenes/BootScene';

const config = {
  type: Phaser.AUTO,

  width: 960,
  height: 540,

  parent: 'game-container',

  backgroundColor: '#111827',

  pixelArt: true,
  roundPixels: true,
  antialias: false,

  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },

  scene: [
    BootScene,
    MenuScene,
    BriefingScene,
    MoonScene,
    MarsScene,
    ReportScene
  ]
  
};

export default config;
