import { Router } from "express";
import EventController from "../controllers/events.controller";
import Auth from "../middlewares/auth";

const router = Router();

router.get('/', Auth.auth, EventController.getAllEvents);
router.get('/:id', Auth.auth, EventController.getEventById);
router.post('/', Auth.auth, EventController.createEvent);
router.put('/:id', Auth.auth, EventController.updateEventById);
router.delete('/:id', Auth.auth, EventController.deleteEvent);
router.post('/join:id', Auth.auth, EventController.joinEvent);

export default router;