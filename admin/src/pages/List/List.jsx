import React, { useContext, useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const List = ({ openPopup }) => {
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const { foodList, fetchList, url } = useContext(StoreContext);

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Number</b>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {foodList.map((item, index) => {
          return (
            <div className="list-table-format" key={index}>
              <p>{index + 1}</p>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <div className="list-table-format-action">
                <p onClick={() => removeFood(item._id)} className="cursor">
                  Remove
                </p>
                <p
                  onClick={() => {
                    openPopup(item);
                  }}
                >
                  Edit
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
