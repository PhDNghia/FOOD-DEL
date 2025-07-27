import express from "express";
import {
  changePassword,
  fetchUser,
  findUserById,
  loginUser,
  registerUser,
  removeUser,
  setUserAdmin,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/list", fetchUser);
userRouter.post("/updatead", setUserAdmin);
userRouter.post("/remove", removeUser);
userRouter.post("/finduser", authMiddleware(), findUserById);
userRouter.post("/changepassword", authMiddleware(), changePassword);

export default userRouter;
