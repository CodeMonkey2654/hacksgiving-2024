import { useEffect, useCallback } from 'react';

const MouseParticles = () => {
  useEffect(() => {
    // Add global cursor styles when component mounts
    const style = document.createElement('style');
    style.textContent = `
      body * {
        cursor: none !important;
      }
      
      .magic-cursor {
        position: fixed;
        width: 24px;
        height: 24px;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFD700'%3E%3Cpath d='M8 2.69l3-3 3 3v.4l7.37 7.37a1 1 0 0 1 0 1.41l-5.37 5.37a1 1 0 0 1-1.41 0L7.6 10H7.2l-3-3 3-3v-.31zM10 .31l-3 3L4.69 1 7.69-2l3 3zm2 0l3 3L12.69 1 9.69-2l3 3z'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
        filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.6));
      }
      
      .magic-cursor.clicking {
        transform: translate(-50%, -50%) scale(1.2);
      }
    `;
    document.head.appendChild(style);

    // Create cursor element
    const cursor = document.createElement('div');
    cursor.className = 'magic-cursor';
    document.body.appendChild(cursor);

    // Handle cursor movement
    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    // Handle click animation
    const handleMouseDown = () => cursor.classList.add('clicking');
    const handleMouseUp = () => cursor.classList.remove('clicking');

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeChild(cursor);
      document.head.removeChild(style);
    };
  }, []);

  const getRandomColor = () => {
    const colors = [
      '#FF0000', // Red
      '#00FF00', // Green
      '#0000FF', // Blue
      '#FFFF00', // Yellow
      '#FF00FF', // Magenta
      '#00FFFF', // Cyan
      '#FFD700', // Gold
      '#FF69B4', // Hot Pink
      '#7FFF00', // Chartreuse
      '#9400D3', // Violet
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const createFirework = useCallback((x: number, y: number) => {
    // Create multiple clusters
    for (let cluster = 0; cluster < 3; cluster++) {
      setTimeout(() => {
        const particleCount = 20;
        const angleStep = (2 * Math.PI) / particleCount;
        const speed = 2; // Reduced speed further
        const clusterOffsetX = (Math.random() - 0.5) * 50;
        const clusterOffsetY = (Math.random() - 0.5) * 50;
        const clusterColor = getRandomColor();

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          const size = Math.random() * 3 + 2;
          const angle = angleStep * i + (Math.random() - 0.5) * 0.5;
          const velocity = {
            x: Math.cos(angle) * speed * (0.8 + Math.random() * 0.4),
            y: Math.sin(angle) * speed * (0.8 + Math.random() * 0.4)
          };

          particle.style.position = 'fixed';
          particle.style.left = `${x + clusterOffsetX}px`;
          particle.style.top = `${y + clusterOffsetY}px`;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.backgroundColor = clusterColor;
          particle.style.borderRadius = '50%';
          particle.style.pointerEvents = 'none';
          particle.style.zIndex = '9999';
          particle.style.boxShadow = `0 0 ${size * 2}px ${size}px ${clusterColor}`;
          
          document.body.appendChild(particle);

          const startTime = performance.now();
          const duration = 800; // Reduced duration
          const gravity = 0.04; // Reduced gravity further

          function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = elapsed / duration;

            if (progress >= 1) {
              particle.remove();
              return;
            }

            // Calculate new position
            const posX = x + clusterOffsetX + velocity.x * elapsed * 0.7;
            let posY = y + clusterOffsetY + velocity.y * elapsed + (0.5 * gravity * elapsed * elapsed);

            // Prevent particles from going below initial Y position
            if (posY > y) {
              posY = y;
            }

            const scale = 1 - progress;
            const opacity = 1 - (progress * 1.5); // Faster fade out

            particle.style.transform = `translate(${posX - x - clusterOffsetX}px, ${posY - y - clusterOffsetY}px) scale(${scale})`;
            particle.style.opacity = Math.max(0, opacity).toString();

            requestAnimationFrame(animate);
          }

          requestAnimationFrame(animate);
        }
      }, cluster * 100); // Reduced cluster delay
    }
  }, []);

  const createTrailParticle = useCallback((x: number, y: number) => {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;

    particle.style.position = 'fixed';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = getRandomColor();
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.boxShadow = `0 0 ${size}px ${size/2}px ${getRandomColor()}`;
    
    document.body.appendChild(particle);

    const animation = particle.animate(
      [
        { 
          transform: 'scale(1)',
          opacity: 1,
        },
        { 
          transform: 'scale(0)',
          opacity: 0,
        }
      ],
      {
        duration: 300, // Reduced duration
        easing: 'ease-out',
      }
    );

    animation.onfinish = () => particle.remove();
  }, []);

  useEffect(() => {
    let lastTime = 0;
    const throttleDelay = 40;

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime > throttleDelay) {
        createTrailParticle(e.clientX, e.clientY);
        lastTime = currentTime;
      }
    };

    const handleClick = (e: MouseEvent) => {
      createFirework(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [createTrailParticle, createFirework]);

  return null;
};

export default MouseParticles;