import { Router } from "express";
import authorizer from "../../middleware/middleware.js";
import {
  addBooking,
  getBookingsByUserId,
} from "../../controllers/bookings/bookings-controller.js";

const router = Router();

router.post("/", authorizer, addBooking);
router.get("/:userId", authorizer, getBookingsByUserId);

export default router;
