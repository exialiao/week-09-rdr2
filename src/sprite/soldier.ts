import { Weapon } from 'phaser3-weapon-plugin';
import Arthur from './arthur';

export default class Soldier extends Phaser.GameObjects.Sprite {
  physics: any;

  gun: Phaser.GameObjects.Sprite;
  weapon: Weapon;
  gunTopLeft: any;

  is_killed: boolean = false;
  can_shoot: boolean = false;
  arthur: Arthur;
  gun_smoke: Phaser.GameObjects.Particles.ParticleEmitterManager;
  shot_sound: Phaser.Sound.BaseSound;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // super(Level1Scene, 1000, 485, config.key);
    super(scene, x, y, 'soldier');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.arthur = this.scene.arthur;

    // enemy weapon

    this.weapon = this.scene.add.weapon(1, 'bullet');
    this.weapon.debugPhysics = true;
    this.weapon.bulletAngleOffset = 90;
    this.weapon.bulletSpeed = 2000;

    this.scene.physics.add.overlap(
      this,
      this.arthur.weapon.bullets,
      (soldier: Soldier, bullet) => {
        soldier.getsHit(soldier, bullet);
        this.arthur.canMoveForward = true;
      }
    );

    this.shot_sound = scene.sound.add('shot_sound');
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.soldierFire();
  }

  // enemey shot
  soldierFire() {
    if (this.can_shoot != true) {
      return;
    }
    setTimeout(() => {
      this.weapon.fireAngle = -180;
      this.weapon.fire(this, undefined, undefined, -55, -30);
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
        x: this.x - 55,
        y: this.y - 30,
      });
    }, 500);
    this.can_shoot = false;
  }

  getsHit(soldier, bullet) {
    bullet.kill();

    soldier.can_shoot = false;
    soldier.is_killed = true;
    soldier.destroy();
  }
}
