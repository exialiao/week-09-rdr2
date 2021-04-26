import { Bullet, WeaponPlugin } from 'phaser3-weapon-plugin';

import Enemy from '../sprite/enemy';
import Arthur from '../sprite/arthur';

export default class Level1Scene extends Phaser.Scene {
  gameOver = false;
  arthur_run: Phaser.GameObjects.Sprite;
  fireLine: Phaser.GameObjects.Sprite;
  gun: Phaser.GameObjects.Sprite;
  gunTween: Phaser.Tweens.Tween;
  gunAngle: number;
  weapon: any;
  arthur_run_enemy: any;
  gunTopRight: any;

  cloud: Phaser.GameObjects.TileSprite;
  birds: Phaser.GameObjects.TileSprite;
  mountain2: Phaser.GameObjects.TileSprite;
  moveBackground: boolean;
  cursors: any;
  controlConfig: {
    camera: Phaser.Cameras.Scene2D.Camera;
    left: any;
    right: any;
    up: any;
    down: any;
    acceleration: number;
    drag: number;
    maxSpeed: number;
  };
  controls: Phaser.Cameras.Controls.SmoothedKeyControl;
  missShotArea: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  background: Phaser.GameObjects.Image;
  sun: Phaser.GameObjects.Image;
  mountain1: Phaser.GameObjects.Image;
  mountain3a: Phaser.GameObjects.Image;
  mountain3b: Phaser.GameObjects.Image;
  farm: Phaser.GameObjects.Image;
  ground: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  missShotArea2: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  enemy1: Enemy;
  arthur: Arthur;
  background_music: any;

  constructor() {
    super('level-1');
  }

  create() {
    // background
    this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.background.setScrollFactor(0);

    this.sun = this.add.image(500, 200, 'sun').setOrigin(0, 0);
    this.sun.setScrollFactor(0);

    // this.birds = this.add.tileSprite(2200,300,0, 0, 'birds');

    this.cloud = this.add.tileSprite(0, 0, 1440, 600, 'cloud').setOrigin(0, 0);
    this.cloud.setScrollFactor(0);

    this.mountain1 = this.add.image(0, 330, 'mountain_1').setOrigin(0, 0);
    this.mountain1.setScrollFactor(0.05);

    this.mountain2 = this.add
      .tileSprite(-150, 400, 2133, 204, 'mountain_2')
      .setOrigin(0, 0);
    this.mountain2.setScrollFactor(0.1);

    this.mountain3a = this.add.image(20, 470, 'mountain_3a').setOrigin(0, 0);
    this.mountain3a.setScrollFactor(0.2);
    this.mountain3b = this.add.image(900, 445, 'mountain_3b').setOrigin(0, 0);
    this.mountain3b.setScrollFactor(0.2);

    this.farm = this.add.image(870, 475, 'farm').setOrigin(0, 0);
    this.farm.setScrollFactor(0.45);

    this.add.image(950, 455, 'roadsign').setOrigin(0, 0).setScrollFactor(0.85);
    this.add.image(1100, 390, 'carriage').setOrigin(0, 0).setScrollFactor(0.95);
    this.add.image(-50, 390, 'tent').setOrigin(0, 0).setScrollFactor(0.85);
    this.add.image(400, 400, 'bg_horse').setOrigin(0, 0).setScrollFactor(0.85);
    this.add.image(550, 100, 'tree').setOrigin(0, 0).setScrollFactor(0.75);

    // this.background_music = this.sound.add('background_music');

    // this.background_music.play();

    this.ground = this.physics.add
      .image(0, 550, 'ground')
      .setOrigin(0, 0)
      .setScrollFactor(0);
    // missshot
    this.missShotArea = this.physics.add
      .sprite(1440, 300, 'miss_area')
      .setAlpha(0)
      .setScrollFactor(0);

    // this.missShotArea2 = this.physics.add
    //   .sprite(1200, -50, 'miss_area')
    //   .setAlpha(1)
    //   .setAngle(90)
    //   .setScrollFactor(0);

    this.plugins.installScenePlugin(
      'WeaponPlugin',
      WeaponPlugin,
      'weapons',
      this
    );

    this.arthur = new Arthur(this);

    // enemy
    this.enemy1 = new Enemy(this, 1000);

    this.physics.add.overlap(
      this.enemy1,
      this.arthur.weapon.bullets,
      (enemy: Enemy, bullet) => {
        enemy.getsHit(enemy, bullet);
        this.arthur.canMoveForward = true;
      }
    );

    this.physics.add.overlap(
      this.arthur,
      this.enemy1.weapon.bullets,
      this.arthur.getsHit
    );

    this.physics.add.overlap(
      this.ground,
      this.arthur.weapon.bullets,
      (ground, bullet) => {
        bullet.kill();
        this.enemy1.can_shoot = true;
      }
    );

    this.physics.add.overlap(
      this.missShotArea,
      this.arthur.weapon.bullets,
      (missShotArea, bullet) => {
        bullet.kill();
        this.enemy1.can_shoot = true;
      }
    );

    this.cameras.main.setBounds(0, 0, 10840, 600);
    this.cameras.main.startFollow(this.arthur);
    this.cameras.main.setFollowOffset(-420, 0);
  }

  update() {
    if (this.enemy1.is_killed == true && this.arthur.canMoveForward) {
      console.log(this.arthur.canMoveForward);
      this.arthur.moveForward();
    }
    if (this.arthur.is_killed == true) {
      this.scene.stop('level-1');
      this.scene.start('gameover');
    }

    this.cloud.tilePositionX += 0.5;
  }
}
