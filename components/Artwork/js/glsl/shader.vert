// 頂点シェーダー
	//頂点シェーダーは、１つの「頂点」に対して１回呼び出される。 呼び出されたら必ず、頂点シェーダーは特殊なグローバル変数「gl_Position」に 「クリップ空間座標」の値をセットする。
	//例えばGLSLは標準でvec2、vec3、vec4といったデータ型を持っている。 これはそれぞれ２、３、４個のデータをまとめて扱うためのものである。 同様にmat2、mat3、mat4は2x2、3x3、4x4の行列を扱うためのデータ型である。
varying vec2 vUv;


uniform float uPercent ;

float PI = 3.1415926535897932384626433832795;

void main(){
  vUv = uv; //uv->ShaderMaterialで補完される vec2 型(xy)の変数。テクスチャ座標のこと。
 	// gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

	vec3 pos = position;

	  // 横方向
		float amp = -.15 ; // 振幅（の役割） 大きくすると波が大きくなる
		float freq = 0.1 * uPercent ; // 振動数（の役割） 大きくすると波が細かくなる

		// 縦方向
		float tension = -0.05 * uPercent ; // 上下の張り具合


		pos.x = pos.x + sin(pos.y * PI  * freq) * amp;
		pos.y = pos.y + (cos(pos.x * PI) * tension);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

	/*
	https://qiita.com/kitasenjudesign/items/05c85f2877e79c84a620

	position 頂点座標
	projectionMatrix カメラの各種パラメータから３次元を２次元に射影し、クリップ座標系に変換する行列 /遠近法のような効果を加える。fov,aspect,near,farから作られる。
	modelViewMatrix modelMatrixとviewMatrixの積算
	modelMatrix	オブジェクト座標からワールド座標へ変換する / モデルの位置、モデルの回転、モデルの拡大縮小の情報を持たせる。
	viewMatrix	ワールド座標から視点座標へ変換 / カメラを定義するためのもの。カメラの位置、カメラの注視点、カメラの上方向から作られる。
	*/

}