import { Router } from "express";
import userController from "./user.controller";
let router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
