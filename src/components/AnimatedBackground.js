import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles = [];
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20)); // Responsive particle count
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.life = Math.random() * 100 + 50;
        this.maxLife = this.life;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Fade out near end of life
        if (this.life < 20) {
          this.opacity = (this.life / 20) * 0.5;
        }

        // Reset particle if it dies
        if (this.life <= 0) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.life = this.maxLife;
          this.opacity = Math.random() * 0.5 + 0.1;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = 'rgb(156, 163, 175)'; // Gray color for particles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Subtle color shift animation
    let colorShift = 0;
    const colorSpeed = 0.0005;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create static gradient background with subtle color variation
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      // Light mode gradient
      const lightGradient = [
        { stop: 0, color: 'rgb(248, 250, 252)' }, // slate-50
        { stop: 0.3, color: 'rgb(241, 245, 249)' }, // slate-100
        { stop: 0.7, color: 'rgb(226, 232, 240)' }, // slate-200
        { stop: 1, color: 'rgb(203, 213, 225)' }   // slate-300
      ];
      
      // Dark mode gradient
      const darkGradient = [
        { stop: 0, color: 'rgb(15, 23, 42)' },     // slate-900
        { stop: 0.3, color: 'rgb(30, 41, 59)' },   // slate-800
        { stop: 0.7, color: 'rgb(51, 65, 85)' },   // slate-700
        { stop: 1, color: 'rgb(71, 85, 105)' }     // slate-600
      ];

      const isDark = document.documentElement.classList.contains('dark');
      const currentGradient = isDark ? darkGradient : lightGradient;

      // Apply subtle color shift instead of position shift
      currentGradient.forEach(({ stop, color }) => {
        const adjustedColor = adjustColorBrightness(color, Math.sin(colorShift) * 0.05);
        gradient.addColorStop(stop, adjustedColor);
      });

      // Fill background
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update color shift
      colorShift += colorSpeed;

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw subtle connecting lines between nearby particles
      ctx.strokeStyle = 'rgba(156, 163, 175, 0.1)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Helper function to adjust color brightness
    const adjustColorBrightness = (color, factor) => {
      const rgb = color.match(/\d+/g).map(Number);
      const adjusted = rgb.map(channel => {
        const newChannel = Math.max(0, Math.min(255, channel + (channel * factor)));
        return Math.round(newChannel);
      });
      return `rgb(${adjusted[0]}, ${adjusted[1]}, ${adjusted[2]})`;
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: 'transparent'
        }}
      />
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-white/5 dark:bg-black/5 pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground; 