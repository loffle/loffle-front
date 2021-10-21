import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//
import logo from '../images/loffle_logo.svg';
import notification from '../images/notification.svg';
import menu from '../images/menu_btn.svg';
//
import Drawer from '../components/Drawer.jsx';

const Header = () => {
  const [isDrawerModalOn, setIsDrawerModalOn] = useState(false);

  const handleDrawerModal = (e) => {
    setIsDrawerModalOn(!isDrawerModalOn);
    isDrawerModalOn //모달 켜져있을 시 스크롤 방지
      ? (document.body.style.overflow = 'unset')
      : (document.body.style.overflow = 'hidden');
  };

  return (
    <>
      {isDrawerModalOn && (
        <Drawer logo={logo} handleDrawerModal={handleDrawerModal} />
      )}
      <header className="shadow-md w-full h-14 sticky top-0 l-0 r-0 z-30 bg-white px-5">
        <div className="h-full flex items-center justify-between">
          <Link to={'/'}>
            <img className="h-6" src={logo} alt="logo" />
          </Link>
          <div className="flex">
            <img
              className="w-5 h-5"
              src={notification}
              alt="notification-button"
            />
            <button onClick={() => handleDrawerModal()}>
              <img className="w-5 h-5 ml-6" src={menu} alt="menu-button" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
