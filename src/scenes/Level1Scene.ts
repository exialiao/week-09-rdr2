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
  missShotArea: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[];
  arthur: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[];

  constructor() {
    super('level-1');
  }

  create() {
    this.add.image(1440, 600, 'background');
    this.add.image(1440, 900, 'sun');
    this.add.image(2340, 500, 'birds');
    this.add.image(1480, 400, 'cloud');
    this.add.image(1280, 940, 'mountain_1');
    this.add.image(2480, 1000, 'mountain_2a');
    this.add.image(380, 1000, 'mountain_2b');
    this.add.image(280, 1080, 'mountain_3a');
    this.add.image(2480, 1020, 'mountain_3b');
    this.add.image(2280, 1050, 'farm');
    this.add.image(2780, 1030, 'roadsign');
    this.add.image(2080, 1000, 'carriage');
    this.add.image(180, 950, 'tent');
    this.add.image(880, 980, 'bg_horse');
    this.add.image(1580, 660, 'tree');
    this.add.image(1580, 1150, 'ground');

    //arthur run
    // createArthurAnims(this.anims);

    // this.arthur_run = this.add.sprite(800, 995, 'arthur_run');

    // this.arthur_run.play('arthur_run');

    // arthur shot
    this.arthur = [this.physics.add.sprite(500, 970, 'arthur_shot_body')];

    this.fireLine = this.add.sprite(455, 847, 'arthur_fireline');
    this.fireLine.setOrigin(0, 0);
    this.fireLine.visible = false;
    // the rotating gun
    this.gunAngle = 50;
    this.gun = this.add.sprite(455, 850, 'arthur_shot_arm');
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

    this.weapon.bulletKillDistance = 10;

    // enemy
    this.enemy1 = [this.physics.add.sprite(1800, 995, 'enemy1_body')];
    this.enemy1_gun = this.add.sprite(1700, 915, 'enemy1_gun');
    // enemy weapon

    this.enemy1_weapon = this.add.weapon(100, 'bullet');
    this.enemy1_weapon.debugPhysics = true;
    this.enemy1_weapon.bulletAngleOffset = 90;
    this.enemy1_weapon.bulletSpeed = 2000;
    this.enemy1_gunTopLeft = this.enemy1_gun.getTopLeft();

    this.enemy1_shot = false;

    // missshot
    this.missShotArea = [this.physics.add.sprite(2800, 600, 'miss_area')];

    // bullet overlap

    this.physics.add.overlap(
      this.enemy1,
      this.weapon.bullets,
      (enemy1, bullet) => {
        bullet.kill();
        enemy1.setAlpha(0.5);
        this.enemy1_shot = false;
      }
    );

    this.physics.add.overlap(
      this.missShotArea,
      this.weapon.bullets,
      (missShotArea, bullet) => {
        bullet.kill();
        missShotArea.setAlpha(0.2);
        this.enemy1_shot = true;
      }
    );

    this.physics.add.overlap(
      this.arthur,
      this.enemy1_weapon.bullets,
      (arthur, bullet) => {
        bullet.kill();
        arthur.setAlpha(0.5);
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
          accelerationY: -300,
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

  update() {
    this.enemyFire();
  }
}
