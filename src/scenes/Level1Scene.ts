import Phaser from 'phaser';
import { WeaponPlugin } from 'phaser3-weapon-plugin';

import createArthurAnims from '../anims/Arthur';

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
  enemy1: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[];
  enemy1_shot: boolean;
  enemy1_weapon: any;
  enemy1_gun: Phaser.GameObjects.Sprite;
  enemy1_gunTopLeft: any;

  enemy1_killed: boolean;
  arthur: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
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
    this.add.image(0, 550, 'ground').setOrigin(0, 0).setScrollFactor(0);

    //arthur run
    createArthurAnims(this.anims);
    this.arthur_run = this.add.sprite(300, 500, 'arthur_run');
    this.arthur_run.setScale(0.5);
    this.arthur_run.visible = false;
    this.arthur_run.play('arthur_run');

    // arthur shot
    this.arthur = this.physics.add.image(300, 485, 'arthur_shot_body');
    this.arthur.visible = true;

    this.fireLine = this.add.sprite(280, 425, 'arthur_fireline');
    this.fireLine.setOrigin(0, 0);
    this.fireLine.visible = false;
    // the rotating gun
    this.gunAngle = 50;
    this.gun = this.add.sprite(280, 425, 'arthur_shot_arm');
    this.gun.setOrigin(0, 0);
    this.gun.setAngle(-(this.gunAngle / 2));
    this.gun.visible = true;

    this.gunTween = this.tweens.add({
      targets: [this.gun],
      angle: this.gunAngle,
      duration: 2000,
      repeat: -1,
      // yoyo is for reverse;
      yoyo: true,
      callbackScope: this,
    });

    this.plugins.installScenePlugin(
      'WeaponPlugin',
      WeaponPlugin,
      'weapons',
      this
    );

    // Arthur weapon
    //  Creates 3 bullets, using the 'bullet' graphic
    this.weapon = this.add.weapon(100, 'bullet');

    // Enable physics debugging for the bullets
    this.weapon.debugPhysics = true;

    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.weapon.bulletAngleOffset = 90;

    //  The speed at which the bullet is fired
    this.weapon.bulletSpeed = 2000;

    //  Tell the Weapon to track the 'player' Sprite
    this.gunTopRight = this.gun.getTopRight();

    // enemy
    this.enemy1 = [this.physics.add.sprite(1000, 485, 'enemy1_body')];
    this.enemy1_gun = this.add.sprite(950, 445, 'enemy1_gun');

    this.enemy1_killed = false;
    // enemy weapon

    this.enemy1_weapon = this.add.weapon(100, 'bullet');
    this.enemy1_weapon.debugPhysics = true;
    this.enemy1_weapon.bulletAngleOffset = 90;
    this.enemy1_weapon.bulletSpeed = 2000;
    this.enemy1_gunTopLeft = this.enemy1_gun.getTopLeft();

    this.enemy1_shot = false;

    // missshot
    this.missShotArea = this.physics.add
      .sprite(1500, 300, 'miss_area')
      .setAlpha(0);

    // bullet overlap

    this.physics.add.overlap(
      this.enemy1,
      this.weapon.bullets,
      (enemy1, bullet) => {
        bullet.kill();
        enemy1.destroy();
        this.enemy1_gun.destroy();

        this.enemy1_shot = false;
        this.enemy1_killed = true;
      }
    );

    this.physics.add.overlap(
      this.missShotArea,
      this.weapon.bullets,
      (missShotArea, bullet) => {
        bullet.kill();
        missShotArea.setAlpha(0);
        this.enemy1_shot = true;
      }
    );

    this.physics.add.overlap(
      this.arthur,
      this.enemy1_weapon.bullets,
      (arthur, bullet) => {
        bullet.kill();
        arthur.setAlpha(0);
        this.gun.setAlpha(0);
      }
    );

    // shot
    this.input.on(
      'pointerdown',
      function () {
        // arthur shot
        this.weapon.fireAngle = this.gun.angle + 2.5;
        this.gunTopRight = this.gun.getTopRight();
        this.weapon.fire(this.gunTopRight, undefined, undefined, -10, 10);
        this.gunTween.stop();

        // we say we can fire when the fire line is not visible
        if (!this.fireLine.visible) {
          this.fireLine.visible = true;

          this.fireLine.angle = this.gun.angle;

          this.time.addEvent({
            delay: 100,
            callbackScope: this,
            callback: function () {
              this.fireLine.visible = false;
            },
          });
        }

        // gun smoke
        this.gun_smoke = this.add.particles('gun_smoke');

        this.gun_smoke.createEmitter({
          alpha: { start: 0.5, end: 0 },
          scale: { start: 0.5, end: 2.5 },
          //tint: { start: 0xff945e, end: 0xff945e },
          speed: 20,
          accelerationY: -500,
          angle: { min: -85, max: -95 },
          rotate: { min: -180, max: 180 },
          lifespan: { min: 1000, max: 1100 },
          blendMode: 'ADD',
          frequency: 110,
          maxParticles: 5,
          x: this.gunTopRight.x,
          y: this.gunTopRight.y,
        });
      },
      this
    );

    this.cameras.main.setBounds(0, 0, 10840, 600);
    this.cameras.main.startFollow(this.arthur_run);
    this.cameras.main.setFollowOffset(-420, 0);
  }

  // enemey shot
  enemyFire() {
    if (this.enemy1_shot == true) {
      this.enemy1_weapon.fireAngle = -180;
      this.enemy1_weapon.fire(
        this.enemy1_gunTopLeft,
        undefined,
        undefined,
        -1,
        10
      );
      this.enemy1_shot = false;
    }
  }

  moveForward() {
    if (this.enemy1_killed == true && this.arthur_run.x <= 1000) {
      this.arthur_run.visible = true;
      this.arthur_run.x += 5;

      this.arthur.visible = false;
      this.gun.visible = false;
    } else if (this.arthur_run.x > 1000) {
      this.arthur_run.stop('arthur_run');
      this.arthur.x = this.arthur_run.x;

      this.arthur.visible = true;
      this.arthur_run.visible = false;
      this.gun.x = this.arthur_run.x - 20;
      this.fireLine.x = this.gun.x;
      this.gun.visible = true;
      this.gunTween.play();

      this.missShotArea.x = this.arthur.x + 1100;
    }
  }

  update() {
    this.enemyFire();
    this.moveForward();
    this.cloud.tilePositionX += 0.5;
  }
}
