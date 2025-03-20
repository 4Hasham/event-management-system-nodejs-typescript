import { Router } from "express";
import EventController from "../controllers/events.controller";

const router = Router();

router.get('/', EventController.getAllEvents);
router.get('/:id', EventController.getEventById);
router.post('/', EventController.createEvent);
router.put('/:id', EventController.updateEventById);

export default router;