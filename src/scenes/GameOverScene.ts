export default class Gameover extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  startButton: Phaser.GameObjects.Image;
  title: Phaser.GameObjects.Image;
  constructor() {
    super('gameover');
  }

  preload() {}

  create() {


    this.title = this.add.image(500, 100, 'dead').setOrigin(0, 0);
    this.title.setScale(1);

    this.startButton = this.add
      .image(635, 400, 'start')
      .setOrigin(0, 0)
      .setScale(0.5);

    this.startButton.setInteractive();

    this.startButton.on('pointerdown', () => {
      this.scene.start('level-1');
    }); // Start the main game.

    this.cameras.main.fadeIn(2500, 255, 0, 0);
  }

  update() {
    // this.cloud.tilePositionX += 0.5;
  }
}
