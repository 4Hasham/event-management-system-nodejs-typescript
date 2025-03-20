import { Router } from "express";
import UserController from "../controllers/users.controller";

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUserById);

export default router;