import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import Suggestions from './components/Suggestions'
import Search from './components/Search'

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 769 && width < 1024);

      // Close sidebar on resize to larger screens
      if (width >= 769 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [sidebarOpen]);

  const handleCloseSearch = () => {
    setShowSearch(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <style>{`
        /* Base Styles */

        .app-container {
          min-height: 100vh;
          display: flex;
          transition: all 0.3s ease;
          position: relative;
        }

        /* Mobile Toggle Button */
        .mobile-toggle-btn {
          position: absolute;
          top: 16px;
          left: 16px;
          width: 40px;
          height: 40px;
          background: #ffffff;
          border: 1px solid #dbdbdb;
          border-radius: 50%;
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 1001;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .mobile-toggle-btn:hover {
          background: #f8f9fa;
        }

        .mobile-toggle-btn i,
        .mobile-toggle-btn svg {
          font-size: 20px;
          color: #262626;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        /* Sidebar Overlay for Mobile */
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
          display: none;
          animation: fadeIn 0.3s ease;
        }

        .sidebar-overlay.active {
          display: block;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Layout Sections */
        .sidebar-section {
          flex-shrink: 0;
          transition: all 0.3s ease;
          height: 100vh;
          position: sticky;
          top: 0;
        }

        .feed-section {
          flex: 1;
          min-width: 0;
          transition: all 0.3s ease;
        }

        .suggestions-section {
          flex-shrink: 0;
          transition: all 0.3s ease;
          height: 100vh;
         
          top: 0;
          
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #000000;
          }
          
          .mobile-toggle-btn {
            background: #121212;
            border-color: #262626;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          }
          
          .mobile-toggle-btn:hover {
            background: #1a1a1a;
          }
          
          .mobile-toggle-btn i {
            color: #f5f5f5;
          }
          
          .sidebar-overlay {
            background: rgba(0, 0, 0, 0.7);
          }
        }

        /* Responsive Breakpoints */
        
        /* 320px - Extra Small Phones */
        @media (max-width: 320px) {
          .app-container {
            flex-direction: column;
          }
          
          .mobile-toggle-btn {
            display: flex;
            top: 12px;
            left: 12px;
            width: 36px;
            height: 36px;
          }
          
          .mobile-toggle-btn i {
            font-size: 18px;
          }
          
          .sidebar-section {
            position: fixed;
            left: -100%;
            top: 0;
            bottom: 0;
            width: 280px;
            z-index: 999;
            background: #ffffff;
            box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
            transition: left 0.3s ease;
            height: 100vh;
          }
          
          .sidebar-section.open {
            left: 0;
          }
          
          .feed-section {
            width: 100% !important;
            padding: 60px 12px 20px 12px;
            min-height: 100vh;
          }
          
          .suggestions-section {
            display: none;
          }
        }

        /* 375px - Small Phones */
        @media (min-width: 321px) and (max-width: 375px) {
          .app-container {
            flex-direction: column;
          }
          
          .mobile-toggle-btn {
            display: flex;
            top: 14px;
            left: 14px;
            width: 38px;
            height: 38px;
          }
          
          .sidebar-section {
            position: fixed;
            left: -100%;
            top: 0;
            bottom: 0;
            width: 300px;
            z-index: 999;
            background: #ffffff;
            box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
            transition: left 0.3s ease;
            height: 100vh;
          }
          
          .sidebar-section.open {
            left: 0;
          }
          
          .feed-section {
            width: 100% !important;
            padding: 60px 16px 20px 16px;
            min-height: 100vh;
          }
          
          .suggestions-section {
            display: none;
          }
        }

        /* 425px - Medium Phones */
        @media (min-width: 376px) and (max-width: 425px) {
          .app-container {
            flex-direction: column;
          }
          
          .mobile-toggle-btn {
            display: flex;
            top: 16px;
            left: 16px;
          }
          
          .sidebar-section {
            position: fixed;
            left: -100%;
            top: 0;
            bottom: 0;
            width: 320px;
            z-index: 999;
            background: #ffffff;
            box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
            transition: left 0.3s ease;
            height: 100vh;
          }
          
          .sidebar-section.open {
            left: 0;
          }
          
          .feed-section {
            width: 100% !important;
            padding: 60px 20px 20px 20px;
            min-height: 100vh;
            max-width: 425px;
            margin: 0 auto;
          }
          
          .suggestions-section {
            display: none;
          }
        }

        /* 768px - Tablets (Portrait) */
        @media (min-width: 426px) and (max-width: 767px) {
          .app-container {
            flex-direction: row;
          }

          .mobile-toggle-btn {
            display: flex;
          }

          .sidebar-section {
            position: fixed;
            left: -100%;
            top: 0;
            bottom: 0;
            width: 240px;
            z-index: 999;
            background: #ffffff;
            box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
            transition: left 0.3s ease;
            height: 100vh;
          }

          .sidebar-section.open {
            left: 0;
          }

          .feed-section {
            width: 100% !important;
            padding: 0;
            min-height: 100vh;
            margin-left: 0;
          }

          .suggestions-section {
            display: none;
          }
        }

        /* 768px - Specific breakpoint to keep sidebar visible */
        @media (min-width: 768px) and (max-width: 768px) {
          .app-container {
            flex-direction: row;
            padding-left: 240px;
          }

          .mobile-toggle-btn {
            display: none;
          }

          .sidebar-section {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            width: 240px;
            background: #ffffff;
            box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
            z-index: 100;
            height: 100vh;
          }

          .feed-section {
            width: 100% !important;
            padding: 32px 24px;
            min-height: 100vh;
            max-width: 630px;
            margin: 0 auto;
          }

          .suggestions-section {
            display: none;
          }
        }

        /* 769px - 1023px (Tablets Landscape / Small Laptops) */
        @media (min-width: 769px) and (max-width: 1023px) {
          .app-container {
            flex-direction: row;
            padding-left: 240px;
          }
          
          .mobile-toggle-btn {
            display: none;
          }
          
          .sidebar-section {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            width: 240px;
            background: #ffffff;
            box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
            z-index: 100;
            height: 100vh;
          }
          
          .feed-section {
            width: 100% !important;
            padding: 32px 24px;
            min-height: 100vh;
            max-width: 630px;
            margin: 0 auto;
          }
          
          .suggestions-section {
            display: none;
          }
        }

        /* 1024px - 1439px (Laptops & Small Desktops) */
        @media (min-width: 1024px) and (max-width: 1439px) {
          .app-container {
            flex-direction: row;
            padding: 0;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .mobile-toggle-btn {
            display: none;
          }
          
          .sidebar-section {
            width: 244px;
            flex-shrink: 0;
          }
          
          .feed-section {
            width: 100%;
            max-width: 630px;
            padding: 32px 24px;
            margin: 0 auto;
          }
          
          .suggestions-section {
            width: 350px;
            padding: 32px 0 32px 24px;
            flex-shrink: 0;
          }
        }

        /* 1440px - 2559px (Large Desktops) */
        @media (min-width: 1440px) and (max-width: 2559px) {
          .app-container {
            flex-direction: row;
            padding: 0;
            max-width: 1400px;
            margin: 0 auto;
          }
          
          .mobile-toggle-btn {
            display: none;
          }
          
          .sidebar-section {
            width: 280px;
            flex-shrink: 0;
          }
          
          .feed-section {
            width: 100%;
            max-width: 700px;
            padding: 40px 32px;
            margin: 0 auto;
          }
          
          .suggestions-section {
            width: 400px;
            padding: 40px 0 40px 32px;
            flex-shrink: 0;
          }
        }

        /* 2560px - 4K Screens */
        @media (min-width: 2560px) {
          .app-container {
            flex-direction: row;
            padding: 0;
            max-width: 1800px;
            margin: 0 auto;
          }
          
          .mobile-toggle-btn {
            display: none;
          }
          
          .sidebar-section {
            width: 320px;
            flex-shrink: 0;
          }
          
          .feed-section {
            width: 100%;
            max-width: 800px;
            padding: 60px 40px;
            margin: 0 auto;
          }
          
          .suggestions-section {
            width: 500px;
            padding: 60px 0 60px 40px;
            flex-shrink: 0;
          }
        }

        /* Search Overlay */
        .search-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 2000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 20px;
          animation: fadeIn 0.3s ease;
        }

        /* Accessibility */
        .mobile-toggle-btn:focus {
          outline: 2px solid #0095f6;
          outline-offset: 2px;
        }

        /* Smooth transitions */
        .app-container,
        .sidebar-section,
        .feed-section,
        .suggestions-section {
          transition: all 0.3s ease;
        }

        /* Utility Classes */
        .w-20 {
          width: 20%;
        }
        
        .w-50 {
          width: 50%;
        }
        
        .w-30 {
          width: 30%;
        }

        @media (max-width: 1023px) {
          .w-20,
          .w-50,
          .w-30 {
            width: auto;
          }
        }

        /* Hide scrollbar but keep functionality */
        .suggestions-section::-webkit-scrollbar {
          width: 4px;
        }

        .suggestions-section::-webkit-scrollbar-track {
          background: transparent;
        }

        .suggestions-section::-webkit-scrollbar-thumb {
          background: #dbdbdb;
          border-radius: 4px;
        }

        .suggestions-section::-webkit-scrollbar-thumb:hover {
          background: #b5b5b5;
        }

        @media (prefers-color-scheme: dark) {
          .suggestions-section::-webkit-scrollbar-thumb {
            background: #363636;
          }
          
          .suggestions-section::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        }

        /* Prevent horizontal scroll */
        body {
          overflow-x: hidden;
        }

        /* Loading State for Feed */
        .feed-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 20px;
        }

        .feed-loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #0095f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .feed-loading-text {
          color: #8e8e8e;
          font-size: 16px;
        }
      `}</style>

      {/* Mobile Toggle Button */}
      {(isMobile || isTablet) && (
        <button
          className="mobile-toggle-btn"
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <i className={`bi ${sidebarOpen ? 'bi-x' : 'bi-list'}`}></i>
        </button>
      )}

      {/* Sidebar Overlay for Mobile */}
      {(isMobile || isTablet) && sidebarOpen && (
        <div
          className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
          onClick={toggleSidebar}
          aria-label="Close sidebar"
          role="button"
          tabIndex={0}
        />
      )}

      <div className="app-container">
        {/* Sidebar Section */}
        <div className={`sidebar-section w-20 ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar
            setShowSearch={setShowSearch}
            isMobile={isMobile || isTablet}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Feed Section */}
        <div className="feed-section w-50">
          <Feed />
        </div>

        {/* Suggestions Section - Only visible on larger screens */}
        <div className="suggestions-section w-30">
          <Suggestions />
        </div>
      </div>

      {/* Search Overlay */}
      {showSearch && (
        <div className="search-overlay">
          <Search setShowSearch={setShowSearch} />
        </div>
      )}
    </>
  )
}

export default App