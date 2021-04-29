import{c as t,W as s}from"./vendor.00ed412d.js";!function(t=".",s="__import__"){try{self[s]=new Function("u","return import(u)")}catch(i){const e=new URL(t,location),a=t=>{URL.revokeObjectURL(t.src),t.remove()};self[s]=t=>new Promise(((i,r)=>{const n=new URL(t,e);if(self[s].moduleMap[n])return i(self[s].moduleMap[n]);const o=new Blob([`import * as m from '${n}';`,`${s}.moduleMap['${n}']=m;`],{type:"text/javascript"}),h=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(o),onerror(){r(new Error(`Failed to import: ${t}`)),a(h)},onload(){i(self[s].moduleMap[n]),a(h)}});document.head.appendChild(h)})),self[s].moduleMap={}}}("assets/");class i extends Phaser.Scene{constructor(){super("preloader")}preload(){this.load.image("title","assets/img/title.png"),this.load.image("start","assets/img/start.png"),this.load.image("background","assets/img/background.png"),this.load.image("sun","assets/img/sun.png"),this.load.image("birds","assets/img/birds.png"),this.load.image("cloud","assets/img/cloud.png"),this.load.image("mountain_1","assets/img/mountain_1.png"),this.load.image("mountain_2","assets/img/mountain_2.png"),this.load.image("mountain_3a","assets/img/mountain_3a.png"),this.load.image("mountain_3b","assets/img/mountain_3b.png"),this.load.image("farm","assets/img/farm.png"),this.load.image("roadsign","assets/img/roadsign.png"),this.load.image("bg_horse","assets/img/bg_horse.png"),this.load.image("carriage","assets/img/carriage.png"),this.load.image("tent","assets/img/tent.png"),this.load.image("tree","assets/img/tree.png"),this.load.image("ground","assets/img/ground.png"),this.load.image("miss_area","assets/img/miss_area.png"),this.load.atlas("arthur_run","assets/img/arthur/arthur_run.png","assets/img/arthur/arthur_run.json"),this.load.spritesheet("arthur_shot_body","assets/img/arthur/arthur_shot_body.png",{frameWidth:150,frameHeight:192}),this.load.image("arthur_shot_arm","assets/img/arthur/arthur_shot_arm.png"),this.load.image("arthur_fireline","assets/img/arthur/arthur_fireline.png"),this.load.image("gun_smoke","assets/img/arthur/gun_smoke.png"),this.load.image("bullet","assets/img/arthur/bullet.png"),this.load.image("enemy1_body","assets/img/enemy/enemy1_body.png"),this.load.image("enemy1_gun","assets/img/enemy/enemy1_gun.png"),this.load.audio("background_music","assets/sound/background.mp3"),this.load.audio("shot_sound","assets/sound/shot.mp3")}create(){this.scene.start("gamestart")}}class e extends Phaser.GameObjects.Sprite{constructor(t,s){super(t,s,485,"enemy1_body"),this.is_killed=!1,this.can_shoot=!1,t.add.existing(this),t.physics.add.existing(this),this.arthur=this.scene.arthur,this.gun=t.add.sprite(s-50,445,"enemy1_gun"),this.weapon=this.scene.add.weapon(100,"bullet"),this.weapon.debugPhysics=!0,this.weapon.bulletAngleOffset=90,this.weapon.bulletSpeed=2e3,this.gunTopLeft=this.gun.getTopLeft(),this.scene.physics.add.overlap(this,this.arthur.weapon.bullets,((t,s)=>{t.getsHit(t,s),this.arthur.canMoveForward=!0}))}preUpdate(t,s){super.preUpdate(t,s),this.enemyFire()}enemyFire(){1==this.can_shoot&&(this.weapon.fireAngle=-180,this.weapon.fire(this.gunTopLeft,void 0,void 0,-1,10),this.can_shoot=!1)}getsHit(t,s){s.kill(),t.gun.destroy(),t.can_shoot=!1,t.is_killed=!0,t.destroy()}}class a extends Phaser.GameObjects.Sprite{constructor(s){super(s,300,485,"arthur_shot_body"),this.is_killed=!1,this.can_shoot=!1,this.canMoveForward=!1,s.add.existing(this),s.physics.add.existing(this),this.createAnims(),this.visible=!0,this.fireLine=this.scene.add.sprite(280,425,"arthur_fireline"),this.fireLine.setOrigin(0,0),this.fireLine.visible=!1,this.gunAngle=50,this.gun=this.scene.add.sprite(280,425,"arthur_shot_arm"),this.gun.setOrigin(0,0),this.gun.setAngle(-this.gunAngle/2),this.gun.visible=!0,this.gunTween=s.tweens.add({targets:this.gun,angle:this.gunAngle,duration:2e3,repeat:-1,yoyo:!0,callbackScope:this}),this.weapon=this.scene.add.weapon(100,"bullet"),this.weapon.debugPhysics=!0,this.weapon.bulletAngleOffset=90,this.weapon.bulletSpeed=2e3,this.weapon.bulletKillType=t.KillType.KILL_WORLD_BOUNDS,this.gunTopRight=this.gun.getTopRight(),this.shot_sound=s.sound.add("shot_sound"),this.scene.input.on("pointerdown",this.shootWeapon,this)}createAnims(){this.anims.create({key:"arthur_stand",frames:this.anims.generateFrameNumbers("arthur_shot_body",{frames:[0]}),frameRate:1,repeat:-1}),this.anims.create({key:"arthur_run",frames:this.anims.generateFrameNames("arthur_run",{start:0,end:19,zeroPad:5,prefix:"arthur_run_",suffix:".png"}),frameRate:26,repeat:-1})}shootWeapon(){this.gunTween.pause(),this.shot_sound.play(),this.weapon.fireAngle=this.gun.angle+2.5,this.gunTopRight=this.gun.getTopRight(),this.weapon.fire(this.gunTopRight,void 0,void 0,-10,10),this.fireLine.visible||(this.fireLine.visible=!0,this.fireLine.angle=this.gun.angle,this.scene.time.addEvent({delay:100,callbackScope:this,callback:function(){this.fireLine.visible=!1}})),this.gun_smoke=this.scene.add.particles("gun_smoke"),this.gun_smoke.createEmitter({alpha:{start:.5,end:0},scale:{start:.5,end:2.5},speed:20,accelerationY:-500,angle:{min:-85,max:-95},rotate:{min:-180,max:180},lifespan:{min:1e3,max:1100},blendMode:"ADD",frequency:110,maxParticles:5,x:this.gunTopRight.x,y:this.gunTopRight.y})}getsHit(t,s){s.kill(),this.is_killed=!0,t.destroy(),t.gun.destroy()}moveForward(){if(this.x<=1e3)return this.anims.play("arthur_run",!0),this.x+=5,this.y=500,this.scene.physics.world.bounds.width+=5,void(this.gun.visible=!1);this.canMoveForward=!1,this.anims.play("arthur_stand",!0),this.y=485,this.gun.x=this.x-20,this.fireLine.x=this.gun.x,this.gun.visible=!0,this.gunTween.resume()}}class r extends Phaser.Scene{constructor(){super("level-1"),this.gameOver=!1}create(){this.background=this.add.image(0,0,"background").setOrigin(0,0),this.background.setScrollFactor(0),this.sun=this.add.image(500,200,"sun").setOrigin(0,0),this.sun.setScrollFactor(0),this.cloud=this.add.tileSprite(0,0,1440,600,"cloud").setOrigin(0,0),this.cloud.setScrollFactor(0),this.mountain1=this.add.image(0,330,"mountain_1").setOrigin(0,0),this.mountain1.setScrollFactor(.05),this.mountain2=this.add.tileSprite(-150,400,2133,204,"mountain_2").setOrigin(0,0),this.mountain2.setScrollFactor(.1),this.mountain3a=this.add.image(20,470,"mountain_3a").setOrigin(0,0),this.mountain3a.setScrollFactor(.2),this.mountain3b=this.add.image(900,445,"mountain_3b").setOrigin(0,0),this.mountain3b.setScrollFactor(.2),this.farm=this.add.image(870,475,"farm").setOrigin(0,0),this.farm.setScrollFactor(.45),this.add.image(950,455,"roadsign").setOrigin(0,0).setScrollFactor(.85),this.add.image(1100,390,"carriage").setOrigin(0,0).setScrollFactor(.95),this.add.image(-50,390,"tent").setOrigin(0,0).setScrollFactor(.85),this.add.image(400,400,"bg_horse").setOrigin(0,0).setScrollFactor(.85),this.add.image(550,100,"tree").setOrigin(0,0).setScrollFactor(.75),this.ground=this.physics.add.image(0,550,"ground").setOrigin(0,0).setScrollFactor(1),this.missShotArea=this.physics.add.sprite(1440,300,"miss_area").setAlpha(0).setScrollFactor(1),this.plugins.installScenePlugin("WeaponPlugin",s,"weapons",this),this.arthur=new a(this),this.enemy1=new e(this,1e3),this.enemy2=new e(this,1700),this.physics.add.overlap(this.arthur,this.enemy1.weapon.bullets,((t,s)=>{t.getsHit(t,s),this.arthur.is_killed=!0})),this.physics.add.overlap(this.ground,this.arthur.weapon.bullets,((t,s)=>{s.kill(),this.enemy1.can_shoot=!0,this.enemy2.can_shoot=!0})),this.physics.add.overlap(this.missShotArea,this.arthur.weapon.bullets,((t,s)=>{s.kill(),this.enemy1.can_shoot=!0,this.enemy2.can_shoot=!0})),this.cameras.main.setBounds(0,0,10840,600),this.cameras.main.startFollow(this.arthur),this.cameras.main.setFollowOffset(-420,0)}update(){1==this.enemy1.is_killed&&this.arthur.canMoveForward&&(this.arthur.moveForward(),this.ground.x=this.arthur.x-300,this.missShotArea.x=this.arthur.x+1140),1==this.arthur.is_killed&&(this.scene.stop("level-1"),this.scene.start("gameover")),this.cloud.tilePositionX+=.5}}class n extends Phaser.Scene{constructor(){super("gamestart")}preload(){}create(){this.background=this.add.image(0,0,"background").setOrigin(0,0),this.background.setScrollFactor(0),this.sun=this.add.image(500,200,"sun").setOrigin(0,0),this.sun.setScrollFactor(0),this.cloud=this.add.tileSprite(0,0,1440,600,"cloud").setOrigin(0,0),this.cloud.setScrollFactor(0),this.mountain1=this.add.image(0,330,"mountain_1").setOrigin(0,0),this.mountain1.setScrollFactor(.05),this.mountain2=this.add.tileSprite(-150,400,2133,204,"mountain_2").setOrigin(0,0),this.mountain2.setScrollFactor(.1),this.mountain3a=this.add.image(20,470,"mountain_3a").setOrigin(0,0),this.mountain3a.setScrollFactor(.2),this.mountain3b=this.add.image(900,445,"mountain_3b").setOrigin(0,0),this.mountain3b.setScrollFactor(.2),this.farm=this.add.image(870,475,"farm").setOrigin(0,0),this.farm.setScrollFactor(.45),this.add.image(950,455,"roadsign").setOrigin(0,0).setScrollFactor(.85),this.add.image(1100,390,"carriage").setOrigin(0,0).setScrollFactor(.95),this.add.image(-50,390,"tent").setOrigin(0,0).setScrollFactor(.85),this.add.image(400,400,"bg_horse").setOrigin(0,0).setScrollFactor(.85),this.add.image(550,100,"tree").setOrigin(0,0).setScrollFactor(.75),this.title=this.add.image(330,100,"title").setOrigin(0,0),this.title.setScale(.7),this.startButton=this.add.image(635,400,"start").setOrigin(0,0).setScale(.5),this.startButton.setInteractive(),this.startButton.on("pointerdown",(()=>{this.scene.stop("gamestart"),this.scene.start("level-1")})),this.ground=this.physics.add.image(0,550,"ground").setOrigin(0,0).setScrollFactor(0),this.background_music=this.sound.add("background_music"),this.background_music.play()}update(){this.cloud.tilePositionX+=.5}}class o extends Phaser.Scene{constructor(){super("gameover")}preload(){}create(){this.background=this.add.image(0,0,"background").setOrigin(0,0),this.background.setScrollFactor(0),this.sun=this.add.image(500,200,"sun").setOrigin(0,0),this.sun.setScrollFactor(0),this.cloud=this.add.tileSprite(0,0,1440,600,"cloud").setOrigin(0,0),this.cloud.setScrollFactor(0),this.mountain1=this.add.image(0,330,"mountain_1").setOrigin(0,0),this.mountain1.setScrollFactor(.05),this.mountain2=this.add.tileSprite(-150,400,2133,204,"mountain_2").setOrigin(0,0),this.mountain2.setScrollFactor(.1),this.mountain3a=this.add.image(20,470,"mountain_3a").setOrigin(0,0),this.mountain3a.setScrollFactor(.2),this.mountain3b=this.add.image(900,445,"mountain_3b").setOrigin(0,0),this.mountain3b.setScrollFactor(.2),this.farm=this.add.image(870,475,"farm").setOrigin(0,0),this.farm.setScrollFactor(.45),this.add.image(950,455,"roadsign").setOrigin(0,0).setScrollFactor(.85),this.add.image(1100,390,"carriage").setOrigin(0,0).setScrollFactor(.95),this.add.image(-50,390,"tent").setOrigin(0,0).setScrollFactor(.85),this.add.image(400,400,"bg_horse").setOrigin(0,0).setScrollFactor(.85),this.add.image(550,100,"tree").setOrigin(0,0).setScrollFactor(.75),this.title=this.add.image(330,100,"title").setOrigin(0,0),this.title.setScale(.7),this.startButton=this.add.image(635,400,"start").setOrigin(0,0).setScale(.5),this.startButton.setInteractive(),this.startButton.on("pointerdown",(()=>{this.scene.start("level-1")})),this.ground=this.physics.add.image(0,550,"ground").setOrigin(0,0).setScrollFactor(0),this.background_music=this.sound.add("background_music"),this.background_music.play()}update(){this.cloud.tilePositionX+=.5}}const h={type:Phaser.AUTO,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH,width:1440,height:600},physics:{default:"arcade",arcade:{gravity:{y:0},debug:!0}},scene:[i,n,r,o]};new Phaser.Game(h);
