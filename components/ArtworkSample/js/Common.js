// canvas全体
import * as THREE from "three";

class Common {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.size = {
      windowW: null,
      windowH: null,
    };

    this.clock = null;

    this.time = {
      total: null,
      delta: null,
    };
  }

  init(canvas) {
    this.setSize();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.size.windowW / this.size.windowH,
      0.1,
      1000
    );
    this.camera.position.set(10, 10, -10);
    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer({
      // レンダラーを作成
      canvas: canvas,
      alpha: true,
    });

    this.renderer.setPixelRatio(1);
    // this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.setClearColor("rgb( 0, 0, 0)"); //背景
    this.renderer.setSize(this.size.windowW, this.size.windowH);

    this.clock = new THREE.Clock();
    this.clock.start();
  }

  setSize() {
    this.size = {
      windowW: window.innerWidth,
      windowH: window.innerHeight,
    };
  }

  resize() {
    this.setSize();
    this.camera.aspect = this.size.windowW / this.size.windowH;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.size.windowW, this.size.windowH);
  }

  render() {
    this.time.delta = this.clock.getDelta() / 2;
    this.time.total += this.delta;

    this.renderer.render(this.scene, this.camera);
  }
}

export default new Common(); //読み込んだ時点でcommon起動
