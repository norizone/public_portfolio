//シェイプ
import Common from "./Common";
import gsap from "gsap";
import { BoxBufferGeometry } from "three";
import { Vector3 } from "three";
import { MeshPhongMaterial } from "three";
import { MeshNormalMaterial } from "three";
import { Mesh } from "three";
import { Float32BufferAttribute } from "three";

export default class Shape3D {
  //表示シェイブ
  constructor() {
    this.segments = 30; //ポリゴンの数
    this.size = 800;

    this.geometry = new BoxBufferGeometry( // 立方体
      this.size,
      this.size,
      this.size,
      this.segments,
      this.segments,
      this.segments
    );
    this.geometry.morphAttributes.position = []; // 変形後の頂点座標を入れておく空の配列
    this.positionAttribute = this.geometry.attributes.position; //初期値の頂点配列

    this.material = new MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
      // wireframe: true,
    });
    this.mesh = null;
    this.init();
    this.objectValue = {
      one: 0,
      two: 0,
      three: 1,
    };
  }

  init() {
    this.setAttribute();
    this.mesh = new Mesh(this.geometry, this.material);
    // this.mesh.castShadow = true;
    this.mesh.position.z = -500;
    this.mesh.rotation.y = 0.9;
    this.mesh.rotation.x = 0.45;
    Common.scene.add(this.mesh);
  }

  setAttribute() {
    let spherePositions = []; //変形後の頂点配列
    let spherePositionsSecond = [];
    const half = this.size * 0.3;
    const grow = 1.2;
    const shrink = 0.6;
    for (let i = 0; i < this.positionAttribute.count; i++) {
      //頂点の数だけループ
      // 立方体の頂点座標を取得
      const x = this.positionAttribute.getX(i);
      const y = this.positionAttribute.getY(i);
      const z = this.positionAttribute.getZ(i);

      // 頂点ベクトルの長さを同じにして、球形の頂点に
      const vertex = new Vector3(x, y, z);
      const spheredVertex = vertex.normalize().multiplyScalar(this.size);
      spherePositions.push(spheredVertex.x, spheredVertex.y, spheredVertex.z);

      const secondVertex = new Vector3(
        Math.abs(y) < half && Math.abs(z) < half ? x * shrink : x * grow,
        Math.abs(z) < half && Math.abs(x) < half ? y * shrink : y * grow,
        Math.abs(x) < half && Math.abs(y) < half ? z * shrink : z * grow
      );
      spherePositionsSecond.push(
        secondVertex.x,
        secondVertex.y,
        secondVertex.z
      );
    }
    // ジオメトリの変形先として、計算した座標を登録
    this.geometry.morphAttributes.position[0] = new Float32BufferAttribute(
      spherePositions,
      3
    );
    this.geometry.morphAttributes.position[1] = new Float32BufferAttribute(
      spherePositionsSecond,
      3
    );
  }

  onTransition(path) {
    switch (path) {
      case "index":
        gsap.to(this.objectValue, {
          one: -0.5,
          two: 0.4,
          three: 0.4,
          duration: 0.8,
          ease: "slow(0.7, 0.7, false)",
        });
        break;

      case "profile":
        gsap.to(this.objectValue, {
          one: -0.8,
          two: -0.6,
          three: 0.8,
          duration: 0.8,
          ease: "slow(0.7, 0.7, false)",
        });
        break;

      default:
        gsap.to(this.objectValue, {
          one: 1.5,
          two: 0,
          three: 1.5,
          duration: 0.8,
          ease: "slow(0.7, 0.7, false)",
        });
        break;
    }
  }

  update() {
    // 立方体以外描画が追いついてない
    this.mesh.morphTargetInfluences[0] = this.objectValue.one; //球体変形量 mix量
    this.mesh.morphTargetInfluences[1] = this.objectValue.two;
    this.mesh.morphTargetInfluences[2] = this.objectValue.three;

    this.mesh.rotation.y += 0.0012;
    this.mesh.rotation.x += 0.001;
  }
}
