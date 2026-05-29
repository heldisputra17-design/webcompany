import { useRef, useEffect } from 'react';

const VERTEX_SHADER = `
attribute vec4 aVertexPosition;
void main() {
  gl_Position = aVertexPosition;
}
`;

const FRAGMENT_SHADER = `
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float char(vec2 chPos, float ch) {
  vec2 fp = floor(chPos * vec2(-1.0, 1.0) * 16.0);
  float delta = fp.x - fp.y * 8.0 - ch;
  return 1.0 - clamp(delta, 0.0, 1.0);
}

float charLine(float lineChar, vec2 charCoord) {
  float c = char(charCoord, 78.0)
          + char(charCoord, 69.0)
          + char(charCoord, 88.0)
          + char(charCoord, 84.0)
          + char(charCoord, 32.0)
          + char(charCoord, 32.0)
          + char(charCoord, 32.0)
          + char(charCoord, 32.0)
          + char(charCoord, 32.0)
          + char(charCoord, 32.0);
  return clamp(c, 0.0, 1.0);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;

  vec2 mouse = u_mouse / u_resolution;

  vec2 t = st * 2.0 - 1.0;

  vec2 sin1 = sin(t * 10.0 + sin(u_time * 5.0 + mouse.x * 6.0) * 2.0);
  vec2 sin2 = sin(t * 15.0 + sin(u_time * 6.0 + mouse.y * 6.0) * 2.0);
  vec2 s = (sin1 + sin2) / 2.0;

  float l = (s.x + s.y) / 2.0;

  vec2 p = vec2(floor(st.x * 30.0), floor(st.y * 40.0));

  float lNorm = (l + 1.0) / 2.0;
  float line = lNorm * 10.0;

  vec2 charCoord = fract(st * vec2(30.0, 40.0)) - 0.5;

  float line1 = charLine(mod(line + 0.0, 10.0), charCoord);
  float line2 = charLine(mod(line + 1.0, 10.0), charCoord);
  float line3 = charLine(mod(line + 2.0, 10.0), charCoord);

  float finalLine = mix(line1, line2, fract(line)) * 0.5 + mix(line2, line3, fract(line)) * 0.5;

  vec3 foregroundColor = vec3(0.9, 0.95, 1.0) * finalLine;
  float alpha = finalLine * 0.95 + 0.05;

  gl_FragColor = vec4(vec3(0.06, 0.06, 0.06) + foregroundColor, alpha);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function AsciiWaveHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas || !gl) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    gl.enableVertexAttribArray(aVertexPosition);
    gl.vertexAttribPointer(aVertexPosition, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');

    function render() {
      if (!gl || !canvas) return;
      const time = performance.now() * 0.001;
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseRef.current.x * dpr, mouseRef.current.y * dpr);
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    }

    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = canvas.clientHeight - (e.clientY - rect.top);
    }

    function handleResize() {
      resize();
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Dontah Project — animated ASCII wave visualization"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}
