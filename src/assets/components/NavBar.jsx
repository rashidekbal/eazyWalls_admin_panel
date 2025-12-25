import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import style from "./css/NavBar.module.css";

export default function NavBar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isTrendingActive = location.pathname.includes("add-trending") || location.pathname.includes("edit-trending");
  const isFeaturedActive = location.pathname.includes("add-featured") || location.pathname.includes("edit-featured");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={style.navbar}>
      <div className={style.brand}>
        <h1>EazyWalls <span className={style.brandHighlight}>Panel</span></h1>
      </div>

      <button className={style.hamburger} onClick={toggleMenu} aria-label="Toggle Navigation">
        <span className={`${style.bar} ${isMenuOpen ? style.open : ''}`}></span>
        <span className={`${style.bar} ${isMenuOpen ? style.open : ''}`}></span>
        <span className={`${style.bar} ${isMenuOpen ? style.open : ''}`}></span>
      </button>

      <ul className={`${style.navLinks} ${isMenuOpen ? style.navOpen : ''}`}>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => `${style.link} ${isActive ? style.active : ""}`}
            onClick={closeMenu}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/addWallpaper" 
            className={({ isActive }) => `${style.link} ${isActive ? style.active : ""}`}
            onClick={closeMenu}
          >
            Add Wallpaper
          </NavLink>
        </li>
        {/* Categories Dropdown */}
        <li className={style.dropdownItem}>
          <span className={`${style.link} ${location.pathname.includes("addCategory") || location.pathname.includes("edit-category") ? style.active : ""}`}>Categories ▾</span>
          <ul className={style.dropdownMenu}>
            <li>
              <NavLink 
                to="/addCategory" 
                className={({ isActive }) => `${style.dropdownLink} ${isActive ? style.activeDropdown : ""}`}
                onClick={closeMenu}
              >
                Add New
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/edit-category" 
                className={({ isActive }) => `${style.dropdownLink} ${isActive ? style.activeDropdown : ""}`}
                onClick={closeMenu}
              >
                Edit Preview
              </NavLink>
            </li>
          </ul>
        </li>
        
        {/* Trending Dropdown */}
        <li className={style.dropdownItem}>
          <span className={`${style.link} ${isTrendingActive ? style.active : ""}`}>Trending ▾</span>
          <ul className={style.dropdownMenu}>
            <li>
              <NavLink 
                to="/add-trending" 
                className={({ isActive }) => `${style.dropdownLink} ${isActive ? style.activeDropdown : ""}`}
                onClick={closeMenu}
              >
                Add New
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/edit-trending" 
                className={({ isActive }) => `${style.dropdownLink} ${isActive ? style.activeDropdown : ""}`}
                onClick={closeMenu}
              >
                Manage Existing
              </NavLink>
            </li>
          </ul>
        </li>

        {/* Featured Dropdown */}
        <li className={style.dropdownItem}>
          <span className={`${style.link} ${isFeaturedActive ? style.active : ""}`}>Featured ▾</span>
          <ul className={style.dropdownMenu}>
            <li>
              <NavLink 
                to="/add-featured" 
                className={({ isActive }) => `${style.dropdownLink} ${isActive ? style.activeDropdown : ""}`}
                onClick={closeMenu}
              >
                Add New
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/edit-featured" 
                className={({ isActive }) => `${style.dropdownLink} ${isActive ? style.activeDropdown : ""}`}
                onClick={closeMenu}
              >
                Manage Existing
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
