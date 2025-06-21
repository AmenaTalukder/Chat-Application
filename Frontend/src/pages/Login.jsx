import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  useEffect(() => {
    if (localStorage.getItem("current-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleValidation = () => {
    const { username, password } = values;
    if (!username.trim()) {
      toast.error("Username cannot be empty or spaces only!", toastOptions);
      return false;
    } else if (!password.trim()) {
      toast.error("Password cannot be empty or spaces only!", toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;

      try {
        const { data } = await axios.post(loginRoute, {
          username,
          password
        });

        if (!data.status) {
          toast.error(data.msg || "Login failed. Try again.", toastOptions);
          return;
        }
        if (data.status) {
          toast.success("Login successful!", toastOptions);
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        }
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (error) {
        console.error("Login error:", error.response || error.message);
        toast.error("An error occurred. Please try again later.", toastOptions);
      }
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const inputStyle =
    "w-full p-3 rounded-lg bg-transparent border-purple-700 border-2 mb-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white";

  return (
    <div className="flex items-center justify-center m-auto bg-slate-300 w-full h-screen">
      <ToastContainer />
      <div className="bg-slate-800 w-96 p-8 rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full max-w-md space-y-4"
        >
          <div className="flex flex-row items-center justify-center gap-2 mb-4">
            <img src={Logo} alt="logo" className="h-10" />
            <h1 className="text-2xl font-bold text-center text-white">
              Snappy Chat
            </h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Enter your name"
            onChange={handleChange}
            className={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className={inputStyle}
          />
          <button
            type="submit"
            className="bg-purple-500 px-4 py-2 rounded-lg text-white hover:bg-purple-600 hover:shadow-md transition duration-300 transform hover:scale-110"
          >
            Log In
          </button>
          <div className="text-center mt-3">
            <span className="text-white text-md">
              Don't have an account?
              <Link
                to="/register"
                className="text-purple-400 hover:underline font-mono ml-1"
              >
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
