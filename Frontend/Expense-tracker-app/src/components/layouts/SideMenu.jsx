import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/UserContext';
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20'>
      {/* User Avatar */}
      <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className='w-20 h-20 bg-slate-400 rounded-full'
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width='w-20'
            height='h-20'
            style='text-xl'
          />
        )}
        <h5 className='text-gray-950 font-medium'>{user?.fullName || ""}</h5>
      </div>

      {/* Menu Items */}
      {SIDE_MENU_DATA.map((item, index) => {
        const isActive = activeMenu === item.label;
        return (
          <button
            key={`menu_${index}`}
            type="button"
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition ${
              isActive
                ? "text-white bg-purple-500"
                : "text-gray-700 hover:bg-purple-100"
            }`}
            onClick={() => handleClick(item.path)}
            aria-current={isActive ? 'page' : undefined}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default SideMenu;
