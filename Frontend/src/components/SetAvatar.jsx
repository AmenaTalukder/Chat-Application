import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "../assets/loader.gif";
import axios from "axios";
import { Buffer } from "buffer";
import { avatarRouteUser } from "../utils/APIRoutes";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      try {
        for (let i = 1; i <= 5; i++) {
          const image = await axios.get(`${api}/${Math.random() * 1000}`);
          const buffer = Buffer.from(image.data);
          data.push(buffer.toString("base64"));
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        setAvatars(data);
      } catch (error) {
        toast.error("Failed to load avatars. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAvatars();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar.", toastOptions);
    } else {
      try {
        const user = JSON.parse(localStorage.getItem("chat-app-user"));
        const { data } = await axios.post(`${avatarRouteUser}/${user._id}`, {
          image: avatars[selectedAvatar]
        });
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("chat-app-user", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error("Failed to set avatar", toastOptions);
        }
      } catch (error) {
        toast.error("Error setting profile picture", toastOptions);
      }
    }
  };

  const buttonCss =
    "mt-4 confirm-button py-2 px-4 rounded-full border-purple-700 border-b-4 border-l-4 border-r-4 font-bold bg-purple-500 text-white hover:bg-purple-600 hover:shadow-md transition duration-300 transform hover:scale-110";

  return isLoading ? (
    <div className="loading-container flex flex-col items-center justify-center h-screen bg-slate-900">
      <img src={Loader} alt="Loading...." />
      <h2 className="text-lg mt-4 text-gray-600 font-bold">
        Loading Avatars...
      </h2>
    </div>
  ) : (
    <div className="bg-slate-800 w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-white text-center mb-16">
        Pick an avatar as your profile picture
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            onClick={() => setSelectedAvatar(index)}
            className={`cursor-pointer rounded-2xl p-2 border-4 ${
              selectedAvatar === index
                ? "border-purple-700"
                : "border-transparent"
            }`}
          >
            <img
              src={`data:image/svg+xml;base64,${avatar}`}
              alt={`Avatar ${index}`}
              className="h-32 w-32 rounded-md"
            />
          </div>
        ))}
      </div>
      <button
        className={buttonCss}
        onClick={setProfilePicture}
        disabled={isLoading}
      >
        Set as profile picture
      </button>
      <ToastContainer />
    </div>
  );
};

export default SetAvatar;
