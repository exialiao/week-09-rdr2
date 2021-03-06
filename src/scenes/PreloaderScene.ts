export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('title', 'assets/img/title.png');
    this.load.image('start', 'assets/img/start.png');
    this.load.image('dead', 'assets/img/dead.png');
    this.load.image('restart', 'assets/img/restart.png');
    this.load.image('playAgain', 'assets/img/playagain.png');
    this.load.image('nextChapter', 'assets/img/nextchapter.png');

    this.load.image('background', 'assets/img/background.png');
    this.load.image('sun', 'assets/img/sun.png');
    this.load.image('birds', 'assets/img/birds.png');
    this.load.image('cloud', 'assets/img/cloud.png');
    this.load.image('mountain_1', 'assets/img/mountain_1.png');
    this.load.image('mountain_2', 'assets/img/mountain_2.png');
    this.load.image('mountain_3', 'assets/img/mountain_3.png');
    this.load.image('farm', 'assets/img/farm.png');
    this.load.image('roadsign', 'assets/img/roadsign.png');
    this.load.image('bg_horse', 'assets/img/bg_horse.png');
    this.load.image('carriage', 'assets/img/carriage.png');

    this.load.image('tent', 'assets/img/tent.png');
    this.load.image('tree', 'assets/img/tree.png');
    this.load.image('ground', 'assets/img/ground.png');
    this.load.image('farm2', 'assets/img/farm2.png');
    this.load.image('town', 'assets/img/town.png');
    this.load.image('miss_area', 'assets/img/miss_area.png');

    // box
    this.load.image('box1', 'assets/img/box1.png');
    this.load.image('box2', 'assets/img/box2.png');
    this.load.image('box3', 'assets/img/box3.png');
    this.load.image('box4', 'assets/img/box4.png');
    this.load.image('box5', 'assets/img/box5.png');

    //arthur

    this.load.atlas(
      'arthur_run',
      'assets/img/arthur/arthur_run.png',
      'assets/img/arthur/arthur_run.json'
    );

    this.load.spritesheet(
      'arthur_shot_body',
      'assets/img/arthur/arthur_shot_body.png',
      {
        frameWidth: 150,
        frameHeight: 192,
      }
    );

    // this.load.image(
    //   'arthur_shot_body',
    //   'assets/img/arthur/arthur_shot_body.png'
    // );
    this.load.image('arthur_shot_arm', 'assets/img/arthur/arthur_shot_arm.png');
    this.load.image('arthur_fireline', 'assets/img/arthur/arthur_fireline.png');
    this.load.image('gun_smoke', 'assets/img/arthur/gun_smoke.png');
    this.load.image('bullet', 'assets/img/arthur/bullet.png');

    // enemy
    this.load.image('enemy1_body', 'assets/img/enemy/enemy1_body.png');
    this.load.image('enemy1_gun', 'assets/img/enemy/enemy1_gun.png');
    this.load.image('soldier', 'assets/img/enemy/soldier.png');

    // audio

    this.load.audio('background_music', 'assets/sound/background.mp3');
    this.load.audio('shot_sound', 'assets/sound/shot.mp3');
  }

  create() {
    this.scene.start('gamestart');
  }
}
