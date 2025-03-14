import { Router } from "express";
import { registerUser } from "../controller/user.controll.js";

const router = Router();
router.route("/register").post(registerUser);

export default router;