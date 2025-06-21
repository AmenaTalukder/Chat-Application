import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Contacts from "../components/Contacts";
import { allUsersRoute } from "../utils/APIRoutes";
import axios from "axios";
import ChatContainer from "../components/ChatContainer";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser?.isAvatarImageSet) {
        try {
          const { data } = await axios.get(
            `${allUsersRoute}/${currentUser._id}`
          );
          setContacts(data.data);
        } catch (error) {
          console.error("Error fetching contacts:", error);
          alert("Failed to load contacts. Please try again later.");
        }
      } else if (currentUser) {
        navigate("/setAvatar");
      }
    };
    fetchContacts();
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("chat-app-user");
      if (!storedUser) {
        navigate("/login");
      } else {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        console.log("Current User:", parsedUser);
        setLoading(true);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="bg-slate-800 w-96 h-screen flex flex-row ">
      <div className=" h-screen">
        <Contacts
          contacts={contacts}
          currentUser={{
            currentUser,
            username: "Snappy",
            avatarImage: "..."
          }}
          currentChat={handleChatChange}
        />
      </div>
      <div className="h-screen  bg-slate-800">
        <div className=" flex items-center justify-center mt-5 ml-10">
          {loading ? (
            currentChat ? (
              <ChatContainer
                currentUser={currentUser}
                currentChat={currentChat}
              />
            ) : (
              <Message />
            )
          ) : (
            <p className="text-white">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
