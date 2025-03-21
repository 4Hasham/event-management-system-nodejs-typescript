import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

router.post('/login', AuthController.loginUser);
router.post('/send-otp', AuthController.sendActivationOTP);
router.get('/logout', AuthController.logoutUser);

export default router;