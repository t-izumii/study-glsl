uniform float uTime;
uniform float uProgress;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  gl_FragColor = vec4(sin(uTime) * uv.x, sin(uTime) * uv.y, 0.0, 1.0);
}