import React from "react";
import Robot from "../assets/robot.gif";

const Message = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-40  w-screen">
      <img src={Robot} alt="Robot-Logo" className="w-40 h-40" />
      <h1 className="text-white text-xl">Welcome to Snappy Chat</h1>
      <h3 className="text-white ">Please select a chat to Start Message</h3>
    </div>
  );
};

export default Message;
