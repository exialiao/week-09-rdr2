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
  mountain3: Phaser.GameObjects.Image;

  farm: Phaser.GameObjects.Image;
  ground: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  enemy1: Enemy;
  arthur: Arthur;
  enemy2: Enemy;
  enemy3: Enemy;
  enemy4: Enemy;
  enemy5: Enemy;
  enemy6: Enemy;
  enemy7: Enemy;
  carriage2: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  carriage2Overlap: Phaser.Physics.Arcade.Collider;

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

    this.mountain3 = this.add.image(20, 470, 'mountain_3').setOrigin(0, 0);
    this.mountain3.setScrollFactor(0.2);

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
      .setScrollFactor(1);
    // missshot
    this.missShotArea = this.physics.add
      .sprite(1440, 300, 'miss_area')
      .setAlpha(0)
      .setScrollFactor(1);

    this.plugins.installScenePlugin(
      'WeaponPlugin',
      WeaponPlugin,
      'weapons',
      this
    );

    this.arthur = new Arthur(this);

    // enemy
    this.enemy1 = new Enemy(this, 900, 485);
    this.enemy2 = new Enemy(this, 1500, 485);
    this.enemy3 = new Enemy(this, 2100, 445);
    this.enemy4 = new Enemy(this, 2700, 485);
    this.enemy5 = new Enemy(this, 3300, 485);
    this.enemy6 = new Enemy(this, 3900, 485);
    this.enemy7 = new Enemy(this, 4500, 485);
    // arthur git hit
    this.physics.add.overlap(
      this.arthur,
      this.enemy1.weapon.bullets,
      (arthur: Arthur, bullet) => {
        arthur.getsHit(arthur, bullet);
        this.arthur.is_killed = true;
      }
    );

    this.physics.add.overlap(
      this.arthur,
      this.enemy2.weapon.bullets,
      (arthur: Arthur, bullet) => {
        arthur.getsHit(arthur, bullet);
        this.arthur.is_killed = true;
      }
    );
    this.physics.add.overlap(
      this.arthur,
      this.enemy3.weapon.bullets,
      (arthur: Arthur, bullet) => {
        arthur.getsHit(arthur, bullet);
        this.arthur.is_killed = true;
      }
    );
    this.physics.add.overlap(
      this.arthur,
      this.enemy4.weapon.bullets,
      (arthur: Arthur, bullet) => {
        arthur.getsHit(arthur, bullet);
        this.arthur.is_killed = true;
      }
    );
    this.physics.add.overlap(
      this.arthur,
      this.enemy5.weapon.bullets,
      (arthur: Arthur, bullet) => {
        arthur.getsHit(arthur, bullet);
        this.arthur.is_killed = true;
      }
    );
    this.physics.add.overlap(
      this.arthur,
      this.enemy6.weapon.bullets,
      (arthur: Arthur, bullet) => {
        arthur.getsHit(arthur, bullet);
        this.arthur.is_killed = true;
      }
    );
    this.physics.add.overlap(
      this.arthur,
      this.enemy7.weapon.bullets,
      (arthur: Arthur, bullet) => {
        arthur.getsHit(arthur, bullet);
        this.arthur.is_killed = true;
      }
    );

    // missshoot
    this.physics.add.overlap(
      this.ground,
      this.arthur.weapon.bullets,
      (ground, bullet) => {
        bullet.kill();
        if(this.enemy1.is_killed==false){
        this.enemy1.can_shoot = true;}
        if (this.enemy1.is_killed == true && this.enemy2.is_killed == false) {
          this.enemy2.can_shoot = true;
        }
        if (this.enemy2.is_killed == true && this.enemy3.is_killed == false) {
          this.enemy3.can_shoot = true;
        }
        if (this.enemy3.is_killed == true && this.enemy4.is_killed == false) {
          this.enemy4.can_shoot = true;
        }
        if (this.enemy4.is_killed == true && this.enemy5.is_killed == false) {
          this.enemy5.can_shoot = true;
        }
        if (this.enemy5.is_killed == true && this.enemy6.is_killed == false) {
          this.enemy6.can_shoot = true;
        }
        if (this.enemy6.is_killed == true && this.enemy7.is_killed == false) {
          this.enemy7.can_shoot = true;
        }


      }
    );



    this.physics.add.overlap(
      this.missShotArea,
      this.arthur.weapon.bullets,
      (missShotArea, bullet) => {
        bullet.kill();
         if (this.enemy1.is_killed == false) {
           this.enemy1.can_shoot = true;
         }
         if (this.enemy1.is_killed == true && this.enemy2.is_killed == false) {
           this.enemy2.can_shoot = true;
         }
         if (this.enemy2.is_killed == true && this.enemy3.is_killed == false) {
           this.enemy3.can_shoot = true;
         }
         if (this.enemy3.is_killed == true && this.enemy4.is_killed == false) {
           this.enemy4.can_shoot = true;
         }
         if (this.enemy4.is_killed == true && this.enemy5.is_killed == false) {
           this.enemy5.can_shoot = true;
         }
         if (this.enemy5.is_killed == true && this.enemy6.is_killed == false) {
           this.enemy6.can_shoot = true;
         }
         if (this.enemy6.is_killed == true && this.enemy7.is_killed == false) {
           this.enemy7.can_shoot = true;
         }
      }
    );



    // camera
    this.cameras.main.setBounds(0, 0, 10840, 600);
    this.cameras.main.startFollow(this.arthur);
    this.cameras.main.setFollowOffset(-420, 0);
  }

  moveForward() {
    if (this.arthur.x <= this.enemy1.x && this.enemy1.is_killed == true) {
      this.arthur.anims.play('arthur_run', true);
      this.arthur.x += 5;
      this.arthur.y = 500;
      this.physics.world.bounds.width += 5;
      this.arthur.gun.visible = false;
      return;
    }

    if (this.arthur.x <= this.enemy2.x && this.enemy2.is_killed == true) {
      this.arthur.anims.play('arthur_run', true);
      this.arthur.x += 5;
      this.arthur.y = 500;
      this.physics.world.bounds.width += 5;
      this.arthur.gun.visible = false;
      return;
    }
    if (this.arthur.x <= this.enemy3.x && this.enemy3.is_killed == true) {
      this.arthur.anims.play('arthur_run', true);
      this.arthur.x += 5;
      this.arthur.y = 500;
      this.physics.world.bounds.width += 5;
      this.arthur.gun.visible = false;
      return;
    }
    if (this.arthur.x <= this.enemy4.x && this.enemy4.is_killed == true) {
      this.arthur.anims.play('arthur_run', true);
      this.arthur.x += 5;
      this.arthur.y = 500;
      this.physics.world.bounds.width += 5;
      this.arthur.gun.visible = false;
      return;
    }
    if (this.arthur.x <= this.enemy5.x && this.enemy5.is_killed == true) {
      this.arthur.anims.play('arthur_run', true);
      this.arthur.x += 5;
      this.arthur.y = 500;
      this.physics.world.bounds.width += 5;
      this.arthur.gun.visible = false;
      return;
    }
    if (this.arthur.x <= this.enemy6.x && this.enemy6.is_killed == true) {
      this.arthur.anims.play('arthur_run', true);
      this.arthur.x += 5;
      this.arthur.y = 500;
      this.physics.world.bounds.width += 5;
      this.arthur.gun.visible = false;
      return;
    }
    if (this.arthur.x <= this.enemy7.x && this.enemy7.is_killed == true) {
      this.arthur.anims.play('arthur_run', true);
      this.arthur.x += 5;
      this.arthur.y = 500;
      this.physics.world.bounds.width += 5;
      this.arthur.gun.visible = false;
      return;
    }

    this.arthur.stopRun();
  }

  update() {
    if (this.arthur.canMoveForward) {
      this.moveForward();
      this.ground.x = this.arthur.x - 300;
      this.missShotArea.x = this.arthur.x + 1140;
    }

    if (this.arthur.is_killed == true) {
      setTimeout(() => {
        this.scene.pause('level-1');
      }, 2000);

      this.scene.launch('gameover');
    }

    this.cloud.tilePositionX += 0.5;
  }
}
