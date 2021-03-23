export default function createArthurAnims(anims) {
  anims.create({
    key: 'arthur_run',
    frames: anims.generateFrameNames('arthur_run', {
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
