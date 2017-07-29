import { NavLink } from 'react-router-dom';
import * as React from 'react';

const Navgation: React.SFC<{}> = () => {
  return (
    <nav className="pt-navbar pt-dark">
      <div className="pt-navbar-group pt-align-left">
        <NavLink to="/" className="pt-button pt-minimal pt-icon-home">
          Home
        </NavLink>
      </div>
      <div className="pt-navbar-group pt-align-right">
        <NavLink to="/settings" className="pt-button pt-minimal pt-icon-cog" />
      </div>
    </nav>
  );
};

export default Navgation;
