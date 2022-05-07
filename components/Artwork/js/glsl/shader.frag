// フラグメントシェーダー px情報
varying vec2 vUv;
uniform sampler2D uTexture; //画像受け取り
uniform float uImageAspect; //float 浮動小数点数 
uniform float uPlaneAspect;

uniform float uPercent ;
uniform vec2 uMouse;

void main(){
	//画像センター
  vec2 ratio = vec2( 
    min(uPlaneAspect / uImageAspect, 1.0),// 画像のアスペクトとプレーンのアスペクトを比較し、短い方に合わせる
    min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0) //画像とプレーンそれぞれのアスペクト比を用いてどちらの辺を余らせるかを判断
  );

  // 計算結果を用いて補正後のuv値を生成 
  vec2 fixedUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.5
  );
	//画像センター -end

//rgb
	float shift = uPercent * .1; 
  float r = texture2D( uTexture, vUv.xy - vec2( shift / 10.0, shift / -10.0) ).x;//xyでずらしてる 
  float g = texture2D( uTexture, vUv.xy  ).y;
  float b = texture2D( uTexture, vUv.xy + vec2( shift / 10.0, shift / 10.0) ).z;
	vec3 color = vec3( r, g, b );

	float a = (10.0 - uPercent ) ;
  gl_FragColor = vec4(color, a);//gl_FragColorは描画用の組み込み変数

}