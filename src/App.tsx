import { useState } from 'react';
import './App.css';
import { Energy } from './components/Energy/Energy';
import { BottomMenu } from './components/BottomMenu/BottomMenu';
import { Fire } from './components/Fire/Fire';
import { Header } from './components/Header/Header';

function App() {
  const [points, setPoints] = useState(10000);
  const [energy, setEnergy] = useState(2556);
  
  const maxScore = 100000; 
  const maxEnergy = 3000;

  return (
    <div className='app'>
      <div className='container'>
        <Header points={points} maxScore={maxScore} />
        <Fire points={points} setPoints={setPoints} energy={energy} setEnergy={setEnergy} />
        <Energy energy={energy} maxEnergy={maxEnergy} setEnergy={setEnergy} />
        <BottomMenu />        
      </div>

      
    </div>
  );
}

export default App;
