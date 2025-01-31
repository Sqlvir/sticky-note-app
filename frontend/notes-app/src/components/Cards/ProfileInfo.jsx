import React from 'react'
import { getAvatarColor, getInitials, preventBackNavigation } from '../../utils/helper'


const ProfileInfo = ({ userInfo, onLogout }) => {
  const handleLogout = () => {
    preventBackNavigation();
    onLogout();
  };

  return (
    userInfo && <div className='flex items-center gap-3'>
      <>
        <div className={`w-10 h-10 rounded-full ${getAvatarColor(userInfo.fullName)} flex items-center justify-center text-white hover:shadow-md transition-all ease-in-out font-medium cursor-pointer`}>
        {getInitials(userInfo?.fullName)}
        </div>
        <div>
          <p className='text-sm font-medium'>{userInfo.fullName}</p>
          <button className='text-sm text-slate-900 font-medium primary-logout' onClick={handleLogout}>LogOut</button>
        </div>
      </>
    </div>
  );  
};

export default ProfileInfo
