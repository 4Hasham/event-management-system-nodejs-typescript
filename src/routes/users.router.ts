import { Router } from "express";
import UserController from "../controllers/users.controller";

const router = Router();

router.get('/', UserController.getActiveUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);

export default router;