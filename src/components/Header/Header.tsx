import './Header.scss';

import { NavLink, useLocation } from 'react-router-dom';
import { getPodcastsStatus } from 'store/features/podcasts/podcastsSlice';
import { useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';

const Header = () => {
  const podcastsStatus = useAppSelector(getPodcastsStatus);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (podcastsStatus === "loading" || location) {
      setLoading(true);
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout)
  }, [location, podcastsStatus]);

  return (
    <header className="header">
      <nav>
        <NavLink to="/" end>
          <h1>Podcaster</h1>
        </NavLink>
      </nav>

      <div className="loader">
        {loading ? (
          <div className="loader__container"></div>
        ) : null}
      </div>
    </header>
  );
};
export default Header;
