import { Weapon } from 'phaser3-weapon-plugin';

export default class Arthur extends Phaser.GameObjects.Sprite {
  physics: any;

  gun: Phaser.GameObjects.Sprite;
  weapon: Weapon;
  add: any;
  gunTopLeft: any;

  is_killed: boolean = false;
  can_shoot: boolean = false;
  // run: Phaser.GameObjects.Sprite;

  fireLine: any;
  gunAngle: number;
  gunTween: any;
  plugins: any;
  gunTopRight: any;
  gun_smoke: Phaser.GameObjects.Particles.ParticleEmitterManager;
  run: Phaser.GameObjects.GameObject;
  shot_sound: any;

  constructor(scene: Phaser.Scene) {
    // super(Level1Scene, 1000, 485, config.key);
    super(scene, 300, 485, 'arthur_shot_body');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    //arthur run
    this.createAnims();

    // this.run = this.scene.add.sprite(300, 500, 'arthur_run');
    // this.run.setScale(0.5);
    // this.run.visible = false;
    // this.run.play('arthur_run');

    // arthur shot
    // this.arthur = this.scene.add.image(300, 485, 'arthur_shot_body');
    this.visible = true;

    this.fireLine = this.scene.add.sprite(280, 425, 'arthur_fireline');
    this.fireLine.setOrigin(0, 0);
    this.fireLine.visible = false;

    // the rotating gun
    this.gunAngle = 50;
    this.gun = this.scene.add.sprite(280, 425, 'arthur_shot_arm');
    this.gun.setOrigin(0, 0);
    this.gun.setAngle(-(this.gunAngle / 2));
    this.gun.visible = true;

    this.gunTween = scene.tweens.add({
      targets: [this.gun],
      angle: this.gunAngle,
      duration: 2000,
      repeat: -1,
      // yoyo is for reverse;
      yoyo: true,
      callbackScope: this,
    });

    // Arthur weapon
    //  Creates 3 bullets, using the 'bullet' graphic
    this.weapon = this.scene.add.weapon(100, 'bullet');

    // Enable physics debugging for the bullets
    this.weapon.debugPhysics = true;

    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.weapon.bulletAngleOffset = 90;

    //  The speed at which the bullet is fired
    this.weapon.bulletSpeed = 2000;

    //  Tell the Weapon to track the 'player' Sprite
    this.gunTopRight = this.gun.getTopRight();

    // shot sound
    this.shot_sound = scene.sound.add('shot_sound');

    // shot
    this.scene.input.on('pointerdown', this.fire, this);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
  }

  createAnims() {
    this.anims.create({
      key: 'arthur_stand',
      frames: this.anims.generateFrameNumbers('arthur_shot_body', {
        frames: [0],
      }),
      frameRate: 1,
      repeat: -1,
    });

    this.anims.create({
      key: 'arthur_run',
      frames: this.anims.generateFrameNames('arthur_run', {
        start: 0,
        end: 19,
        zeroPad: 5,
        prefix: 'arthur_run_',
        suffix: '.png',
      }),
      frameRate: 26,
      repeat: -1,
    });
  }

  fire() {
    // arthur shot
    this.weapon.fireAngle = this.gun.angle + 2.5;
    this.gunTopRight = this.gun.getTopRight();
    this.weapon.fire(this.gunTopRight, undefined, undefined, -10, 10);
    this.gunTween.pause();
    this.shot_sound.play();

    // we say we can fire when the fire line is not visible
    if (!this.fireLine.visible) {
      this.fireLine.visible = true;

      this.fireLine.angle = this.gun.angle;

      this.scene.time.addEvent({
        delay: 100,
        callbackScope: this,
        callback: function () {
          this.fireLine.visible = false;
        },
      });
    }

    // gun smoke
    this.gun_smoke = this.scene.add.particles('gun_smoke');

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
  }

  shot(arthur, bullet) {
    bullet.kill();
    this.is_killed = true;

    arthur.destroy();
    arthur.gun.destroy();
  }

  moveForward() {
    if (this.x <= 1000) {
      this.anims.play('arthur_run', true);
      // this.visible = true;
      this.x += 5;
      this.y = 500;

      // this.visible = false;
      this.gun.visible = false;
    } else if (this.x > 1000) {
      this.anims.play('arthur_stand', true);
      this.stop();
      this.x = this.x;
      this.y = 485;

      // this.visible = true;
      // this.visible = false;
      this.gun.x = this.x - 20;
      this.fireLine.x = this.gun.x;
      this.gun.visible = true;
      this.gunTween.play();
    }
  }
}
