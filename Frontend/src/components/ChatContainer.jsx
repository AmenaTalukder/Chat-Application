import React from "react";
import ConversationPage from "./ConversationPage";
import Setting from "./Setting";

const ChatContainer = ({ currentChat }) => {
  return (
    <>
      {currentChat && (
        <div className="flex-1 flex flex-col w-screen h-screen">
          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-10 rounded-full"
                src={`data:image/svg+xml;base64, ${currentChat.avatarImage}`}
                alt="avatar"
              />
              <h3 className="text-lg font-semibold text-white">
                Chat with {currentChat?.username}
              </h3>
            </div>

            <div className="absolute right-11 ">
              <Setting className="w-4 h-4 cursor-pointer text-white" />
            </div>
          </div>
          {/* conversation page */}
          <ConversationPage />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
