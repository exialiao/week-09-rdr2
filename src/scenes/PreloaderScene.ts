import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('background', 'assets/img/background.png');
    this.load.image('sun', 'assets/img/sun.png');
    this.load.image('birds', 'assets/img/birds.png');
    this.load.image('cloud', 'assets/img/cloud.png');
    this.load.image('mountain_1', 'assets/img/mountain_1.png');
    this.load.image('mountain_2a', 'assets/img/mountain_2a.png');
    this.load.image('mountain_2b', 'assets/img/mountain_2b.png');
    this.load.image('mountain_3a', 'assets/img/mountain_3a.png');
    this.load.image('mountain_3b', 'assets/img/mountain_3b.png');
    this.load.image('farm', 'assets/img/farm.png');
    this.load.image('roadsign', 'assets/img/roadsign.png');
    this.load.image('bg_horse', 'assets/img/bg_horse.png');
    this.load.image('carriage', 'assets/img/carriage.png');
    this.load.image('tent', 'assets/img/tent.png');
    this.load.image('tree', 'assets/img/tree.png');
    this.load.image('ground', 'assets/img/ground.png');

    //arthur

    this.load.atlas(
      'arthur_run',
      'assets/img/arthur/arthur_run.png',
      'assets/img/arthur/arthur_run.json'
    );

    this.load.image(
      'arthur_shot_body',
      'assets/img/arthur/arthur_shot_body.png'
    );
    this.load.image('arthur_shot_arm', 'assets/img/arthur/arthur_shot_arm.png');
    this.load.image('bullet', 'assets/img/arthur/bullet.png');
  }

  create() {
    this.scene.start('level-1');
  }
}
