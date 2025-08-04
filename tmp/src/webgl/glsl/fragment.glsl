uniform float uTime;
uniform vec2 uResolution;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  gl_FragColor = vec4(sin(uTime) * uv.x, sin(uTime) * uv.y, 0.0, 1.0);
}