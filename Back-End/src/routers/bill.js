import express from "express";
import { checkPermission } from "../middlewares/CheckPermission.js";
import {
  createBill,
  getAllBill,
  getBillByUser,
  getOneBill,
  removeBill,
  updateBill,
} from "../controllers/bill.js";
import { CheckMember } from "../middlewares/CheckMember.js";
const RouterBill = express.Router();

RouterBill.get("/", getAllBill);
RouterBill.get("/:id", getOneBill);
RouterBill.get("/order/:User_id", getBillByUser);
RouterBill.post("/", createBill);
RouterBill.patch("/:id", CheckMember, updateBill);
RouterBill.delete("/:id", checkPermission, removeBill);

export default RouterBill;
