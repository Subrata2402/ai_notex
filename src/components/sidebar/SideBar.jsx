import React from 'react';
import './SideBar.scss';
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { Link, useLocation } from 'react-router-dom';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useTheme } from '../../store/ThemeContext';

function SideBar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='sidebar-wrapper'>
      <div className="ai-header">
        <img src="logo.svg" alt="logo" />
        <h4 className="title m-0">Ai Notes</h4>
      </div>
      <div className="devider"></div>
      <div className="sidebar-items">
        <Link
          className={`sidebar-item ${(location.pathname === '/' || location.pathname === '/add-notes' ? 'active' : '')}`}
          to='/'
        >
          {
            location.pathname === '/' || location.pathname === '/add-notes'
              ? <GoHomeFill color='var(--nav-item-color)' className='icon' />
              : <GoHome color='var(--nav-item-color)' className='icon' />
          }
          <div className="text">
            Home
          </div>
        </Link>
        <Link
          className={`sidebar-item ${(location.pathname === '/favourites' ? 'active' : '')}`}
          to='/favourites'
        >
          {
            location.pathname === '/favourites'
              ?
              <FaStar color='var(--nav-item-color)' className='icon' />
              : <FaRegStar color='var(--nav-item-color)' className='icon' />
          }
          <div className="text">
            Favourites
          </div>
        </Link>
        <div className="devider"></div>
        <div className="sidebar-item" onClick={toggleTheme}>
          {
            theme === 'dark'
              ? <MdDarkMode color='var(--nav-item-color)' className='icon' />
              : <MdLightMode color='var(--nav-item-color)' className='icon' />
          }
          <div className="text">
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </div>
        </div>
      </div>
      <div className="profile-section">
        <div className="profile-avatar">G</div>
        <div className="profile-name">Guest User</div>
        <IoIosArrowDown color='var(--nav-item-color)' className='arrow-icon' />
      </div>
    </div>
  )
};

export default SideBar;