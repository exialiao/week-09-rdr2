import Phaser from 'phaser';
import { Weapon } from 'phaser3-weapon-plugin';

export default class Enemy extends Phaser.GameObjects.Sprite {
  physics: any;

  gun: Phaser.GameObjects.Sprite;
  weapon: Weapon;
  add: any;
  gunTopLeft: any;

  // TODO: Do I need is_alive and is_killed?
  is_alive: boolean = true;
  is_killed: boolean = false;
  can_shoot: boolean = false;

  constructor(scene: Phaser.Scene, x: number) {
    // super(Level1Scene, 1000, 485, config.key);
    super(scene, x, 485, 'enemy1_body');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // enemy
    this.gun = scene.add.sprite(950, 445, 'enemy1_gun');

    // enemy weapon

    this.weapon = this.scene.add.weapon(100, 'bullet');
    this.weapon.debugPhysics = true;
    this.weapon.bulletAngleOffset = 90;
    this.weapon.bulletSpeed = 2000;

    // TODO: Rename to something meaningful
    this.gunTopLeft = this.gun.getTopLeft();
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

    this.weapon.fireAngle = -180;
    this.weapon.fire(this.gunTopLeft, undefined, undefined, -1, 10);
    this.can_shoot = false;
  }
}
