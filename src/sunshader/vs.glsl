#version 330 core

uniform mat4 modelViewProjectionMatrix;
uniform float u_time;
uniform float u_radius;
uniform int u_resolution;

in vec4 position;

out vec3 v_color;

float noise(vec3 p);
vec3 getDisplacedVertex(vec3 pos);

void main() {
  vec3 displacedPos = getDisplacedVertex(position.xyz);
  gl_Position = modelViewProjectionMatrix * vec4(displacedPos, 1.0);
  v_color = vec3(0.0);
}

float noise(vec3 p) {
    // Implement your Perlin noise function here or use a library
}

vec3 getDisplacedVertex(vec3 pos) {
  float noiseValue = noise(vec4(pos * 0.005, u_time * 0.0005));

  if(noiseValue > 0.46 && noiseValue < 0.5) {
    pos = normalize(pos) * mix(u_radius, u_radius + 50.0, (noiseValue - 0.46) / 0.04);
  } else if(noiseValue > 0.5 && noiseValue < 0.54) {
    pos = normalize(pos) * mix(u_radius + 50.0, u_radius, (noiseValue - 0.5) / 0.04);
  }

  return pos;
}
