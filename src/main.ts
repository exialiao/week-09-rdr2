import 'phaser';

import Preloader from './scenes/PreloaderScene';
import Level1Scene from './scenes/Level1Scene';
import GamestartScene from './scenes/GameStartScene';
import GameoverScene from './scenes/GameOverScene';
import ChapterClearScene from './scenes/ChapterClearScene';

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1440,
    height: 600,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Preloader, GamestartScene, Level1Scene, GameoverScene, ChapterClearScene],
};

new Phaser.Game(config);
