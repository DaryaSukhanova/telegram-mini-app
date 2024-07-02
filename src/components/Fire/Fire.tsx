import { FC, HTMLAttributes, useState, useEffect } from 'react';
import { initHapticFeedback } from '@tma.js/sdk';
import './Fire.css';
import Timer from '../Timer/Timer';

interface FireProps extends HTMLAttributes<HTMLElement> {
  points: number;
  setPoints: (points: (prevPoints: number) => number) => void;
  energy: number;
  setEnergy: (energy: (prevEnergy: number) => number) => void;
}

interface Click {
  id: number;
  x: number;
  y: number;
}

export const Fire: FC<FireProps> = ({ points, setPoints, energy, setEnergy }) => {
  const [clicks, setClicks] = useState<Click[]>([]);
  const pointsToAdd = 10;
  const energyToReduce = 10;


  const [hapticAvailable, setHapticAvailable] = useState(false);

  useEffect(() => {
    try {
    
      // const hapticFeedback = initHapticFeedback();
      setHapticAvailable(true);
    } catch (error) {
      console.error('Failed to initialize haptic feedback:', error);
    }
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    
    const touches = Array.from(e.touches);

    touches.forEach(touch => {
      const x = touch.clientX;
      const y = touch.clientY;

      // Уникальный идентификатор для каждого касания
      const newClick: Click = { id: Date.now() + Math.random(), x, y };

      setPoints((prevPoints: number) => prevPoints + pointsToAdd);
      setEnergy((prevEnergy: number) => Math.max(prevEnergy - energyToReduce, 0));
      setClicks(prevClicks => [...prevClicks, newClick]);

      // Вызов вибрации, если доступно
      if (hapticAvailable) {
        try {
          const hapticFeedback = initHapticFeedback();
          hapticFeedback.impactOccurred('medium');
        } catch (error) {
          console.error('Haptic feedback failed:', error);
        }
      }
    });
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  return (
    <div className='fire__container'>
      <div className='coin-counter__container'>
        <img className="coin-fire" src="coin.png" alt="CoinImg" />
        <span className="coin-counter">{points.toLocaleString()}</span>
      </div>
      <Timer />
      <div className='fire' onTouchStart={handleTouchStart}>
        <img className="fire-img" src="fire.png" alt="FireImg" />
      </div>
      {clicks.map((click) => (
        <div
          key={click.id}
          className="gain"
          style={{
            top: `${click.y}px`,
            left: `${click.x}px`,
            animation: `gain 1s ease-out forwards`
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          +10
        </div>
      ))}
    </div>
  );
};
