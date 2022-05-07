// DOM の画像を読み込み Methに適応させる effect shape
import { TextureLoader } from "three";
import { ShaderMaterial } from "three"; // three.jsの機能を使うシェダー
import { PlaneGeometry } from "three";
import { Mesh } from "three";

import Common from "./Common";

import vertexShader from "./glsl/shader.vert";
import fragmentShader from "./glsl/shader.frag";

import gsap from "gsap";

export default class Shape {
  constructor(el, index) {
    this.texture = el;
    this.index = index;
    this.mesh = null;
    this.uniforms = null;

    this.init(this.el);
    this.setParams();

    this.observeTarget = null;
  }

  init(texture) {
    const loadTexture = new TextureLoader().load(
      this.texture.getAttribute("src")
    );
    this.uniforms = {
      uTexture: { value: loadTexture },
      uImageAspect: {
        value: this.texture.naturalWidth / this.texture.naturalHeight,
      }, // 画像のアスペクト
      uPlaneAspect: {
        value: this.texture.clientWidth / this.texture.clientHeight,
      }, // プレーンのアスペクト
      uPercent: { value: 10 },
    };
    this.mat = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      // wireframe: true,
      transparent: true,
      opacity: 0,
    });

    /* ジオメトリ 頂点情報 */
    // this.geo = new PlaneGeometry(1, 1, 100, 100);
    this.geo = new PlaneGeometry(1, 1, 10, 10);
    this.mesh = new Mesh(this.geo, this.mat); //メッシュ

    Common.scene.add(this.mesh); //シーンに追加
  }

  setParams() {
    // window座標をWebGL座標に変換
    const rect = this.texture.getBoundingClientRect();
    const canvasSize = { w: window.innerWidth, h: window.innerHeight };
    this.mesh.scale.x = rect.width;
    this.mesh.scale.y = rect.height;
    const x = rect.left - canvasSize.w / 2 + rect.width / 2;
    const y = -rect.top + canvasSize.h / 2 - rect.height / 2;
    this.mesh.position.set(x, y, 0);
  }

  update() {
    this.setParams();
    // const easing = Math.min(1.0, 3.5 * 0.01);
    // this.uniforms.uProgress.value.lerp(this.transitionTarget, easing);
  }

  observerScroll() {
    this.observeTarget = document.querySelectorAll(".js-effectPicTarget")[
      this.index
    ];
    const options = {
      root: null,
      rootMargin: "-50% 0px",
      threshold: 0,
    };
    const callback = (entries) => {
      entries.forEach((el) => {
        if (el.isIntersecting) {
          if (this.uniforms.uPercent.value === 0) {
            this.uniforms.uPercent.value = 10;
          }
          gsap.to(this.uniforms.uPercent, {
            value: 0, //時間経過
            delay: 0.2,
            duration: 0.6,
            ease: "back.out(2)",
          });
        } else {
          this.uniforms.uPercent.value = 10;
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.observeTarget);
  }
}
