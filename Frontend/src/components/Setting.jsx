import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaKey } from "react-icons/fa6";
import { GrStorage } from "react-icons/gr";
import { BsChatHeartFill } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const Setting = () => {
  const navigate = useNavigate();

  const [showLogout, setShowLogout] = useState(false);
  const handleIconClick = () => {
    setShowLogout(!showLogout);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const iconStyle =
    "p-1 bg-slate-500 hover:text-gray-300 rounded text-white h-10 w-10";
  const iconDivStyle =
    "flex items-center justify-start gap-2 bg-white ml-2 rounded-lg w-full hover:bg-slate-400 transition duration-300 transform hover:scale-105 mb-1 ml-2";

  return (
    <div className="relative ">
      {/* Settings Icon */}
      <IoSettingsOutline
        className="text-white w-8 h-8 cursor-pointer "
        onClick={handleIconClick}
        aria-label="Settings"
      />

      {/* Sliding Panel */}
      <div
        className={`fixed bottom-16 right-1 h-80 w-80 p-6 bg-gray-700 shadow-lg transition-transform duration-300 rounded-lg  ${
          showLogout ? "translate-x-0" : "translate-x-full"
        } w-64 flex flex-col items-center justify-start pt-10 border border-gray-600`}
      >
        {/* Logout Icon */}
        <div className={iconDivStyle} onClick={handleLogout}>
          <button>
            <FaPowerOff className={iconStyle} />
          </button>
          <span className="text-black text-lg font-medium">Log Out</span>
        </div>
        {/* Notification */}
        <div className={iconDivStyle}>
          <button>
            <IoNotificationsSharp className={iconStyle} />
          </button>
          <span className="text-black text-lg font-medium">Notification</span>
        </div>
        {/* Change Password */}
        <div className={iconDivStyle}>
          <button>
            <FaKey className={iconStyle} />
          </button>
          <span className="text-black text-lg font-medium">
            Change password
          </span>
        </div>
        {/* Messages */}
        <div className={iconDivStyle}>
          <button>
            <BsChatHeartFill className={iconStyle} />
          </button>
          <span className="text-black text-lg font-medium">Message</span>
        </div>
        {/* Storage */}
        <div className={iconDivStyle}>
          <button>
            <GrStorage className={iconStyle} />
          </button>
          <span className="text-black text-lg font-medium">Storage</span>
        </div>

        <div className="flex flex-row gap-2 mt-4">
          <img src={Logo} alt="" className="w-6 h-6" />
          <h1 className="text-white text-xl ">Snappy Chat</h1>
        </div>
      </div>
    </div>
  );
};

export default Setting;
