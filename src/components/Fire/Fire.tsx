import { FC, HTMLAttributes, useState } from 'react';
import './Fire.css';
import Timer from '../Timer/Timer';

interface FireProps extends HTMLAttributes<HTMLElement> {
  points: number;
  setPoints: (points: number) => void;
  energy: number;
  setEnergy: (energy: (prevEnergy: number) => number) => void;
}

export const Fire: FC<FireProps> = ({ points, setPoints, energy, setEnergy }) => {
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number}[]>([]);
  const pointsToAdd = 10;
  const energyToReduce = 10;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    
    const x = e.pageX;
    const y = e.pageY;

    setPoints(points + pointsToAdd);
    setEnergy(prevEnergy => Math.max(prevEnergy - energyToReduce, 0));
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  return (
    <div className='fire__container'>
      <div className='coin-counter__container'>
        <img className="coin-fire" src="coin.png" alt="CoinImg"  />
        <span className="coin-counter">{points.toLocaleString()}</span>
      </div>
      <Timer/>
      <div className='fire' onClick={handleClick}>
        <img className="fire-img" src="fire.png" alt="FireImg" />
      </div>
      {clicks.map((click) => (
        <div
          key={click.id}
          className="gain"
          style={{
            top: `${click.y}px`,
            left: `${click.x}px`,
            animation: `gain 1s ease-out`
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          +10
        </div>
      ))}
    </div>
  );
};
