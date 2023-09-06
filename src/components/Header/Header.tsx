import './Header.scss';

import { NavLink } from 'react-router-dom';
import { getPodcastsStatus } from 'store/features/podcasts/podcastsSlice';
import { useAppSelector } from '../../app/hooks';

const Header = () => {
  const podcastsStatus = useAppSelector(getPodcastsStatus);

  return (
    <header className="header">
      <nav>
        <NavLink to="/" end>
          <h1>Podcaster</h1>
        </NavLink>
      </nav>

      <div className="loader">
        {podcastsStatus === 'loading' ? (
          <div className="loader__container"></div>
        ) : null}
      </div>
    </header>
  );
};
export default Header;
