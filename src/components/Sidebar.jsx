import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Sidebar({ setShowSearch, isMobile, sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('home');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveItem('home');
    else if (path === '/profile') setActiveItem('profile');
    else if (path === '/search') setActiveItem('search');
    else setActiveItem('home');
  }, [location.pathname]);

  const handleNavClick = (item) => {
    setActiveItem(item.id);
    item.onClick?.();
    if (isMobile && setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const menuItems = [
    { 
      id: 'home', 
      icon: 'bi-house-door', 
      label: 'Home', 
      onClick: () => navigate('/') 
    },
    { 
      id: 'search', 
      icon: 'bi-search', 
      label: 'Search', 
      onClick: () => {
        setShowSearch(true);
        if (isMobile && setSidebarOpen) {
          setSidebarOpen(false);
        }
      } 
    },
    { 
      id: 'explore', 
      icon: 'bi-compass', 
      label: 'Explore',
      onClick: () => {
        console.log('Explore clicked');
        if (isMobile && setSidebarOpen) {
          setSidebarOpen(false);
        }
      }
    },
    { 
      id: 'reels', 
      icon: 'bi-play-circle', 
      label: 'Reels',
      onClick: () => {
        console.log('Reels clicked');
        if (isMobile && setSidebarOpen) {
          setSidebarOpen(false);
        }
      }
    },
    { 
      id: 'messages', 
      icon: 'bi-chat-dots', 
      label: 'Messages',
      onClick: () => {
        console.log('Messages clicked');
        if (isMobile && setSidebarOpen) {
          setSidebarOpen(false);
        }
      }
    },
    { 
      id: 'notifications', 
      icon: 'bi-heart', 
      label: 'Notifications',
      onClick: () => {
        console.log('Notifications clicked');
        if (isMobile && setSidebarOpen) {
          setSidebarOpen(false);
        }
      }
    },
    { 
      id: 'create', 
      icon: 'bi-plus-square', 
      label: 'Create',
      onClick: () => {
        console.log('Create clicked');
        if (isMobile && setSidebarOpen) {
          setSidebarOpen(false);
        }
      }
    },
    { 
      id: 'profile', 
      icon: 'bi-person-circle', 
      label: 'Profile', 
      onClick: () => {
        navigate('/profile');
        if (isMobile && setSidebarOpen) {
          setSidebarOpen(false);
        }
      } 
    },
  ];

  const bottomItems = [
    { 
      id: 'threads', 
      icon: 'bi-threads', 
      label: 'Threads',
      onClick: () => {
        console.log('Threads clicked');
        if (isMobile && setSidebarOpen) {
          setSidebarOpen(false);
        }
      }
    },
    { 
      id: 'more', 
      icon: 'bi-list', 
      label: 'More',
      onClick: () => {
        console.log('More clicked');
        if (isMobile && setSidebarOpen) {
          setSidebarOpen(false);
        }
      }
    },
  ];

  return (
    <>
      <style>{`
        /* Base Styles */
        .sidebar-container {
          height: 100vh;
          background: #ffffff;
          border-right: 1px solid #dbdbdb;
          z-index: 1000;
          overflow-x: hidden;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        /* Desktop Sidebar */
        .sidebar-desktop {
          width: 244px;
          padding: 0 12px;
        }

        /* Mobile/Tablet Sidebar */
        .sidebar-mobile {
          width: 72px;
          padding: 0 8px;
          transition: transform 0.3s ease;
        }

        .sidebar-mobile.closed {
          transform: translateX(-100%);
        }

        .sidebar-mobile.open {
          transform: translateX(0);
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.1);
        }

        /* Logo */
        .logo-container {
          padding: 32px 0 28px;
          border-bottom: 1px solid #dbdbdb;
          margin-bottom: 20px;
        }

        .logo-desktop {
          width: 103px;
          height: 29px;
          margin-left: 12px;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .logo-desktop:hover {
          opacity: 0.8;
        }

        .logo-mobile {
          width: 24px;
          height: 24px;
          margin: 0 auto;
          cursor: pointer;
        }

        /* Menu Items */
        .menu-items {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          color: inherit;
        }

        .menu-item:hover {
          background: #fafafa;
          transform: translateX(2px);
        }

        .menu-item.active {
          background: #fafafa;
          font-weight: 600;
        }

        .menu-item.active .menu-icon {
          transform: scale(1.1);
        }

        .menu-icon {
          font-size: 24px;
          transition: transform 0.2s ease;
          color: #262626;
        }

        .menu-item.active .menu-icon {
          color: #262626;
        }

        .menu-label {
          margin-left: 16px;
          font-size: 16px;
          color: #262626;
          white-space: nowrap;
          transition: all 0.3s ease;
        }

        /* Hide labels on mobile when sidebar is collapsed */
        .sidebar-mobile:not(.open) .menu-label {
          display: none;
        }

        /* Bottom Menu */
        .bottom-menu {
          padding: 20px 0;
          border-top: 1px solid #dbdbdb;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* Responsive Breakpoints */
        
        /* 320px - Extra Small Phones */
        @media (max-width: 320px) {
          .sidebar-mobile {
            width: 64px;
            padding: 0 4px;
          }
          
          .menu-item {
            padding: 10px;
            border-radius: 10px;
          }
          
          .menu-icon {
            font-size: 22px;
          }
          
          .logo-container {
            padding: 24px 0 20px;
          }
          
          .logo-mobile {
            width: 22px;
            height: 22px;
          }
        }

        /* 375px - Small Phones */
        @media (min-width: 321px) and (max-width: 375px) {
          .sidebar-mobile {
            width: 68px;
          }
        }

        /* 425px - Medium Phones */
        @media (min-width: 376px) and (max-width: 425px) {
          .sidebar-mobile {
            width: 72px;
          }
        }

        /* 768px - Tablets */
        @media (min-width: 768px) and (max-width: 1023px) {
          .sidebar-desktop {
            width: 220px;
            padding: 0 16px;
          }
          
          .menu-label {
            font-size: 15px;
          }
          
          .menu-icon {
            font-size: 22px;
          }
          
          .logo-desktop {
            width: 96px;
            height: 27px;
          }
        }

        /* 1024px - Small Laptops */
        @media (min-width: 1024px) and (max-width: 1439px) {
          .sidebar-desktop {
            width: 244px;
            padding: 0 20px;
          }
          
          .menu-label {
            font-size: 16px;
          }
        }

        /* 1440px - Large Laptops & Desktops */
        @media (min-width: 1440px) and (max-width: 2559px) {
          .sidebar-desktop {
            width: 280px;
            padding: 0 24px;
          }
          
          .menu-label {
            font-size: 17px;
            margin-left: 20px;
          }
          
          .menu-icon {
            font-size: 26px;
          }
          
          .menu-item {
            padding: 14px 12px;
            border-radius: 14px;
          }
          
          .logo-desktop {
            width: 120px;
            height: 34px;
            margin-left: 16px;
          }
          
          .logo-container {
            padding: 40px 0 32px;
          }
          
          .menu-items {
            gap: 10px;
          }
        }

        /* 2560px - 4K Screens */
        @media (min-width: 2560px) {
          .sidebar-desktop {
            width: 320px;
            padding: 0 32px;
          }
          
          .menu-label {
            font-size: 20px;
            margin-left: 24px;
          }
          
          .menu-icon {
            font-size: 30px;
          }
          
          .menu-item {
            padding: 18px 16px;
            border-radius: 16px;
            margin-bottom: 4px;
          }
          
          .logo-desktop {
            width: 140px;
            height: 40px;
            margin-left: 20px;
          }
          
          .logo-container {
            padding: 48px 0 40px;
          }
          
          .menu-items {
            gap: 12px;
          }
          
          .bottom-menu {
            padding: 32px 0;
          }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          .sidebar-container {
            background: #000000;
            border-right-color: #262626;
          }
          
          .logo-container {
            border-bottom-color: #262626;
          }
          
          .menu-item:hover {
            background: #1a1a1a;
          }
          
          .menu-item.active {
            background: #1a1a1a;
          }
          
          .menu-icon {
            color: #f5f5f5;
          }
          
          .menu-label {
            color: #f5f5f5;
          }
          
          .bottom-menu {
            border-top-color: #262626;
          }
        }

        /* Accessibility */
        .menu-item:focus {
          outline: 2px solid #0095f6;
          outline-offset: 2px;
        }

        /* Smooth transitions for sidebar */
        .sidebar-container {
          transition: width 0.3s ease, transform 0.3s ease;
        }

        /* Hide scrollbar but keep functionality */
        .sidebar-container::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar-container::-webkit-scrollbar-thumb {
          background: #dbdbdb;
          border-radius: 4px;
        }

        @media (prefers-color-scheme: dark) {
          .sidebar-container::-webkit-scrollbar-thumb {
            background: #363636;
          }
        }

        /* Animation for menu items */
        .menu-item {
          animation: slideIn 0.3s ease-out;
          animation-fill-mode: both;
        }

        .menu-item:nth-child(1) { animation-delay: 0.1s; }
        .menu-item:nth-child(2) { animation-delay: 0.15s; }
        .menu-item:nth-child(3) { animation-delay: 0.2s; }
        .menu-item:nth-child(4) { animation-delay: 0.25s; }
        .menu-item:nth-child(5) { animation-delay: 0.3s; }
        .menu-item:nth-child(6) { animation-delay: 0.35s; }
        .menu-item:nth-child(7) { animation-delay: 0.4s; }
        .menu-item:nth-child(8) { animation-delay: 0.45s; }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Sidebar Container */}
      <div 
        className={`sidebar-container ${
          isMobile 
            ? `sidebar-mobile ${sidebarOpen ? 'open' : 'closed'}` 
            : 'sidebar-desktop'
        }`}
      >
        {/* Logo */}
        <div className="logo-container">
          {isMobile ? (
            <div 
              className="logo-mobile" 
              onClick={() => {
                navigate('/');
                if (isMobile && setSidebarOpen) {
                  setSidebarOpen(false);
                }
              }}
              aria-label="Instagram Home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
          ) : (
            <img 
              className="logo-desktop" 
              src="/assets/Instagram_text.png" 
              alt="Instagram"
              onClick={() => navigate('/')}
            />
          )}
        </div>

        {/* Main Menu Items */}
        <div className="menu-items">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleNavClick(item);
                }
              }}
              aria-label={item.label}
            >
              <i className={`bi ${item.icon}${activeItem === item.id ? '-fill' : ''} menu-icon`}></i>
              <span className="menu-label">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom Menu Items */}
        <div className="bottom-menu">
          {bottomItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
              role="button"
              tabIndex={0}
              aria-label={item.label}
            >
              <i className={`bi ${item.icon} menu-icon`}></i>
              <span className="menu-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;