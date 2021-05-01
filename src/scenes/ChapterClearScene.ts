export default class ChapterClearScene extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  ground: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  nextButton: Phaser.GameObjects.Image;
  playAgainButton: any;
  constructor() {
    super('chapterclear');
  }

  preload() {}

  create() {
    this.nextButton = this.add
      .image(450, 220, 'nextChapter')
      .setOrigin(0, 0)
      .setScale(0.7);

    this.nextButton.setInteractive();

    this.nextButton.on('pointerdown', () => {
      this.scene.start('level-1');
    });

    this.playAgainButton = this.add
      .image(600, 400, 'playAgain')
      .setOrigin(0, 0)
      .setScale(0.5);

    this.playAgainButton.setInteractive();

    this.playAgainButton.on('pointerdown', () => {
      this.scene.start('level-1');
    }); // Start the main game.

    this.cameras.main.fadeIn(2500, 0, 0, 0);
  }

  update() {
    // this.cloud.tilePositionX += 0.5;
  }
}
