import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Password wrong!" });
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

// token
const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};

// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //checkng is user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    //validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password!",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

// fetch users
const fetchUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({ success: true, data: users, message: "Get Users Success" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

// find user by id
const findUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    res.json({ success: true, data: user, message: "Get user success" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

//changepassword user
const changePassword = async (req, res) => {
  const { userId, oldPassword, newPassword, confirmPassword } = req.body;
  const user = await userModel.findById(userId);
  if (String(newPassword).trim() !== String(confirmPassword).trim()) {
    res.status(400).json({
      message: "New password and confirmation password must be the same!",
    });
  }
  const isOldPasswordCorrect = await bcrypt.compare(
    String(oldPassword).trim(),
    user.password
  );
  if (!isOldPasswordCorrect) {
    res.status(400).json({ message: "Old password is not correct" });
  }
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;
  res.status(200).json({ message: "Password has been changed successfully!" });
  await user.save();
};

// set admin for user
const setUserAdmin = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (user.role === 1) {
      user.role = 2;
    } else {
      user.role = 1;
    }

    await user.save();
    res.json({ success: true, message: "Change Role Success!" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

//remove user by spam
const removeUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Deleted User!" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

export {
  loginUser,
  registerUser,
  fetchUser,
  setUserAdmin,
  removeUser,
  findUserById,
  changePassword,
};
