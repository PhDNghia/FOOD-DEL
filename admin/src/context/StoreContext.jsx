import React, { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const navigate = useNavigate();
  const url = "http://localhost:4000";
  const [foodList, setFoodList] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.replace("http://localhost:5173/");
  };

  const fetchList = async () => {
    const response = await axios.get(url + "/api/food/list");
    if (response.data.success) {
      setFoodList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const role = params.get("role");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      navigate("/list");
    }
  }, []);

  const contextValue = {
    fetchList,
    foodList,
    url,
    logout,
  };

  return (
    <div>
      <StoreContext.Provider value={contextValue}>
        {props.children}
      </StoreContext.Provider>
    </div>
  );
};

export default StoreContextProvider;
