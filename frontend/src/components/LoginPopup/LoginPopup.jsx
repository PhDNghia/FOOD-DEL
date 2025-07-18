import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { setToken, url } = useContext(StoreContext); // Dùng context

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    let newUrl = url;
    if (currState === "Login") {
      newUrl += "api/user/login";
    } else {
      newUrl += "api/user/register";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      // Lưu thông tin vào localStorage và cập nhật context
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Cập nhật giá trị vào StoreContext
      setToken(response.data.token);

      const role = localStorage.getItem("role");
      const token = localStorage.getItem("token");
      if (role === "1") {
        window.location.href = `http://localhost:5174?token=${token}`;
        // fetch("http://localhost:5174", {
        //   method: "GET", // hoặc POST tùy vào API
        //   headers: {
        //     Authorization: { token },
        //     "Content-Type": "application/json",
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log("Success:", data);
        //     // Sau khi hoàn thành yêu cầu, thực hiện điều hướng trang
        //     window.location.href = "http://localhost:5174";
        //   })
        //   .catch((error) => {
        //     console.log("Error:", error);
        //   });
      } else if (role === "2") {
        window.location.href = "http://localhost:5173/";
      }
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
          />
        </div>
        <button type="submit">
          {currState === "Signup" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By coutinuing, i agree to the terms of use $ privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Signup")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};
export default LoginPopup;
