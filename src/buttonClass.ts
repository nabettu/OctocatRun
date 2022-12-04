export type ButtonProps = {
  width?: number;
  height?: number;
  onClick: Function;
  align?: string;
  fontSize?: string;
  color?: string;
};
export class OriginalButtonClass extends Phaser.GameObjects.Container {
  text: Phaser.GameObjects.Text;
  container: Phaser.GameObjects.Rectangle;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    props: ButtonProps
  ) {
    super(scene, x, y);

    // 入力されたオブジェクトから各要素を取り出す
    const {
      width = 90,
      height = 40,
      onClick,
      align = "center",
      fontSize = "30",
      color = "black",
    } = props;

    // シーンにボタンを追加
    this.scene = scene;
    this.scene.add.existing(this);

    this.setSize(width, height);
    this.setInteractive({ useHandCursor: true });

    const alignLeft = align === "left";

    // 左寄せの場合は位置を調整
    this.text = scene.add
      .text(alignLeft ? -width / 2 + 0 : 0, -1, text, {
        align,
        fontSize,
        color,
      })
      .setOrigin(alignLeft ? 0 : 0.5, 0.5)
      .setPadding(0, 2, 0, 0);
    this.text.setColor(color);

    // ボタンの枠を作成
    this.container = scene.add.rectangle(0, 0, width, height);
    this.container
      .setStrokeStyle(1, 0xffffff)
      .setOrigin(alignLeft ? 0 : 0.5, 0.5);

    this.add([this.container, this.text]);
    this.on("pointerover", () => {
      this.updateButton("pointer over", "red");
    });

    this.on("pointerout", () => {
      this.updateButton("pointer out", color);
    });

    this.on("pointerdown", () => {
      this.updateButton("pointer down", "blue");
      this.scene.tweens.add({
        targets: this,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 100,
        yoyo: true,
        repeat: 2,
        ease: "Sine.easeInOut",
      });
    });

    this.on("pointerup", () => {
      this.updateButton("pointer up", "yellow");
      onClick();
    });
  }

  updateButton = (message: string, color: string) => {
    console.log(message);
    this.text.setColor(color);
  };
}
