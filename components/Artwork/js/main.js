//main
import Common from "./Common";
import Shape from "./Shape";
import Shape3D from "./Shape3D";

export default class ArtGL {
  constructor(props) {
    this.props = props;
    this.canvas = props.canvas;
    this.shape3D = null;
    this.shapeInstance = []; //DOMから取得する画像の数だけ生成
    this.init(); // newでinit起動
  }

  init() {
    new Promise((resolve) => {
      Common.init(this.canvas); //commonにcanvasを渡す
      this.shape3D = new Shape3D();
      resolve();
    }).then(() => {
      const timerResize = setTimeout(() => {
        clearTimeout(timerResize);
        window.addEventListener("resize", () => {
          this.resize();
        });
      });
      this.loop();
    });
  }

  createIndexShape() {
    const textures = document.querySelectorAll(".canvas-img")
      ? document.querySelectorAll(".canvas-img")
      : null;
    if (textures)
      new Promise((resolve) => {
        textures.forEach((el, index) => {
          this.shapeInstance[index] = new Shape(el, index);
        });
        resolve();
      }).then(() => {
        if (this.shapeInstance.length > 0)
          this.shapeInstance.forEach((el, index) => {
            el.observerScroll();
          });
      });
  }

  deformation(path) {
    //ページ遷移
    this.shape3D.onTransition(path);
    this.shapeInstance = [];
    if (path === "index") this.createIndexShape();
  }

  resize() {
    Common.resize();
  }

  loop() {
    this.render();
    requestAnimationFrame(() => {
      this.loop();
    });
  }

  render() {
    if (this.shapeInstance.length > 0) {
      this.shapeInstance.forEach((el, index) => {
        el.update();
      });
    }
    this.shape3D.update();
    Common.render();
  }

  addShape(addedCanvas, findIndex) {
    new Promise((reserve) => {
      this.shapeInstance.push(new Shape(addedCanvas, findIndex));
      reserve();
    }).then(() => {
      this.shapeInstance[findIndex].observerScroll();
    });
  }
}
