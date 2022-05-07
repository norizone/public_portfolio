// canvas全体 レンダラー カメラ シーン effect common
import { WebGLRenderer } from "three";
import { Scene } from "three";
import { PerspectiveCamera } from "three";

import { DirectionalLight } from "three";
class Common {
  constructor() {
    this.light = null;
    this.scene = null;
    this.renderer = null;
    this.camera = null;
    this.size = {
      w: null,
      h: null,
    };
  }

  init(canvas) {
    this.setSize();
    /* レンダラー */
    this.renderer = new WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    // this.renderer.setClearColor(0xffffff, 0.4);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.size.w, this.size.h);

    /* シーン */
    this.scene = new Scene();

    /* カメラ */
    const fov = 60;
    const fovRad = (fov / 2) * (Math.PI / 180); // 視野角をラジアンに変換
    const dist = this.size.h / 2 / Math.tan(fovRad); // ウィンドウぴったりのカメラ距離
    //(視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    this.camera = new PerspectiveCamera(
      fov,
      this.size.w / this.size.h,
      1,
      // dist * 3
      -2000
    );
    this.camera.position.set(0, 0, dist); //画面ぴったりでDOMの画像と合わす
    this.camera.lookAt(this.scene.position);

    this.light = new DirectionalLight(0x808080, 0.5);
    // this.light = new SpotLight(0x808080, 2, 100, Math.PI / 4, 1, 1);
    this.light.position.set(200, 200, 200);
    // this.light.castShadow = true;
    this.scene.add(this.light);
  }

  setSize() {
    this.size = {
      w: window.innerWidth,
      h: window.innerHeight,
    };
  }

  resize() {
    this.setSize();
    this.camera.aspect = this.size.w / this.size.h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.size.w, this.size.h);
  }

  /* レンダリング */
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default new Common(); //読み込んだ時点でcommon起動
