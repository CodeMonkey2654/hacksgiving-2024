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
      '#FFD700', // Gold
      '#F8F8FF', // White
      '#87CEEB', // Sky Blue
      '#E6E6FA', // Lavender
      '#FFF8DC', // Cream
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const createParticle = useCallback((x: number, y: number) => {
    const particle = document.createElement('div');
    const size = Math.random() * 6 + 2;
    const angle = Math.random() * 360;

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
    particle.style.filter = 'blur(0.5px)';
    
    document.body.appendChild(particle);

    const style = document.createElement('style');
    const uniqueId = `particle-${Date.now()}-${Math.random()}`;
    particle.classList.add(uniqueId);
    
    style.textContent = `
      .${uniqueId}::before,
      .${uniqueId}::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: inherit;
        border-radius: inherit;
        transform: rotate(45deg);
      }
      .${uniqueId}::after {
        transform: rotate(-45deg);
      }
    `;
    document.head.appendChild(style);

    const animation = particle.animate(
      [
        { 
          transform: `rotate(${angle}deg) scale(1)`,
          opacity: 1,
          filter: 'brightness(1.5)',
        },
        {
          transform: `rotate(${angle + 90}deg) scale(0.8)`,
          opacity: 0.8,
          filter: 'brightness(2)',
          offset: 0.3
        },
        {
          transform: `rotate(${angle + 180}deg) scale(0.5)`,
          opacity: 0.4,
          filter: 'brightness(1.5)',
          offset: 0.6
        },
        { 
          transform: `rotate(${angle + 360}deg) scale(0)`,
          opacity: 0,
          filter: 'brightness(1)',
        }
      ],
      {
        duration: 1500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    );

    animation.onfinish = () => {
      particle.remove();
      style.remove();
    };
  }, []);

  useEffect(() => {
    let lastTime = 0;
    const throttleDelay = 40;

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime > throttleDelay) {
        for (let i = 0; i < 2; i++) {
          const offsetX = (Math.random() - 0.5) * 10;
          const offsetY = (Math.random() - 0.5) * 10;
          createParticle(e.clientX + offsetX, e.clientY + offsetY);
        }
        lastTime = currentTime;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [createParticle]);

  return null;
};

export default MouseParticles; 