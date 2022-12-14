import Phaser from "phaser";
import { OriginalButtonClass } from "./buttonClass";

const canvasWidth = 380;
const canvasHeight = 380;
let player: Phaser.Physics.Arcade.Sprite;
let imagePath;
class TitleScene extends Phaser.Scene {
  button: any;
  constructor() {
    super("titleScene");
  }
  init() {}
  preload() {
    this.load.image("octocat", imagePath.octocat);
    this.load.image("bg", imagePath.bg);
    this.load.image("bug", imagePath.bug);
  }

  create() {
    this.add.image(canvasWidth / 2, canvasHeight / 2, "bg");

    player = this.physics.add.sprite(
      canvasWidth / 2,
      canvasHeight / 2,
      "octocat"
    );

    this.add
      .text(canvasWidth / 2, 100, "OctocatRun")
      .setFont("32px Arial")
      .setColor("#000")
      .setAlign("center")
      .setLineSpacing(10)
      .setOrigin(0.5, 0.5);

    this.button = new OriginalButtonClass(
      this,
      canvasWidth / 2,
      canvasHeight - 100,
      "Start",
      {
        onClick: () => {
          this.scene.start("playScene");
        },
      }
    );
  }
  update() {
    let cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
      player.setVelocityX(200);
    } else {
      player.setVelocityX(0);
    }
    if (player.x < 50) {
      player.setX(50);
    }
    if (player.x > canvasWidth - 50) {
      player.setX(canvasWidth - 50);
    }
  }
}
let bugGroup: Phaser.Physics.Arcade.Group;
class PlayScene extends Phaser.Scene {
  button: any;
  private score: number;
  private scoreText?: Phaser.GameObjects.Text;
  private isGameOver: boolean;
  constructor() {
    super("playScene");
    this.score = 0;
    this.isGameOver = false;
  }
  init() {}
  preload() {}

  create() {
    this.add.image(canvasWidth / 2, canvasHeight / 2, "bg");

    player = this.physics.add.sprite(
      canvasWidth / 2,
      canvasHeight - 60,
      "octocat"
    );

    bugGroup = this.physics.add.group();
    bugGroup.create(Math.random() * canvasWidth - 100 + 100, -300, "bug");
    bugGroup.create(Math.random() * canvasWidth - 100 + 100, -600, "bug");
    bugGroup.create(Math.random() * canvasWidth - 100 + 100, 0, "bug");

    this.physics.add.overlap(
      player,
      bugGroup,
      () => {
        this.add
          .text(canvasWidth / 2, 150, "GAMEOVER")
          .setFont("60px Arial")
          .setColor("#000")
          .setAlign("center")
          .setLineSpacing(10)
          .setOrigin(0.5, 0.5);
        this.isGameOver = true;
        player.removedFromScene();
        this.button = new OriginalButtonClass(
          this,
          canvasWidth / 2,
          canvasHeight - 100,
          "Retry",
          {
            onClick: () => {
              //@ts-ignore
              this.scene.restart("playScene");
              this.score = 0;
              this.isGameOver = false;
            },
          }
        );
      },
      undefined,
      this
    );

    this.scoreText = this.add
      .text(60, 60, String(this.score))
      .setFont("60px Arial")
      .setColor("#000")
      .setAlign("center")
      .setLineSpacing(10)
      .setOrigin(0.5, 0.5);
  }
  update() {
    bugGroup.setVelocityY(200);
    bugGroup.children.entries.forEach(b => {
      //@ts-ignore
      if (b.y > canvasHeight) {
        //@ts-ignore
        b.setY(-300);
        //@ts-ignore
        b.setX(Math.random() * canvasWidth - 50 + 50);
      }
    });

    if (this.isGameOver) {
      return;
    }
    this.score++;
    this.scoreText?.setText(String(Math.ceil(this.score / 10)));
    let cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
      player.setVelocityX(200);
    } else {
      player.setVelocityX(0);
    }
    if (player.x < 50) {
      player.setX(50);
    }
    if (player.x > canvasWidth - 50) {
      player.setX(canvasWidth - 50);
    }
  }
}

const config: Phaser.Types.Core.GameConfig = {
  parent: "error_500",
  type: Phaser.AUTO,
  width: canvasWidth,
  height: canvasHeight,
  backgroundColor: "#4488aa",
  scene: [TitleScene, PlayScene],
  fps: {
    target: 24,
    forceSetTimeOut: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
};

export const startGame = path => {
  imagePath = path;
  new Phaser.Game(config);
};
