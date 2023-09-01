import express from "express";
import {
  Signin,
  Signup,
  forgotPassword,
  verifyToken,
} from "../controllers/auth.js";

const routerAuth = express.Router();

routerAuth.post("/signup", Signup);
routerAuth.post("/signin", Signin);
routerAuth.post("/forgotpassword", forgotPassword);
routerAuth.get("/verifyToken/:id", verifyToken);
export default routerAuth;
