import { Router } from "express";
import {
  getUsers,
  createUser,
  loginUser,
} from '../controllers/user_controller.js';

const router = Router();

router.route("/").get(getUsers);
router.route("/register").post(createUser);
router.route("/login").post(loginUser);

export default router;
