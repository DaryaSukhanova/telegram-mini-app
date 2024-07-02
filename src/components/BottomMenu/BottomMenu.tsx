import { FC, HTMLAttributes, useState } from 'react';
import './BottomMenu.css';


interface BottomMenuProps extends HTMLAttributes<HTMLElement> {}

export const BottomMenu: FC<BottomMenuProps> = ({}) => {
  const [active, setActive] = useState('fire');

  const handleSelect = (item: string) => {
    setActive(item);
  }
  return (
    <div className="bottom-menu">
      <button
        className={`menu-button ${active === 'fire' ? 'active' : ''}`}
        onClick={() => handleSelect('fire')}
      >
        <img src="fire-bottom.svg" alt="Fire" />
      </button>
      <button
        className={`menu-button ${active === 'users' ? 'active' : ''}`}
        onClick={() => handleSelect('users')}
      >
        <img src="users.svg" alt="Users" />
      </button>
    </div>
  );
};
