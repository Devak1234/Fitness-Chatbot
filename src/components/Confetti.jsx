import { useEffect, useState } from 'react';
import './Confetti.css';

const Confetti = ({ show, duration = 3000, particleCount = 50 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (show) {
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 2 + 1,
        delay: Math.random() * 1000
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, particleCount]);

  if (!show || particles.length === 0) return null;

  return (
    <div className="confetti-container" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: `${particle.x}%`,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: `rotate(${particle.rotation}deg)`,
            animationDelay: `${particle.delay}ms`,
            animationDuration: `${3000 / particle.speed}ms`
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;