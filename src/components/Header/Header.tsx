import { FC, HTMLAttributes } from 'react';
import './Header.css';
import { useInitData, User } from '@tma.js/sdk-react';
// interface User {
//     name: string;
//     avatar: string;
//     level: number;
// }

interface HeaderProps extends HTMLAttributes<HTMLElement> {
    points: number;
    maxScore: number;
}

// const user: User = {
//     name: 'Anna',
//     avatar: 'avatar.png',
//     level: 15,
// };

export const Header: FC<HeaderProps> = ({ points, maxScore }) => {
  const initData = useInitData();
  const user: User | undefined = initData?.user;
    const progress = Math.min((points / maxScore) * 100, 100);

  return (
    <div className="header-container">
      <div className="user-info">
        <img className="avatar" src={user?.photoUrl} alt="Profile" />
        <span className="user-name">{user?.firstName} {user?.lastName}</span>
      </div>
      <div className='level-info'>
        <div className="level-details">
            <span className="level">15 level</span>
            <div className="score-info">
                <img className="coin" src="coin.png" alt="CoinImg" />
                <span className="score">{maxScore.toLocaleString()}</span>
                <span className="to-next-level">To 16 lvl</span>
            </div>
        </div>

        <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

    </div>
  );
};
