import { Bullet, WeaponPlugin } from 'phaser3-weapon-plugin';

import createArthurAnims from '../anims/Arthur';
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

    this.ground = this.physics.add
      .image(0, 550, 'ground')
      .setOrigin(0, 0)
      .setScrollFactor(0);
    // missshot
    this.missShotArea = this.physics.add
      .sprite(1500, 300, 'miss_area')
      .setAlpha(1)
      .setScrollFactor(0);

    // this.missShotArea2 = this.physics.add
    //   .sprite(1200, -50, 'miss_area')
    //   .setAlpha(1)
    //   .setAngle(90)
    //   .setScrollFactor(0);

    // //arthur run
    // createArthurAnims(this.anims);
    // this.arthur_run = this.add.sprite(300, 500, 'arthur_run');
    // this.arthur_run.setScale(0.5);
    // this.arthur_run.visible = false;
    // this.arthur_run.play('arthur_run');

    // // arthur shot
    // this.arthur = this.physics.add.image(300, 485, 'arthur_shot_body');
    // this.arthur.visible = true;

    // this.fireLine = this.add.sprite(280, 425, 'arthur_fireline');
    // this.fireLine.setOrigin(0, 0);
    // this.fireLine.visible = false;
    // // the rotating gun
    // this.gunAngle = 50;
    // this.gun = this.add.sprite(280, 425, 'arthur_shot_arm');
    // this.gun.setOrigin(0, 0);
    // this.gun.setAngle(-(this.gunAngle / 2));
    // this.gun.visible = true;

    // this.gunTween = this.tweens.add({
    //   targets: [this.gun],
    //   angle: this.gunAngle,
    //   duration: 2000,
    //   repeat: -1,
    //   // yoyo is for reverse;
    //   yoyo: true,
    //   callbackScope: this,
    // });

    this.plugins.installScenePlugin(
      'WeaponPlugin',
      WeaponPlugin,
      'weapons',
      this
    );

    // // Arthur weapon
    // //  Creates 3 bullets, using the 'bullet' graphic
    // this.weapon = this.add.weapon(100, 'bullet');

    // // Enable physics debugging for the bullets
    // this.weapon.debugPhysics = true;

    // //  Because our bullet is drawn facing up, we need to offset its rotation:
    // this.weapon.bulletAngleOffset = 90;

    // //  The speed at which the bullet is fired
    // this.weapon.bulletSpeed = 2000;

    // //  Tell the Weapon to track the 'player' Sprite
    // this.gunTopRight = this.gun.getTopRight();
    this.arthur = new Arthur(this);

    // enemy
    this.enemy1 = new Enemy(this, 1000);

    this.physics.add.overlap(
      this.enemy1,
      this.arthur.weapon.bullets,
      this.enemy1.shot
    );

    this.physics.add.overlap(
      this.arthur,
      this.enemy1.weapon.bullets,
      this.arthur.shot
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
    // this.physics.add.overlap(
    //   this.missShotArea2,
    //   this.weapon.bullets,
    //   (missShotArea2, bullet) => {
    //     bullet.kill();
    //     this.enemy1.can_shoot = true;

    //   }
    // );

    // // shot
    // this.input.on(
    //   'pointerdown',
    //   function () {
    //     // arthur shot
    //     this.weapon.fireAngle = this.gun.angle + 2.5;
    //     this.gunTopRight = this.gun.getTopRight();
    //     this.weapon.fire(this.gunTopRight, undefined, undefined, -10, 10);
    //     this.gunTween.pause();

    //     // we say we can fire when the fire line is not visible
    //     if (!this.fireLine.visible) {
    //       this.fireLine.visible = true;

    //       this.fireLine.angle = this.gun.angle;

    //       this.time.addEvent({
    //         delay: 100,
    //         callbackScope: this,
    //         callback: function () {
    //           this.fireLine.visible = false;
    //         },
    //       });
    //     }

    //     // gun smoke
    //     this.gun_smoke = this.add.particles('gun_smoke');

    //     this.gun_smoke.createEmitter({
    //       alpha: { start: 0.5, end: 0 },
    //       scale: { start: 0.5, end: 2.5 },
    //       //tint: { start: 0xff945e, end: 0xff945e },
    //       speed: 20,
    //       accelerationY: -500,
    //       angle: { min: -85, max: -95 },
    //       rotate: { min: -180, max: 180 },
    //       lifespan: { min: 1000, max: 1100 },
    //       blendMode: 'ADD',
    //       frequency: 110,
    //       maxParticles: 5,
    //       x: this.gunTopRight.x,
    //       y: this.gunTopRight.y,
    //     });
    //   },
    //   this
    // );

    this.cameras.main.setBounds(0, 0, 10840, 600);
    this.cameras.main.startFollow(this.arthur);
    this.cameras.main.setFollowOffset(-420, 0);
  }

  update() {
    // this.enemyFire();
    if (this.enemy1.is_killed == true) {
      this.arthur.moveForward();
    }
    this.cloud.tilePositionX += 0.5;
  }
}
