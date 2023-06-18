import { NavLink, useNavigation } from 'react-router-dom';

import './Header.scss';

const Header = () => {
  const navigation = useNavigation();
  return (
    <header className="header">
      <nav>
        <NavLink to="/" end>
          <h1>Podcaster</h1>
        </NavLink>
      </nav>

      <div className="loader">
        {navigation.state === 'loading' && (
          <div className="loader__container"></div>
        )}
      </div>
    </header>
  );
};
export default Header;
