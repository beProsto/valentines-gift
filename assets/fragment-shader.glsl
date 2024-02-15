#version 300 es
precision mediump float;

out vec4 o_Color;

in vec2 v_TexCoord;

uniform sampler2D u_Texture;

void main() {
    o_Color = texture(u_Texture, v_TexCoord);
}