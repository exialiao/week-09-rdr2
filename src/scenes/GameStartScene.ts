export default class Gamestart extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  startButton: Phaser.GameObjects.Image;
  background: Phaser.GameObjects.Image;
  sun: Phaser.GameObjects.Image;
  cloud: Phaser.GameObjects.TileSprite;
  mountain1: Phaser.GameObjects.Image;
  mountain2: Phaser.GameObjects.TileSprite;
  mountain3a: Phaser.GameObjects.Image;
  farm: Phaser.GameObjects.Image;
  mountain3b: any;
  background_music: Phaser.Sound.BaseSound;
  ground: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  title: Phaser.GameObjects.Image;
  constructor() {
    super('gamestart');
  }

  preload() {}

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

    this.title = this.add.image(330, 100, 'title').setOrigin(0, 0);
    this.title.setScale(0.7);

    this.startButton = this.add
      .image(635, 400, 'start')
      .setOrigin(0, 0)
      .setScale(0.5);

    this.startButton.setInteractive();

    this.startButton.on('pointerdown', () => {
      this.scene.stop('gamestart');
      this.scene.start('level-1');
    }); // Start the main game.

    this.ground = this.physics.add
      .image(0, 550, 'ground')
      .setOrigin(0, 0)
      .setScrollFactor(0);

    this.background_music = this.sound.add('background_music');

    this.background_music.play();
  }

  update() {
    this.cloud.tilePositionX += 0.5;
  }
}
