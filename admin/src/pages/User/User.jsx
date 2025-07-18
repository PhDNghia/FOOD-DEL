import React from "react";
import "./User.css";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const User = () => {
  const { url } = useContext(StoreContext);
  const [dataUser, setDataUser] = useState([]);

  const fetchListUser = async () => {
    const response = await axios.get(url + "/api/user/list");

    if (response.data.success) {
      setDataUser(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const setUserAdmin = async (id) => {
    const response = await axios.post(url + "/api/user/updatead", {
      id: id,
    });
    await fetchListUser();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  const removeUser = async (id) => {
    const response = await axios.post(url + "/api/user/remove", { id: id });
    await fetchListUser();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchListUser();
  }, []);

  return (
    <div className="user add flex-col">
      <h4>All Users List</h4>
      <div className="user-table">
        <div className="user-table-format title">
          <p>Number</p>
          <p>Name User</p>
          <p>Email</p>
          <p>Password</p>
          <p>Admin</p>
          <p>Action</p>
        </div>
        {dataUser.map((item, index) => {
          return (
            <div className="user-table-format" key={index}>
              <p>{index + 1}</p>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p className="password">{item.password}</p>
              <button
                className={item.role === 1 ? "red" : "green"}
                onClick={() => setUserAdmin(item._id)}
              >
                {item.role === 1 ? "Admin" : "User"}
              </button>
              <button
                onClick={() => {
                  removeUser(item._id);
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default User;
