import { Router } from "express";
import UserController from "../controllers/users.controller";
import Auth from "../middlewares/auth";

const router = Router();

router.get('/', Auth.auth, UserController.getActiveUsers);
router.get('/:id', Auth.auth, UserController.getUserById);
router.post('/', UserController.createUser);

export default router;