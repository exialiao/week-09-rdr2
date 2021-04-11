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
    this.load.image('mountain_2', 'assets/img/mountain_2.png');
    this.load.image('mountain_3a', 'assets/img/mountain_3a.png');
    this.load.image('mountain_3b', 'assets/img/mountain_3b.png');
    this.load.image('farm', 'assets/img/farm.png');
    this.load.image('roadsign', 'assets/img/roadsign.png');
    this.load.image('bg_horse', 'assets/img/bg_horse.png');
    this.load.image('carriage', 'assets/img/carriage.png');
    this.load.image('tent', 'assets/img/tent.png');
    this.load.image('tree', 'assets/img/tree.png');
    this.load.image('ground', 'assets/img/ground.png');

    this.load.image('miss_area', 'assets/img/miss_area.png');

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
    this.load.image('arthur_fireline', 'assets/img/arthur/arthur_fireline.png');
    this.load.image('gun_smoke', 'assets/img/arthur/gun_smoke.png');
    this.load.image('bullet', 'assets/img/arthur/bullet.png');
    this.load.scenePlugin(
      'WeaponPlugin',
      'path/to/WeaponPlugin.js',
      'weaponPlugin',
      'weapons'
    );

    // enemy
    this.load.image('enemy1_body', 'assets/img/enemy/enemy1_body.png');
    this.load.image('enemy1_gun', 'assets/img/enemy/enemy1_gun.png');
  }

  create() {
    this.scene.start('level-1');
  }
}
