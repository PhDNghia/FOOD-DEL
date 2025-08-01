import foodModel from "../models/foodModel.js";
import fs from "fs";

// add item food
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

// get all foodlist
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods, message: "Get ListFood Success" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

// api update food
const updateFood = async (req, res) => {
  const { id, name, description, price, category } = req.body;
  let image_filename;

  try {
    if (req.file) {
      image_filename = req.file.filename;
      const imageOld = await foodModel.findById(id);
      fs.unlink(`uploads/${imageOld.image}`, () => {});
    } else {
      image_filename = req.body.image;
    }
    const food = await foodModel.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      image: image_filename,
    });

    if (food) {
      res.json({ success: true, message: "Food updated successfully", food });
    } else {
      res.status(404).json({ success: false, message: "Food not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating food" });
  }
};

export { addFood, listFood, removeFood, updateFood };
