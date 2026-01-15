import { useEffect, useRef } from "react";

interface LightParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: { x: number; y: number }[];
  opacity: number;
}

interface Spark {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  particles: { angle: number; speed: number; size: number }[];
}

const GridLightAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<LightParticle[]>([]);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 80;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Create a light particle that travels along grid lines
    const createParticle = (): LightParticle => {
      const isHorizontal = Math.random() > 0.5;
      const gridX = Math.floor(Math.random() * (width / gridSize)) * gridSize;
      const gridY = Math.floor(Math.random() * (height / gridSize)) * gridSize;
      
      const speed = 1.5 + Math.random() * 1.5;
      
      return {
        x: isHorizontal ? (Math.random() > 0.5 ? -10 : width + 10) : gridX,
        y: isHorizontal ? gridY : (Math.random() > 0.5 ? -10 : height + 10),
        vx: isHorizontal ? (Math.random() > 0.5 ? speed : -speed) : 0,
        vy: isHorizontal ? 0 : (Math.random() > 0.5 ? speed : -speed),
        trail: [],
        opacity: 0.6 + Math.random() * 0.4,
      };
    };

    // Initialize with some particles
    for (let i = 0; i < 6; i++) {
      particlesRef.current.push(createParticle());
    }

    const createSpark = (x: number, y: number) => {
      const particles = [];
      const numParticles = 12;
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          angle: (Math.PI * 2 * i) / numParticles + (Math.random() - 0.5) * 0.3,
          speed: 2 + Math.random() * 4,
          size: 1 + Math.random() * 2,
        });
      }
      sparksRef.current.push({
        x,
        y,
        life: 1,
        maxLife: 1,
        particles,
      });
    };

    // Check for collisions between particles
    const checkCollisions = () => {
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          // Only check if one is horizontal and one is vertical
          if ((p1.vx !== 0 && p2.vy !== 0) || (p1.vy !== 0 && p2.vx !== 0)) {
            const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
            if (dist < 20) {
              // Snap to grid intersection for spark
              const snapX = Math.round((p1.x + p2.x) / 2 / gridSize) * gridSize;
              const snapY = Math.round((p1.y + p2.y) / 2 / gridSize) * gridSize;
              createSpark(snapX, snapY);
            }
          }
        }
      }
    };

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(80, 140, 255, 0.04)";
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawParticle = (particle: LightParticle) => {
      // Update trail
      particle.trail.unshift({ x: particle.x, y: particle.y });
      if (particle.trail.length > 25) {
        particle.trail.pop();
      }

      // Draw trail (fading tail)
      particle.trail.forEach((point, index) => {
        const alpha = (1 - index / particle.trail.length) * particle.opacity * 0.5;
        const size = (1 - index / particle.trail.length) * 3;
        
        // Glow
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, size * 3
        );
        gradient.addColorStop(0, `rgba(120, 180, 255, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(80, 140, 255, ${alpha * 0.5})`);
        gradient.addColorStop(1, "rgba(60, 120, 255, 0)");
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(point.x, point.y, size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw main light particle (bright core)
      const coreGradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, 8
      );
      coreGradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`);
      coreGradient.addColorStop(0.3, `rgba(180, 220, 255, ${particle.opacity * 0.8})`);
      coreGradient.addColorStop(0.6, `rgba(100, 160, 255, ${particle.opacity * 0.4})`);
      coreGradient.addColorStop(1, "rgba(60, 120, 255, 0)");

      ctx.beginPath();
      ctx.fillStyle = coreGradient;
      ctx.arc(particle.x, particle.y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Bright center dot
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawSpark = (spark: Spark) => {
      const progress = spark.life / spark.maxLife;
      
      // Central flash/glow - yellow/gold color
      const glowGradient = ctx.createRadialGradient(
        spark.x, spark.y, 0,
        spark.x, spark.y, 35 * progress
      );
      glowGradient.addColorStop(0, `rgba(255, 255, 200, ${0.9 * progress})`);
      glowGradient.addColorStop(0.2, `rgba(255, 230, 100, ${0.7 * progress})`);
      glowGradient.addColorStop(0.5, `rgba(255, 180, 50, ${0.4 * progress})`);
      glowGradient.addColorStop(1, "rgba(255, 150, 0, 0)");
      
      ctx.beginPath();
      ctx.fillStyle = glowGradient;
      ctx.arc(spark.x, spark.y, 35 * progress, 0, Math.PI * 2);
      ctx.fill();

      // Flying spark particles
      spark.particles.forEach((particle) => {
        const distance = particle.speed * (1 - progress) * 20;
        const px = spark.x + Math.cos(particle.angle) * distance;
        const py = spark.y + Math.sin(particle.angle) * distance;
        
        // Particle glow
        const particleGradient = ctx.createRadialGradient(
          px, py, 0,
          px, py, particle.size * 2 * progress
        );
        particleGradient.addColorStop(0, `rgba(255, 240, 150, ${progress})`);
        particleGradient.addColorStop(0.5, `rgba(255, 200, 80, ${progress * 0.6})`);
        particleGradient.addColorStop(1, "rgba(255, 180, 50, 0)");
        
        ctx.beginPath();
        ctx.fillStyle = particleGradient;
        ctx.arc(px, py, particle.size * 3 * progress, 0, Math.PI * 2);
        ctx.fill();

        // Bright core of each spark particle
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 220, ${progress})`;
        ctx.arc(px, py, particle.size * 0.5 * progress, 0, Math.PI * 2);
        ctx.fill();
      });

      // Very bright center flash
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${progress * 0.9})`;
      ctx.arc(spark.x, spark.y, 5 * progress, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      drawGrid();

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Remove if off screen
        if (particle.x < -50 || particle.x > width + 50 ||
            particle.y < -50 || particle.y > height + 50) {
          return false;
        }

        drawParticle(particle);
        return true;
      });

      // Add new particles occasionally
      if (Math.random() < 0.015 && particlesRef.current.length < 10) {
        particlesRef.current.push(createParticle());
      }

      checkCollisions();

      // Update and draw sparks
      sparksRef.current = sparksRef.current.filter((spark) => {
        spark.life -= 0.015;
        if (spark.life <= 0) return false;
        drawSpark(spark);
        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  );
};

export default GridLightAnimation;
