'use client'

import { useEffect, useRef, useState } from 'react'

const VERTEX_SHADER = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_res;
  uniform vec2 u_mouse;

  vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
  vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
  vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
    vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
    vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
    float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
    vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
    return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main(){
    vec2 uv=gl_FragCoord.xy/u_res;
    float aspect=u_res.x/u_res.y;
    vec2 p=uv*vec2(aspect,1.0);
    float t=u_time*0.07;
    float mx=u_mouse.x*0.15, my=u_mouse.y*0.1;

    float n1=snoise(vec3(p*1.1+vec2(0.3+mx,0.1+my),t*0.9));
    float n2=snoise(vec3(p*1.8+vec2(-0.4+mx*0.5,0.7),t*1.1+1.3));
    float n3=snoise(vec3(p*0.6+vec2(0.8,-0.3+my*0.5),t*0.7+2.7));
    float n4=snoise(vec3(p*2.8+vec2(1.2,0.4),t*1.4+0.9));
    float surface=n1*0.50+n2*0.28+n3*0.15+n4*0.07;
    float hGrad=uv.x*0.7+uv.y*0.1;

    vec3 col=vec3(0.030,0.018,0.010);
    col=mix(col,vec3(0.095,0.048,0.018),smoothstep(-0.6,0.1,surface+hGrad*0.3));
    col=mix(col,vec3(0.28,0.13,0.04),smoothstep(-0.1,0.5,surface+hGrad*0.5));
    col=mix(col,vec3(0.55,0.38,0.14),smoothstep(0.2,0.7,surface+hGrad*0.8));
    col=mix(col,vec3(0.72,0.60,0.45),smoothstep(0.5,0.95,surface+hGrad));
    col=mix(col,vec3(0.75,0.28,0.04),smoothstep(0.1,0.55,n2*0.8+n1*0.4));
    float hs=snoise(vec3(p*1.4+vec2(0.5,0.2),t*1.2+4.0));
    col=mix(col,vec3(0.98,0.50,0.12),smoothstep(0.55,0.85,hs)*0.6);

    float rn1=snoise(vec3(p.x*0.8+t*0.3,p.y*0.5,t*0.5));
    float rn2=snoise(vec3(p.x*1.2-t*0.2,p.y*1.1,t*0.4+1.0));
    float r1=1.-smoothstep(0.,0.004,abs(p.y-0.38-rn1*0.25-p.x*0.12));
    float r2=1.-smoothstep(0.,0.003,abs(p.y-0.55-rn2*0.20+p.x*0.08));
    float r3=1.-smoothstep(0.,0.002,abs(p.y-0.22-rn1*0.15-p.x*0.18));
    float rb1=snoise(vec3(p.x*2.0+t*0.5,0.5,t*0.3));
    float rb2=snoise(vec3(p.x*1.5-t*0.4,0.8,t*0.4));
    col=mix(col,mix(vec3(0.4,0.22,0.06),vec3(0.9,0.60,0.20),smoothstep(-0.3,0.8,rb1)),r1*clamp(0.5+rb1*0.7,0.2,1.0));
    col=mix(col,mix(vec3(0.25,0.14,0.04),vec3(0.7,0.45,0.12),smoothstep(-0.3,0.8,rb2)),r2*clamp(0.4+rb2*0.7,0.2,1.0));
    col+=vec3(0.5,0.28,0.06)*r3*0.5;

    col*=(1.-(1.-smoothstep(0.,0.55,uv.x))*0.78);
    col*=(1.-(1.-smoothstep(0.,0.35,uv.y))*0.55);
    col*=(1.-(1.-smoothstep(0.65,1.,uv.y))*0.45);
    col+=snoise(vec3(gl_FragCoord.xy*0.8,u_time*12.))*0.018;

    gl_FragColor=vec4(clamp(col,0.,1.),1.);
  }
`

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

function runLiteHeroCanvas(canvas: HTMLCanvasElement, animate: boolean) {
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) return null

  let frame = 0
  let lastFrame = 0
  let resizeTimer = 0
  let visible = true

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.2)
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr))
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr))
  }

  const drawGlow = (
    x: number,
    y: number,
    radius: number,
    color: string,
    alpha = 1,
  ) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, color)
    gradient.addColorStop(0.45, color.replace(/[\d.]+\)$/u, `${alpha * 0.35})`))
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const drawWave = (
    base: number,
    amplitude: number,
    slope: number,
    phase: number,
    color: string,
    width: number,
    time: number,
  ) => {
    const w = canvas.width
    const h = canvas.height
    ctx.beginPath()

    for (let i = 0; i <= 80; i += 1) {
      const p = i / 80
      const x = -w * 0.05 + p * w * 1.1
      const y =
        base * h +
        Math.sin(p * Math.PI * 2.15 + phase + time) * amplitude * h +
        (p - 0.5) * slope * h

      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }

    ctx.lineWidth = Math.max(0.9, Math.min(canvas.width, canvas.height) * width)
    ctx.strokeStyle = color
    ctx.stroke()
  }

  const draw = (timeMs: number) => {
    const w = canvas.width
    const h = canvas.height
    const time = timeMs * 0.00022

    const base = ctx.createLinearGradient(0, 0, w, h)
    base.addColorStop(0, '#050403')
    base.addColorStop(0.28, '#100905')
    base.addColorStop(0.56, '#482208')
    base.addColorStop(0.82, '#9d3f06')
    base.addColorStop(1, '#e06d1e')
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = base
    ctx.fillRect(0, 0, w, h)

    ctx.globalCompositeOperation = 'screen'
    drawGlow(w * (0.76 + Math.sin(time * 0.8) * 0.025), h * 0.28, w * 0.42, 'rgba(255, 179, 84, 0.62)')
    drawGlow(w * 0.9, h * (0.1 + Math.cos(time * 0.7) * 0.025), w * 0.28, 'rgba(255, 107, 18, 0.5)')
    drawGlow(w * (0.66 + Math.cos(time * 0.55) * 0.02), h * 0.62, w * 0.38, 'rgba(238, 205, 157, 0.28)')

    ctx.globalCompositeOperation = 'source-over'
    ctx.shadowBlur = Math.max(5, Math.min(w, h) * 0.018)
    ctx.shadowColor = 'rgba(238, 151, 43, 0.18)'
    drawWave(0.36, 0.08, -0.2, 0.1, 'rgba(255, 194, 95, 0.3)', 0.0012, time * 1.05)
    drawWave(0.49, 0.065, 0.16, 1.3, 'rgba(244, 172, 72, 0.24)', 0.001, time * 0.9)
    drawWave(0.66, 0.05, -0.1, 2.2, 'rgba(255, 126, 28, 0.18)', 0.0009, time * 0.7)
    ctx.shadowBlur = 0

    const leftShade = ctx.createLinearGradient(0, 0, w * 0.72, 0)
    leftShade.addColorStop(0, 'rgba(0, 0, 0, 0.72)')
    leftShade.addColorStop(0.55, 'rgba(0, 0, 0, 0.25)')
    leftShade.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = leftShade
    ctx.fillRect(0, 0, w, h)

    const vignette = ctx.createRadialGradient(
      w * 0.64,
      h * 0.48,
      Math.min(w, h) * 0.18,
      w * 0.64,
      h * 0.48,
      Math.max(w, h) * 0.78,
    )
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)')
    vignette.addColorStop(1, 'rgba(0, 0, 0, 0.52)')
    ctx.fillStyle = vignette
    ctx.fillRect(0, 0, w, h)
  }

  const render = (time: number) => {
    if (time - lastFrame >= 42) {
      lastFrame = time
      draw(time)
    }

    if (animate && visible && !document.hidden) {
      frame = requestAnimationFrame(render)
    }
  }

  const start = () => {
    if (!frame && animate && visible && !document.hidden) {
      frame = requestAnimationFrame(render)
    }
  }

  const stop = () => {
    if (frame) cancelAnimationFrame(frame)
    frame = 0
  }

  const onResize = () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => {
      resize()
      draw(performance.now())
    }, 100)
  }

  const onVisibilityChange = () => {
    if (document.hidden) stop()
    else start()
  }

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) start()
    else stop()
  })

  resize()
  draw(7000)
  if (animate) {
    start()
    visibilityObserver.observe(canvas)
    document.addEventListener('visibilitychange', onVisibilityChange)
  }
  window.addEventListener('resize', onResize, { passive: true })

  return () => {
    stop()
    window.clearTimeout(resizeTimer)
    visibilityObserver.disconnect()
    window.removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', onVisibilityChange)
  }
}

export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const [cssFallback, setCssFallback] = useState(false)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const lowEndDevice =
      ('deviceMemory' in navigator &&
        typeof navigator.deviceMemory === 'number' &&
        navigator.deviceMemory <= 2) ||
      (navigator.hardwareConcurrency || 8) <= 4 ||
      window.matchMedia('(hover: none) and (pointer: coarse)').matches

    if (reducedMotion || lowEndDevice) {
      const liteCleanup = runLiteHeroCanvas(canvas, !reducedMotion)
      if (!liteCleanup) setCssFallback(true)
      return liteCleanup ?? undefined
    }

    const gl = canvas?.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    })
    if (!gl) {
      const liteCleanup = runLiteHeroCanvas(canvas, !reducedMotion)
      if (!liteCleanup) setCssFallback(true)
      return liteCleanup ?? undefined
    }

    const debugRenderer = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = debugRenderer
      ? String(
          gl.getParameter(debugRenderer.UNMASKED_RENDERER_WEBGL) ?? '',
        ).toLowerCase()
      : ''
    const softwareRenderer =
      renderer.includes('swiftshader') ||
      renderer.includes('llvmpipe') ||
      renderer.includes('software')
    if (softwareRenderer) {
      const liteCleanup = runLiteHeroCanvas(canvas, !reducedMotion)
      if (!liteCleanup) setCssFallback(true)
      return liteCleanup ?? undefined
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vertexShader || !fragmentShader) {
      setCssFallback(true)
      return
    }

    const program = gl.createProgram()
    if (!program) {
      setCssFallback(true)
      return
    }

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      setCssFallback(true)
      return
    }

    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )

    const position = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const timeUniform = gl.getUniformLocation(program, 'u_time')
    const resolutionUniform = gl.getUniformLocation(program, 'u_res')
    const mouseUniform = gl.getUniformLocation(program, 'u_mouse')

    let mouseX = 0
    let mouseY = 0
    let frame = 0
    let lastFrame = 0
    let visible = true
    let resizeTimer = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.max(
        1,
        Math.round(canvas.clientWidth * dpr),
      )
      canvas.height = Math.max(
        1,
        Math.round(canvas.clientHeight * dpr),
      )
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const render = (time: number) => {
      if (time - lastFrame >= 33) {
        lastFrame = time
        gl.uniform1f(timeUniform, time * 0.001)
        gl.uniform2f(resolutionUniform, canvas.width, canvas.height)
        gl.uniform2f(mouseUniform, mouseX, mouseY)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }

      if (visible && !document.hidden) {
        frame = requestAnimationFrame(render)
      }
    }

    const start = () => {
      if (!frame && visible && !document.hidden) {
        frame = requestAnimationFrame(render)
      }
    }

    const stop = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        resize()
      }, 100)
    }

    const onVisibilityChange = () => {
      if (document.hidden) stop()
      else start()
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })

    resize()
    start()

    visibilityObserver.observe(canvas)
    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      stop()
      window.clearTimeout(resizeTimer)
      visibilityObserver.disconnect()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [])

  if (cssFallback) {
    return (
      <div
        aria-hidden="true"
        className="hero-css-bg pointer-events-none absolute inset-[9px] rounded-[20px]"
      />
    )
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="hero-css-bg pointer-events-none absolute inset-[9px] rounded-[20px]"
      />
      <canvas
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[9px] h-[calc(100%-18px)] w-[calc(100%-18px)] rounded-[20px]"
      />
    </>
  )
}
