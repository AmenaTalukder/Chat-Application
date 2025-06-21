import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
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
      navigate("/login");
    }
  }, [navigate]);

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username.length < 3) {
      toast.error(
        "Username should be at least 3 characters long",
        toastOptions
      );
      return false;
    } else if (!emailPattern.test(email)) {
      toast.error("Invalid email address", toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error(
        "Password should be at least 6 characters long",
        toastOptions
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Confirm Password should match with Password", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!handleValidation()) {
      toast.error("Validation failed. Please check your input.", toastOptions);
      return;
    }
    try {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password
      });

      console.log("Register Route:", registerRoute);

      if (!data.status) {
        toast.error(data.msg || "Failed to register", toastOptions);
      }
      toast.success("Account created successfully!", toastOptions);
      localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      setTimeout(() => {
        navigate("/setAvatar");
      }, 1000);
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response) {
        toast.error(
          error.response.data?.message || "Server error!",
          toastOptions
        );
      } else if (error.request) {
        toast.error(
          "No response from the server. Please try again later.",
          toastOptions
        );
      } else {
        toast.error("An error occurred. Please try again.", toastOptions);
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
            type="email"
            name="email"
            placeholder="Enter your email"
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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
            className={inputStyle}
          />
          <div className=" flex flex-row justify-between">
            <button
              type="submit"
              className="bg-purple-500 px-4 py-2 rounded-lg text-white hover:bg-purple-600 hover:shadow-md transition duration-300 transform hover:scale-105"
            >
              User Account
            </button>

            <button
              type="submit"
              className="bg-purple-500 px-4 py-2 rounded-lg text-white hover:bg-purple-600 hover:shadow-md transition duration-300 transform hover:scale-105"
            >
              Admin Account
            </button>
          </div>
          <div className="text-center mt-3">
            <span className="text-white text-md">
              Already have an account?
              <Link
                to="/login"
                className="text-purple-400 hover:underline font-mono ml-1"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
