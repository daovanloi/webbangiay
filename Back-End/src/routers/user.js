import express from "express";
import { checkPermission } from "../middlewares/CheckPermission.js";
import {
  getAllUser,
  getBillFollowUser,
  getOneUser,
  removeUser,
  updateUser,
} from "../controllers/user.js";
const RouterUser = express.Router();

RouterUser.get("/", getAllUser);
RouterUser.get("/:id", getOneUser);
RouterUser.put("/:id", checkPermission, updateUser);
RouterUser.delete("/:id", checkPermission, removeUser);
RouterUser.get("/bill/me", getBillFollowUser);

export default RouterUser;
