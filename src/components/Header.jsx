import React from "react";
import logo from "../images/loffle_logo.svg";
import notification from "../images/notification.svg";
import menu from "../images/menu_btn.svg";

const Header = () => {
  return (
    <header className="shadow-md w-full h-14 sticky top-0 l-0 r-0 z-50 bg-white px-5">
      <div className="h-full flex items-center justify-between">
        <img className="h-6" src={logo} alt="logo" />
        <div className="flex">
          <img
            className="w-5 h-5"
            src={notification}
            alt="notification-button"
          />
          <img className="w-5 h-5 ml-6" src={menu} alt="menu-button" />
        </div>
      </div>
    </header>
  );
};

export default Header;
