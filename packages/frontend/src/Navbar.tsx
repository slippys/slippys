import { NavLink, Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <header className="header">

        <h1 className="title">
          <Link to="/" className="title">
            Slippy's Tallow Skincare
          </Link>
        </h1>

      <nav className="nav">
        <NavLink
          to="/shop"
          end
          className={({isActive}) => (isActive ? 'nav-item active' : 'nav-item')}
        >
          Shop
        </NavLink>
        <NavLink
          to="/about"
          className={({isActive}) => (isActive ? 'nav-item active' : 'nav-item')}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({isActive}) => (isActive ? 'nav-item active' : 'nav-item')}
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
}

      export default NavBar;
