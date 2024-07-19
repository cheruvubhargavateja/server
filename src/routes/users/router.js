import { Router } from "express";
import {
  register,
  login,
  getUsers,
  logout,
} from "../../controllers/users/users-controller.js";
import authorizer from "../../middleware/middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", authorizer, logout);
router.get("/", authorizer, getUsers);

export default router;
