import { FC, HTMLAttributes, useEffect } from 'react';
import './Energy.css';

interface EnergyProps extends HTMLAttributes<HTMLElement> {
  energy: number;
  maxEnergy: number;
  setEnergy: (energy: (prevEnergy: number) => number) => void;
}

export const Energy: FC<EnergyProps> = ({ energy, maxEnergy, setEnergy }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prevEnergy => Math.min(prevEnergy + 1, maxEnergy));
    }, 100);

    return () => clearInterval(interval); 
  }, [maxEnergy, setEnergy]);

  return (
    <div className="energy-container">
      <div className="energy-info">
        <img className="energy-icon" src="energy.svg" alt="Energy Icon" />
        <div className='data-energy'>
          <span className="current-energy">{energy.toLocaleString()}</span>
          <span className="max-energy">/{maxEnergy.toLocaleString()}</span>          
        </div>
      </div>
      <button className="boost-button">
        <img className="boost-icon" src="boost.svg" alt="Boost Icon" />
        <span className="boost-button-text">Boosts</span>
      </button>
    </div>
  );
};
