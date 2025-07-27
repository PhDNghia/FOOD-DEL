import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);

  const [cartItems, setCartItems] = useState({});

  const url = "http://localhost:4000/";

  const [token, setToken] = useState(localStorage.getItem("token"));

  const addToCart = async (itemId) => {
    if (!cartItems && cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  //sum money food
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // count quantity custumer choose food
  const countFood = () => {
    let count = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        count += cartItems[item] - cartItems[item] + 1;
      }
    }
    return count;
  };

  //take list food from database
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.data) {
        setCartItems(response.data.data);
      } else {
        console.log("No cart data available.");
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to load cart data:", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      if (token) {
        await loadCartData(token);
      } else {
        console.error("Token or role is missing!");
      }
    }
    loadData();
  }, []);

  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    countFood,
    url,
    token,
    setToken,
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
