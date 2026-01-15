import { useEffect, useRef } from "react";

interface LightBeam {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
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
  const beamsRef = useRef<LightBeam[]>([]);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 80;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Initialize beams
    const createBeam = (): LightBeam => {
      const isHorizontal = Math.random() > 0.5;
      const gridX = Math.floor(Math.random() * (width / gridSize)) * gridSize;
      const gridY = Math.floor(Math.random() * (height / gridSize)) * gridSize;
      
      return {
        x: isHorizontal ? 0 : gridX,
        y: isHorizontal ? gridY : 0,
        vx: isHorizontal ? (2 + Math.random() * 2) * (Math.random() > 0.5 ? 1 : -1) : 0,
        vy: isHorizontal ? 0 : (2 + Math.random() * 2) * (Math.random() > 0.5 ? 1 : -1),
        length: 60 + Math.random() * 100,
        opacity: 0.4 + Math.random() * 0.4,
      };
    };

    // Initialize with some beams
    for (let i = 0; i < 8; i++) {
      beamsRef.current.push(createBeam());
    }

    const createSpark = (x: number, y: number) => {
      const particles = [];
      for (let i = 0; i < 8; i++) {
        particles.push({
          angle: (Math.PI * 2 * i) / 8 + Math.random() * 0.3,
          speed: 1 + Math.random() * 3,
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

    // Check for collisions between beams
    const checkCollisions = () => {
      const beams = beamsRef.current;
      for (let i = 0; i < beams.length; i++) {
        for (let j = i + 1; j < beams.length; j++) {
          const b1 = beams[i];
          const b2 = beams[j];
          
          // Only check if one is horizontal and one is vertical
          if ((b1.vx !== 0 && b2.vy !== 0) || (b1.vy !== 0 && b2.vx !== 0)) {
            const dist = Math.sqrt((b1.x - b2.x) ** 2 + (b1.y - b2.y) ** 2);
            if (dist < 15) {
              // Snap to grid intersection
              const snapX = Math.round((b1.x + b2.x) / 2 / gridSize) * gridSize;
              const snapY = Math.round((b1.y + b2.y) / 2 / gridSize) * gridSize;
              createSpark(snapX, snapY);
            }
          }
        }
      }
    };

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(100, 150, 255, 0.03)";
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

    const drawBeam = (beam: LightBeam) => {
      const gradient = ctx.createLinearGradient(
        beam.x - beam.vx * beam.length,
        beam.y - beam.vy * beam.length,
        beam.x,
        beam.y
      );

      gradient.addColorStop(0, "rgba(59, 130, 246, 0)");
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${beam.opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(147, 197, 253, ${beam.opacity})`);

      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.moveTo(beam.x - beam.vx * beam.length * 0.5, beam.y - beam.vy * beam.length * 0.5);
      ctx.lineTo(beam.x, beam.y);
      ctx.stroke();

      // Glow effect
      ctx.beginPath();
      ctx.strokeStyle = `rgba(59, 130, 246, ${beam.opacity * 0.3})`;
      ctx.lineWidth = 6;
      ctx.moveTo(beam.x - beam.vx * beam.length * 0.3, beam.y - beam.vy * beam.length * 0.3);
      ctx.lineTo(beam.x, beam.y);
      ctx.stroke();

      // Bright head
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${beam.opacity})`;
      ctx.arc(beam.x, beam.y, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawSpark = (spark: Spark) => {
      const progress = spark.life / spark.maxLife;
      
      // Central glow
      const glowGradient = ctx.createRadialGradient(
        spark.x, spark.y, 0,
        spark.x, spark.y, 20 * progress
      );
      glowGradient.addColorStop(0, `rgba(255, 220, 100, ${0.8 * progress})`);
      glowGradient.addColorStop(0.5, `rgba(255, 180, 50, ${0.4 * progress})`);
      glowGradient.addColorStop(1, "rgba(255, 150, 0, 0)");
      
      ctx.beginPath();
      ctx.fillStyle = glowGradient;
      ctx.arc(spark.x, spark.y, 20 * progress, 0, Math.PI * 2);
      ctx.fill();

      // Particles
      spark.particles.forEach((particle) => {
        const distance = particle.speed * (1 - progress) * 15;
        const px = spark.x + Math.cos(particle.angle) * distance;
        const py = spark.y + Math.sin(particle.angle) * distance;
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 230, 100, ${progress})`;
        ctx.arc(px, py, particle.size * progress, 0, Math.PI * 2);
        ctx.fill();
      });

      // Bright center
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${progress})`;
      ctx.arc(spark.x, spark.y, 4 * progress, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      drawGrid();

      // Update and draw beams
      beamsRef.current = beamsRef.current.filter((beam) => {
        beam.x += beam.vx;
        beam.y += beam.vy;

        // Remove if off screen
        if (beam.x < -beam.length || beam.x > width + beam.length ||
            beam.y < -beam.length || beam.y > height + beam.length) {
          return false;
        }

        drawBeam(beam);
        return true;
      });

      // Add new beams occasionally
      if (Math.random() < 0.02 && beamsRef.current.length < 12) {
        beamsRef.current.push(createBeam());
      }

      checkCollisions();

      // Update and draw sparks
      sparksRef.current = sparksRef.current.filter((spark) => {
        spark.life -= 0.02;
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
      style={{ opacity: 0.7 }}
    />
  );
};

export default GridLightAnimation;
