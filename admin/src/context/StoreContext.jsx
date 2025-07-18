import React, { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [foodList, setFoodList] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
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
