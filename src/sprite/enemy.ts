import Phaser from 'phaser';
import { WeaponPlugin } from 'phaser3-weapon-plugin';
import Level1Scene from '../scenes/Level1Scene';
export default class Enemy extends Phaser.GameObjects.Sprite {
    alive: boolean;
    enemy1: any;
    physics: any;
 
    constructor(config) {
      super(Level1Scene, 1000, 485, config.key);
      config.scene.physics.world.enable(this);
      config.scene.add.existing(this);
      this.alive = true;

      // enemy
      this.enemy1 = this.physics.add.sprite(1000, 485, 'enemy1_body');
      this.enemy1_gun = this.add.sprite(950, 445, 'enemy1_gun');

      this.enemy1_killed = false;
      // enemy weapon

      this.enemy1_weapon = this.add.weapon(100, 'bullet');
      this.enemy1_weapon.debugPhysics = true;
      this.enemy1_weapon.bulletAngleOffset = 90;
      this.enemy1_weapon.bulletSpeed = 2000;
      this.enemy1_gunTopLeft = this.enemy1_gun.getTopLeft();

      this.enemy1_shot = false;
    }



}
