//main

import Common from "./Common";
import Shape from "./Shape";

export default class ArtworkGL {
  constructor(props) {
    this.props = props;
    this.frame = 0;
    this.init();
  }

  init() {
    Common.init(this.props.canvas);
    this.shape = new Shape();
    const timerResize = setTimeout(() => {
      clearTimeout(timerResize);
      window.addEventListener("resize", () => this.resize());
    }, 1000);
    this.loop();
  }
  deformation(path) {
    //ページ遷移
    this.shape.onTransition(path);
  }
  resize() {
    Common.resize();
  }

  loop() {
    this.frame++; //フレームレート半分に
    requestAnimationFrame(() => this.loop());
    if (this.frame % 2 === 0) return;
    this.render();
  }

  render() {
    this.shape.update();
    Common.render();
  }
}
