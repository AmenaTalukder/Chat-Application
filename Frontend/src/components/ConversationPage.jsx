import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import "../App.css";

const ConversationPage = ({ handleSendMsg }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiPickerToggle = () => {
    setShowPicker(!showPicker);
  };
  const onEmojiClick = (emojiData) => {
    if (emojiData?.emoji) {
      setMessage((prevMessage) => prevMessage + emojiData.emoji);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Message sent:", message);
      handleSendMsg(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-row items-center justify-center w-screen absolute bottom-2 z-50">
      <div>
        <BsEmojiSmileFill
          onClick={handleEmojiPickerToggle}
          className="w-8 h-6 text-white cursor-pointer hover:text-gray-300 transition duration-200 gap-2"
        />
        {showPicker && (
          <div className="absolute bottom-14 left-0 z-50 emoji ">
            <Picker
              onEmojiClick={onEmojiClick}
              className="custom-emoji-picker"
              style={{
                backgroundColor: "#4b5569",
                color: "#fff",
                borderRadius: "8px"
              }}
            />
          </div>
        )}
      </div>
      <form
        className="flex flex-1 items-center gap-2"
        onSubmit={(e) => handleSendMessage(e)}
      >
        <input
          type="text"
          className="bg-gray-700 text-white px-4 py-2 rounded-lg border-none focus:outline-none w-screen"
          placeholder="Type your message here..."
          style={{
            width: `66vw`
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-700 text-white rounded-lg text-2xl p-2 hover:text-gray-300 transition duration-200"
        >
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default ConversationPage;
