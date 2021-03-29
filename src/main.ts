import Phaser from 'phaser';

import Preloader from './scenes/PreloaderScene';
import Level1Scene from './scenes/Level1Scene';

const config = {
  type: Phaser.AUTO,
  width: 2880,
  height: 1200,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [Preloader, Level1Scene],
};
export default new Phaser.Game(config);
