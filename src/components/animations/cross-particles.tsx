"use client";

import { useEffect, useRef } from "react";

export function CrossParticles({
  screensaverOnly = false,
  sizeFactor = 0.22,
  bounce = false,
}: { screensaverOnly?: boolean; sizeFactor?: number; bounce?: boolean } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Cores oficiais do Manual de Marca AbraceIA
    const colors = [
      "#3F8A7E", // Teal
      "#E49668", // Pêssego
      "#D3B675", // Ouro
    ];

    const PARTICLE_COUNT = 1600; // Alta densidade para formar a bolha
    const particles: Particle[] = [];

    // Rastreamento do mouse para girar a bolha
    let mouseRotX = 0;
    let targetMouseRotX = 0;
    let mouseRotY = 0;
    let targetMouseRotY = 0;

    // Centro da bolha (recalculado a cada frame): atrás do texto no desktop, centralizado no mobile
    let centerX = width / 2;
    let centerY = height / 2;

    // Deslocamento do centro em direção ao cursor (a bolha "acompanha" o mouse)
    const FOLLOW = 1.0; // 1 = a bolha percorre todo o hero atrás do cursor (sem limite)
    let mouseOffsetX = 0;
    let mouseOffsetY = 0;
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    // Estágio intermediário: suaviza o próprio alvo (movimento mais sedoso, ease-in/out)
    let smoothTargetX = 0;
    let smoothTargetY = 0;
    // Em repouso (sem mexer o mouse) o globo vagueia sozinho, tipo proteção de tela
    let lastMoveAt = -Infinity;
    const IDLE_MS = 6000; // tempo ocioso até entrar no modo proteção de tela

    // Modo "Pong/Atari": o centro anda em linha reta e ricocheteia nas bordas do container.
    let bx = 0;
    let by = 0;
    let bvx = 0;
    let bvy = 0;
    let bounceReady = false;
    const bounceSpeed = 1.9; // px por frame (só usado no modo bounce do footer)

    class Particle {
      // Direção unitária na esfera; o relevo orgânico (raio mutável) é aplicado no update()
      dirX: number;
      dirY: number;
      dirZ: number;
      phi: number;
      theta: number;
      rSeed: number; // pequena variação de espessura por cruz
      x: number = 0;
      y: number = 0;
      z: number = 0;
      color: string;
      size: number;
      angleOffset: number;
      // Plano 3D da cruz: eixos base (orientação aleatória) e suas projeções em tela após rotação
      u0x: number;
      u0y: number;
      u0z: number;
      v0x: number;
      v0y: number;
      v0z: number;
      ux: number = 1;
      uy: number = 0; // eixo horizontal da cruz projetado
      vx: number = 0;
      vy: number = 1; // eixo vertical da cruz projetado

      constructor(index: number, total: number) {
        // Distribuição Fibonacci em uma Esfera (base estruturada que será deformada)
        const phi = Math.acos(1 - (2 * index) / total);
        const theta = Math.PI * (1 + Math.sqrt(5)) * index;
        this.phi = phi;
        this.theta = theta;

        this.dirX = Math.cos(theta) * Math.sin(phi);
        this.dirY = Math.cos(phi);
        this.dirZ = Math.sin(theta) * Math.sin(phi);

        this.rSeed = Math.random() * 0.18;

        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 2 + 1;
        this.angleOffset = Math.random() * Math.PI * 2; // Rotação individual da cruz

        // Eixo U: vetor unitário aleatório (define a orientação do plano da cruz)
        const a = Math.random() * Math.PI * 2;
        const b = Math.acos(2 * Math.random() - 1);
        this.u0x = Math.sin(b) * Math.cos(a);
        this.u0y = Math.sin(b) * Math.sin(a);
        this.u0z = Math.cos(b);
        // Eixo V: outro vetor aleatório ortogonalizado em relação a U (Gram-Schmidt)
        let rx = Math.random() * 2 - 1;
        let ry = Math.random() * 2 - 1;
        let rz = Math.random() * 2 - 1;
        const dot = rx * this.u0x + ry * this.u0y + rz * this.u0z;
        rx -= dot * this.u0x;
        ry -= dot * this.u0y;
        rz -= dot * this.u0z;
        const len = Math.hypot(rx, ry, rz) || 1;
        this.v0x = rx / len;
        this.v0y = ry / len;
        this.v0z = rz / len;
      }

      update(time: number) {
        // Esfera perfeitamente redonda: raio constante (apenas leve variação de espessura da casca)
        const r = 1.0 + this.rSeed;

        const baseX = this.dirX * r;
        const baseY = this.dirY * r;
        const baseZ = this.dirZ * r;

        // Rotação automática da bolha + a rotação causada pelo mouse
        const rotY = time * 0.0003 + mouseRotX; // Gira no eixo Y
        const rotX = time * 0.0002 + mouseRotY; // Gira no eixo X

        // Matriz de Rotação 3D
        // Rotação Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = baseX * cosY - baseZ * sinY;
        const z1 = baseZ * cosY + baseX * sinY;

        // Rotação X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + baseY * sinX;

        this.x = x1;
        this.y = y2;
        this.z = z2;

        // Roto os eixos do plano da cruz com a MESMA rotação (só preciso de x,y projetados).
        // Quando o plano fica de perfil, ux/uy/vx/vy encurtam => foreshortening 3D.
        const rot = (vx: number, vy: number, vz: number): [number, number] => {
          const rx = vx * cosY - vz * sinY;
          const rz = vz * cosY + vx * sinY;
          const ry = vy * cosX - rz * sinX;
          return [rx, ry];
        };
        [this.ux, this.uy] = rot(this.u0x, this.u0y, this.u0z);
        [this.vx, this.vy] = rot(this.v0x, this.v0y, this.v0z);
      }

      draw(sphereRadius: number) {
        if (!ctx) return;

        // Projeção 3D para 2D simples (perspectiva)
        const fov = 400;
        const scale = fov / (fov + this.z * sphereRadius);

        const projX = centerX + this.x * sphereRadius * scale;
        const projY = centerY + this.y * sphereRadius * scale;

        // Oculta partículas que estão muito "atrás" ou fora da tela
        if (scale < 0.1) return;

        // Fade in dependendo da profundidade (Z). O que está mais perto da câmera fica forte, o que está atrás da bolha fica fraco.
        // this.z vai de aprox -1.3 (mais perto) a +1.3 (mais longe)
        const opacity = 1 - (this.z + 1.5) / 3;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, opacity));
        ctx.translate(projX, projY);

        // Rotação individual (opcional para dar dinamismo sem perder o formato da cruz)
        // ctx.rotate(this.angleOffset);

        const currentSize = this.size * scale;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = Math.max(0.6, currentSize * 0.22);
        ctx.lineCap = "round";
        ctx.lineJoin = "round"; // cantos arredondados do contorno

        // Cruz vazada (contorno em "+") desenhada no plano 3D da partícula.
        const s = currentSize; // alcance de cada braço
        const t = currentSize * 0.38; // meia-espessura do braço
        const ux = this.ux;
        const uy = this.uy; // eixo horizontal projetado
        const vx = this.vx;
        const vy = this.vy; // eixo vertical projetado
        // Vértices do contorno do "+" (sentido horário): a = horizontal, b = vertical
        const pts: [number, number][] = [
          [-t, -s],
          [t, -s],
          [t, -t],
          [s, -t],
          [s, t],
          [t, t],
          [t, s],
          [-t, s],
          [-t, t],
          [-s, t],
          [-s, -t],
          [-t, -t],
        ];
        ctx.beginPath();
        for (let i = 0; i < pts.length; i++) {
          const [a, b] = pts[i];
          const sx = a * ux + b * vx; // projeta no plano 3D da cruz
          const sy = a * uy + b * vy;
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
      }
    }

    const resize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const baseCenterX = () => (width >= 1024 ? width * 0.3 : width * 0.5);

    const handleMouseMove = (e: MouseEvent) => {
      // Influência do mouse na rotação (parallax)
      const mouseDx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const mouseDy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      targetMouseRotX = mouseDx * 0.5; // O quão longe o mouse consegue girar a bolha
      targetMouseRotY = mouseDy * 0.5;

      // A bolha acompanha o mouse: centro é puxado em direção ao cursor
      const rect = canvas.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      targetOffsetX = (relX - baseCenterX()) * FOLLOW;
      targetOffsetY = (relY - height / 2) * FOLLOW;
      lastMoveAt = performance.now(); // registra interação (sai do modo proteção de tela)
    };

    const handleMouseLeave = () => {
      targetMouseRotX = 0;
      targetMouseRotY = 0;
      targetOffsetX = 0; // volta ao centro-base
      targetOffsetY = 0;
    };

    const init = () => {
      resize();
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle(i, PARTICLE_COUNT));
      }
    };

    const startTime = performance.now();

    const animate = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // Lerp (suavização) da rotação do mouse
      mouseRotX += (targetMouseRotX - mouseRotX) * 0.05;
      mouseRotY += (targetMouseRotY - mouseRotY) * 0.05;

      const sphereRadius = Math.min(width, height) * sizeFactor; // Tamanho da bolha (configurável)
      const elapsed = now - startTime;

      // Em repouso: o alvo passeia pelo hero numa figura de Lissajous (proteção de tela)
      const idle = now - lastMoveAt > IDLE_MS;
      if (idle) {
        const ax = width * 0.4; // amplitude horizontal do passeio (chega perto das bordas)
        const ay = height * 0.34; // amplitude vertical
        // Movimento circular (cos/sin) => velocidade constante, nunca para num ponto.
        // Um 2º círculo menor (epiciclo) dá variação sem nunca repetir igual.
        const w1 = 0.00018; // velocidade do círculo principal (lento)
        const w2 = 0.00031; // velocidade do círculo secundário
        const cx = width * 0.5 + (Math.cos(elapsed * w1) * 0.7 + Math.cos(elapsed * w2) * 0.3) * ax;
        const cy =
          height * 0.5 + (Math.sin(elapsed * w1) * 0.7 + Math.sin(elapsed * w2 + 1.3) * 0.3) * ay;
        targetOffsetX = cx - baseCenterX();
        targetOffsetY = cy - height / 2;
      }

      // Suavização em 2 estágios adaptativa:
      // - em repouso anda um pouco mais (k maior) pra o passeio ser visível;
      // - seguindo o cursor fica bem lento/flutuante (tipo nuvem).
      const k = idle ? 0.04 : 0.012;
      smoothTargetX += (targetOffsetX - smoothTargetX) * k;
      smoothTargetY += (targetOffsetY - smoothTargetY) * k;
      mouseOffsetX += (smoothTargetX - mouseOffsetX) * k;
      mouseOffsetY += (smoothTargetY - mouseOffsetY) * k;

      // Centro = base (atrás do texto no desktop / centralizado no mobile) + acompanhamento do mouse.
      // Clamp: mantém a bolha CONTIDA no hero — o centro nunca chega tão perto da
      // borda que a bolha vaze (margem ≈ raio da bolha), mesmo se o cursor sair do hero.
      const margin = sphereRadius * 1.15;
      centerX = Math.max(margin, Math.min(width - margin, baseCenterX() + mouseOffsetX));
      centerY = Math.max(margin, Math.min(height - margin, height / 2 + mouseOffsetY));

      // Modo Pong: sobrescreve o centro com movimento linear que ricocheteia nas bordas.
      if (bounce) {
        if (!bounceReady) {
          bx = centerX;
          by = centerY;
          bvx = bounceSpeed;
          bvy = bounceSpeed * 0.72; // ângulo ≠ 45° => trajetória mais variada
          bounceReady = true;
        }
        bx += bvx;
        by += bvy;
        if (bx <= margin) {
          bx = margin;
          bvx = Math.abs(bvx);
        } else if (bx >= width - margin) {
          bx = width - margin;
          bvx = -Math.abs(bvx);
        }
        if (by <= margin) {
          by = margin;
          bvy = Math.abs(bvy);
        } else if (by >= height - margin) {
          by = height - margin;
          bvy = -Math.abs(bvy);
        }
        centerX = bx;
        centerY = by;
      }

      // Ordena por profundidade (Z-sorting) para desenhar as cruzes de trás primeiro
      particles.sort((a, b) => b.z - a.z);

      particles.forEach((p) => {
        p.update(elapsed);
        p.draw(sphereRadius);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();

    // Acessibilidade (PERF-03): respeita prefers-reduced-motion — desenha um
    // único quadro estático (a bolha aparece) sem loop de animação nem
    // listeners de mouse, evitando movimento contínuo para quem pediu menos.
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const sphereRadius = Math.min(width, height) * sizeFactor;
      centerX = baseCenterX();
      centerY = height / 2;
      ctx.clearRect(0, 0, width, height);
      particles.sort((a, b) => b.z - a.z);
      particles.forEach((p) => {
        p.update(0);
        p.draw(sphereRadius);
      });
      return;
    }

    window.addEventListener("resize", resize);
    // Modo proteção de tela: sem listeners de mouse => lastMoveAt fica -Infinity,
    // então a bolha fica permanentemente no passeio (idle sempre true).
    if (!screensaverOnly) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [screensaverOnly, sizeFactor, bounce]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-60"
    />
  );
}
