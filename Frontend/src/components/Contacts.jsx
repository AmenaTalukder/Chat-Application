import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import "../App.css";

const Contacts = ({ contacts, currentUser, currentChat }) => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentUserSelected, setCurrentUserSelected] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentUserSelected(index);
    currentChat(contact);
  };

  return (
    <div className="bg-slate-700 w-full h-full flex flex-col">
      {currentUserName && currentUserImage && (
        <>
          {/* Top Section */}
          <div className="flex items-center justify-center gap-2 py-4 shadow-lg w-full border-b border-gray-800">
            <img src={Logo} alt="logo" className="h-8 md:h-10" />
            <h3 className="text-white font-bold text-sm md:text-lg capitalize">
              Snappy Chat
            </h3>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto px-2 py-4 space-y-3 w-screen:md scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                onClick={() => changeCurrentChat(index, contact)}
                className={`contact flex items-center gap-2 p-2  w-full md:w-80 rounded-md cursor-pointer transition-all duration-200 ${
                  index === currentUserSelected
                    ? "bg-gray-600 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt="avatar"
                  className="h-8 w-8 rounded-full"
                />
                <h2 className="text-sm font-medium">{contact.username}</h2>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Contacts;
