import React, { useContext, useEffect, useState } from "react";
import "./UpdateFood.css";
import axios from "axios";
import { toast } from "react-toastify";
import { food_list } from "../../../../frontend/src/assets/assets";
import { StoreContext } from "../../context/StoreContext";

const UpdateFood = ({ closePopup, food }) => {
  const { url, fetchList } = useContext(StoreContext);
  const [updateFood, setUpdatedFood] = useState(food);
  const [image, setImage] = useState(null);

  const handlerChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setImage(file);
      setUpdatedFood({ ...updatedFood, image: file });
    } else {
      setUpdatedFood({ ...updateFood, [name]: value });
    }
  };

  const onSubmitHandler = async (event, id) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", updateFood.name);
    formData.append("description", updateFood.description);
    formData.append("price", Number(updateFood.price));
    formData.append("category", updateFood.category);

    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", updateFood.image);
    }

    try {
      const response = await axios.post(`${url}/api/food/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        closePopup();
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi khi cập nhật món ăn.");
    }
  };

  useEffect(() => {
    setUpdatedFood(food);
  }, [food]);

  return (
    <div className="update-container">
      <form
        onSubmit={(e) => onSubmitHandler(e, food._id)}
        className="update-container-form"
      >
        <div className="update-container-form-title">
          <h2>Edit Item</h2>
          <p
            className="cross"
            onClick={() => {
              closePopup();
              console.log(closePopup);
            }}
          >
            x
          </p>
        </div>
        <div className="update-container-form-image">
          <p>Image:</p>
          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : `${url}/images/${updateFood.image}`
              }
              alt="Preview"
              width="100"
              height="100"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </div>
        <div className="update-container-form-name">
          <p>Name:</p>
          <input
            type="text"
            name="name"
            value={updateFood.name || ""}
            onChange={handlerChange}
          />
        </div>
        <div className="update-container-form-category">
          <p>Category:</p>
          <select
            name="category"
            value={updateFood.category || "Salad"}
            onChange={handlerChange}
          >
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>
        <div className="update-container-form-description">
          <p>Description:</p>
          <textarea
            type="text"
            name="description"
            value={updateFood.description || ""}
            onChange={handlerChange}
          />
        </div>
        <div className="update-container-form-price">
          <p>Price:</p>
          <input
            type="number"
            name="price"
            value={updateFood.price || ""}
            onChange={handlerChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;
