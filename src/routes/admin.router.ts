import { Router } from "express";
import AdminController from "../controllers/admin.controller";
import Auth from "../middlewares/auth";

const router = Router();

router.get('/approve', Auth.auth, Auth.verify, AdminController.approveEvent);
router.get('/', Auth.auth, Auth.verify, AdminController.isAdmin);

export default router;