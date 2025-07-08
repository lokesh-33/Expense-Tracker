import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className='min-h-screen'>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className='flex'>
          {/*
            This div contains the SideMenu for large screens only.
            'hidden' hides it by default on small screens.
            'lg:block' makes it visible (display: block) on large screens.
          */}
          <div className='hidden lg:block w-64 border-r border-gray-200'>
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Page content */}
          <div className='flex-1 px-5 py-5'>{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
