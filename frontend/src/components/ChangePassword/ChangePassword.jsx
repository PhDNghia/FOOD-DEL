import React, { useEffect, useContext, useState } from "react";
import "./ChangePassword.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import Swal from "sweetalert2";

const ChangePassword = ({ setShowPassword }) => {
  const { token, url } = useContext(StoreContext); // Dùng context
  const [dataNew, setDataNew] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [data, setData] = useState("");

  const getUser = async () => {
    console.log(token);
    if (token) {
      const response = await axios.post(
        url + "api/user/finduser",
        {},
        { headers: { token } }
      );
      if (response.data.data) {
        setData(response.data.data);
      }
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDataNew((dataNew) => ({ ...dataNew, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const dataSubmit = {
      oldPassword: dataNew.oldPassword,
      newPassword: dataNew.newPassword,
      confirmPassword: dataNew.confirmPassword,
    };

    try {
      console.log(token);

      const response = await axios.post(
        url + `api/user/changePassword`,
        dataSubmit,
        {
          headers: { token: token },
        }
      );
      setShowPassword(false);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message,
        showConfirmButton: true,
      });
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error", 
          title: "Error!",
          text: error.response.data.message, 
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An error occurred",
          showConfirmButton: true,
        });
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="password-popup">
      <form onSubmit={onSubmitHandler} className="password-popup-container">
        <div className="password-popup-title">
          <h2>Change Your Password</h2>

          <img
            onClick={() => setShowPassword(false)}
            src={assets.cross_icon}
            alt=""
          />
          <p>Welcome {data.name} !</p>
        </div>
        <div className="password-popup-inputs">
          <input value={data.email} readOnly name="email"></input>
          <input
            name="oldPassword"
            onChange={onChangeHandler}
            value={dataNew.oldPassword}
            type="text"
            placeholder="Your current password"
            required
            minLength={8}
          />
          <input
            name="newPassword"
            onChange={onChangeHandler}
            value={dataNew.newPassword}
            type="text"
            placeholder="Your new password"
            required
            minLength={8}
          />
          <input
            name="confirmPassword"
            onChange={onChangeHandler}
            value={dataNew.confirmPassword}
            type="text"
            placeholder="Comfirm your password"
            required
            minLength={8}
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
