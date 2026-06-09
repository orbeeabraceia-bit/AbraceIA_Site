"use client";

import { useEffect, useRef } from "react";

export function CrossParticles() {
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

    // Cores exatas do guia
    const colors = [
      "#139D87", // Teal
      "#FF8E5E", // Pêssego
      "#DFB55D", // Ouro
    ];

    const PARTICLE_COUNT = 600; // Alta densidade para formar a bolha
    const particles: Particle[] = [];
    
    // Rastreamento do mouse para girar a bolha
    let mouseRotX = 0;
    let targetMouseRotX = 0;
    let mouseRotY = 0;
    let targetMouseRotY = 0;

    class Particle {
      baseX: number;
      baseY: number;
      baseZ: number;
      x: number = 0;
      y: number = 0;
      z: number = 0;
      color: string;
      size: number;
      angleOffset: number;

      constructor(index: number, total: number) {
        // Distribuição Fibonacci em uma Esfera (para manter o formato estruturado)
        const phi = Math.acos(1 - (2 * index) / total);
        const theta = Math.PI * (1 + Math.sqrt(5)) * index;
        
        // Variação de profundidade para a "casca" da bolha ser espessa
        const r = 0.7 + Math.random() * 0.6; // Raio varia de 0.7 a 1.3
        
        this.baseX = Math.cos(theta) * Math.sin(phi) * r;
        this.baseY = Math.cos(phi) * r;
        this.baseZ = Math.sin(theta) * Math.sin(phi) * r;

        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 2 + 1;
        this.angleOffset = Math.random() * Math.PI * 2; // Rotação individual da cruz
      }

      update(time: number) {
        // Rotação automática da bolha + a rotação causada pelo mouse
        const rotY = time * 0.0003 + mouseRotX; // Gira no eixo Y
        const rotX = time * 0.0002 + mouseRotY; // Gira no eixo X

        // Matriz de Rotação 3D
        // Rotação Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = this.baseX * cosY - this.baseZ * sinY;
        const z1 = this.baseZ * cosY + this.baseX * sinY;

        // Rotação X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = this.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + this.baseY * sinX;

        this.x = x1;
        this.y = y2;
        this.z = z2;
      }

      draw(sphereRadius: number) {
        if (!ctx) return;
        
        // Projeção 3D para 2D simples (perspectiva)
        const fov = 400;
        const scale = fov / (fov + this.z * sphereRadius);
        
        const projX = width / 2 + this.x * sphereRadius * scale;
        const projY = height / 2 + this.y * sphereRadius * scale;

        // Oculta partículas que estão muito "atrás" ou fora da tela
        if (scale < 0.1) return;
        
        // Fade in dependendo da profundidade (Z). O que está mais perto da câmera fica forte, o que está atrás da bolha fica fraco.
        // this.z vai de aprox -1.3 (mais perto) a +1.3 (mais longe)
        const opacity = 1 - ((this.z + 1.5) / 3);
        
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, opacity));
        ctx.translate(projX, projY);
        
        // Rotação individual (opcional para dar dinamismo sem perder o formato da cruz)
        // ctx.rotate(this.angleOffset); 
        
        const currentSize = this.size * scale;
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = Math.max(0.8, currentSize / 3);
        ctx.lineCap = "round";
        
        // Cruz (+) perfeitamente reta
        ctx.beginPath();
        ctx.moveTo(0, -currentSize);
        ctx.lineTo(0, currentSize);
        ctx.moveTo(-currentSize, 0);
        ctx.lineTo(currentSize, 0);
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

    const handleMouseMove = (e: MouseEvent) => {
      // Calcula a influência do mouse na rotação (parallax)
      const mouseDx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const mouseDy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      
      targetMouseRotX = mouseDx * 0.5; // O quão longe o mouse consegue girar a bolha
      targetMouseRotY = mouseDy * 0.5;
    };

    const handleMouseLeave = () => {
      targetMouseRotX = 0;
      targetMouseRotY = 0;
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

      const sphereRadius = Math.min(width, height) * 0.5; // Tamanho da bolha responsivo
      const elapsed = now - startTime;

      // Ordena por profundidade (Z-sorting) para desenhar as cruzes de trás primeiro
      particles.sort((a, b) => b.z - a.z);

      particles.forEach((p) => {
        p.update(elapsed);
        p.draw(sphereRadius);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-60"
    />
  );
}
