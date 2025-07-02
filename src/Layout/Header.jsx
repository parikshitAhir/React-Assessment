import { NavLink } from "react-router-dom";
import './Header.css'; 

function Header() {
  return (
    <header className="site-header">
      <div className="header-left">
        <div className="logo"></div>
        <ul className="nav-links">
          <li>
            <NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>User</NavLink>
          </li>
          <li>
            <NavLink to="/prodash" className={({ isActive }) => isActive ? "active" : ""}>Product</NavLink>
          </li>
          <li>
            <NavLink to="/newpass" className={({ isActive }) => isActive ? "active" : ""}>New Pass</NavLink>
          </li>
        </ul>
      </div>

    </header>
  );
}

export default Header;
