import { useEffect, useRef } from "react";

interface LightLine {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  speed: number;
  isHorizontal: boolean;
  opacity: number;
  length: number;
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
  const linesRef = useRef<LightLine[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const lastSparkTime = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 80;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Create a light line that travels along grid lines
    const createLine = (): LightLine => {
      const isHorizontal = Math.random() > 0.5;
      const gridX = Math.floor(Math.random() * (width / gridSize)) * gridSize;
      const gridY = Math.floor(Math.random() * (height / gridSize)) * gridSize;
      
      const speed = 0.008 + Math.random() * 0.006;
      const length = 60 + Math.random() * 80; // Line segment length
      
      return {
        startX: isHorizontal ? 0 : gridX,
        startY: isHorizontal ? gridY : 0,
        endX: isHorizontal ? width : gridX,
        endY: isHorizontal ? gridY : height,
        progress: 0,
        speed,
        isHorizontal,
        opacity: 0.7 + Math.random() * 0.3,
        length,
      };
    };

    // Initialize with some lines
    for (let i = 0; i < 8; i++) {
      linesRef.current.push(createLine());
    }

    const createSpark = (x: number, y: number) => {
      const key = `${Math.round(x)}-${Math.round(y)}`;
      const now = Date.now();
      const lastTime = lastSparkTime.current.get(key) || 0;
      
      // Prevent sparks at same location within 500ms
      if (now - lastTime < 500) return;
      lastSparkTime.current.set(key, now);
      
      const particles = [];
      const numParticles = 10;
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          angle: (Math.PI * 2 * i) / numParticles + (Math.random() - 0.5) * 0.3,
          speed: 1.5 + Math.random() * 3,
          size: 1 + Math.random() * 1.5,
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

    // Check for line intersections
    const checkIntersections = () => {
      const lines = linesRef.current;
      for (let i = 0; i < lines.length; i++) {
        for (let j = i + 1; j < lines.length; j++) {
          const l1 = lines[i];
          const l2 = lines[j];
          
          // Only check if one is horizontal and one is vertical
          if (l1.isHorizontal !== l2.isHorizontal) {
            // Calculate current position of each line's head
            const l1HeadX = l1.startX + (l1.endX - l1.startX) * l1.progress;
            const l1HeadY = l1.startY + (l1.endY - l1.startY) * l1.progress;
            const l2HeadX = l2.startX + (l2.endX - l2.startX) * l2.progress;
            const l2HeadY = l2.startY + (l2.endY - l2.startY) * l2.progress;
            
            // Check if the heads are close to each other
            const dist = Math.sqrt((l1HeadX - l2HeadX) ** 2 + (l1HeadY - l2HeadY) ** 2);
            if (dist < 25) {
              const intersectX = l1.isHorizontal ? l2HeadX : l1HeadX;
              const intersectY = l1.isHorizontal ? l1HeadY : l2HeadY;
              createSpark(intersectX, intersectY);
            }
          }
        }
      }
    };

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(80, 140, 255, 0.03)";
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

    const drawLine = (line: LightLine) => {
      const totalLength = line.isHorizontal ? (line.endX - line.startX) : (line.endY - line.startY);
      const headPos = totalLength * line.progress;
      const tailPos = Math.max(0, headPos - line.length);
      
      // Current head position
      const headX = line.startX + (line.isHorizontal ? headPos : 0);
      const headY = line.startY + (line.isHorizontal ? 0 : headPos);
      
      // Current tail position
      const tailX = line.startX + (line.isHorizontal ? tailPos : 0);
      const tailY = line.startY + (line.isHorizontal ? 0 : tailPos);
      
      // Draw glowing line segment
      const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
      gradient.addColorStop(0, "rgba(60, 120, 255, 0)");
      gradient.addColorStop(0.3, `rgba(100, 160, 255, ${line.opacity * 0.3})`);
      gradient.addColorStop(0.7, `rgba(140, 200, 255, ${line.opacity * 0.7})`);
      gradient.addColorStop(1, `rgba(200, 230, 255, ${line.opacity})`);
      
      // Draw main line
      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(headX, headY);
      ctx.stroke();
      
      // Draw glow around line
      ctx.beginPath();
      const glowGradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
      glowGradient.addColorStop(0, "rgba(60, 120, 255, 0)");
      glowGradient.addColorStop(0.5, `rgba(100, 160, 255, ${line.opacity * 0.15})`);
      glowGradient.addColorStop(1, `rgba(140, 200, 255, ${line.opacity * 0.25})`);
      ctx.strokeStyle = glowGradient;
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(headX, headY);
      ctx.stroke();
      
      // Draw bright head
      const headGlow = ctx.createRadialGradient(headX, headY, 0, headX, headY, 12);
      headGlow.addColorStop(0, `rgba(255, 255, 255, ${line.opacity})`);
      headGlow.addColorStop(0.3, `rgba(180, 220, 255, ${line.opacity * 0.7})`);
      headGlow.addColorStop(0.6, `rgba(100, 160, 255, ${line.opacity * 0.3})`);
      headGlow.addColorStop(1, "rgba(60, 120, 255, 0)");
      
      ctx.beginPath();
      ctx.fillStyle = headGlow;
      ctx.arc(headX, headY, 12, 0, Math.PI * 2);
      ctx.fill();
      
      // Bright center of head
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${line.opacity})`;
      ctx.arc(headX, headY, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawSpark = (spark: Spark) => {
      const progress = spark.life / spark.maxLife;
      
      // Central flash/glow - yellow/gold color
      const glowGradient = ctx.createRadialGradient(
        spark.x, spark.y, 0,
        spark.x, spark.y, 30 * progress
      );
      glowGradient.addColorStop(0, `rgba(255, 255, 200, ${0.9 * progress})`);
      glowGradient.addColorStop(0.2, `rgba(255, 230, 100, ${0.7 * progress})`);
      glowGradient.addColorStop(0.5, `rgba(255, 180, 50, ${0.4 * progress})`);
      glowGradient.addColorStop(1, "rgba(255, 150, 0, 0)");
      
      ctx.beginPath();
      ctx.fillStyle = glowGradient;
      ctx.arc(spark.x, spark.y, 30 * progress, 0, Math.PI * 2);
      ctx.fill();

      // Flying spark particles
      spark.particles.forEach((particle) => {
        const distance = particle.speed * (1 - progress) * 15;
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
        ctx.arc(px, py, particle.size * 2.5 * progress, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 220, ${progress})`;
        ctx.arc(px, py, particle.size * 0.4 * progress, 0, Math.PI * 2);
        ctx.fill();
      });

      // Very bright center flash
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${progress * 0.9})`;
      ctx.arc(spark.x, spark.y, 4 * progress, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      drawGrid();

      // Update and draw lines
      linesRef.current = linesRef.current.filter((line) => {
        line.progress += line.speed;

        // Remove if fully passed
        if (line.progress > 1.2) {
          return false;
        }

        drawLine(line);
        return true;
      });

      // Add new lines occasionally
      if (Math.random() < 0.02 && linesRef.current.length < 12) {
        linesRef.current.push(createLine());
      }

      checkIntersections();

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
      style={{ opacity: 0.9 }}
    />
  );
};

export default GridLightAnimation;
