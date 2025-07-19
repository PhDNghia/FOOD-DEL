import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add/Add";
import { Routes, Route } from "react-router-dom";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UpdateFood from "./components/UpdateFood/UpdateFood";
import User from "./pages/User/User";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [foodToEdit, setFoodToEdit] = useState(null);

  const openPopup = (food) => {
    setFoodToEdit(food);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setFoodToEdit(null);
  };

  return (
    <>
      {showPopup ? (
        <UpdateFood food={foodToEdit} closePopup={closePopup} />
      ) : (
        <></>
      )}
      <div>
        <ToastContainer />
        <Navbar />
        <hr />
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/" element={<List openPopup={openPopup} />} />
            <Route path="/add" element={<Add />}></Route>
            <Route
              path="/list"
              element={<List openPopup={openPopup} />}
            ></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/user" element={<User />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
