import { Weapon } from 'phaser3-weapon-plugin';
import Arthur from './arthur';

export default class Enemy extends Phaser.GameObjects.Sprite {
  physics: any;

  gun: Phaser.GameObjects.Sprite;
  weapon: Weapon;
  gunTopLeft: any;

  is_killed: boolean = false;
  can_shoot: boolean = false;
  arthur: Arthur;
  shot_sound: any;
  gun_smoke: Phaser.GameObjects.Particles.ParticleEmitterManager;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // super(Level1Scene, 1000, 485, config.key);
    super(scene, x, y, 'enemy1_body');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.arthur = this.scene.arthur;

    // enemy
    this.gun = scene.add.sprite(x - 50, y - 40, 'enemy1_gun');

    // enemy weapon

    this.weapon = this.scene.add.weapon(1, 'bullet');
    this.weapon.debugPhysics = true;
    this.weapon.bulletAngleOffset = 90;
    this.weapon.bulletSpeed = 2000;

    this.gunTopLeft = this.gun.getTopLeft();

    this.scene.physics.add.overlap(
      this,
      this.arthur.weapon.bullets,
      (enemy: Enemy, bullet) => {
        enemy.getsHit(enemy, bullet);
        this.arthur.canMoveForward = true;
      }
    );

    this.shot_sound = scene.sound.add('shot_sound');
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.enemyFire();
  }

  // enemey shot
  enemyFire() {
    if (this.can_shoot != true) {
      return;
    }
    setTimeout(() => {
      this.weapon.fireAngle = -180;
      this.weapon.fire(this.gunTopLeft, undefined, undefined, 0, 0);
      this.shot_sound.play();
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
        x: this.gunTopLeft.x,
        y: this.gunTopLeft.y,
      });
    }, 500);
    this.can_shoot = false;
  }

  getsHit(enemy, bullet) {
    bullet.kill();
    enemy.gun.destroy();
    enemy.can_shoot = false;
    enemy.is_killed = true;
    enemy.destroy();
  }
}
