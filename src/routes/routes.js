import { Router } from "express";
import usersRouter from "./users/router.js";
import locationsRouter from "./locations/router.js";
import reviewsRouter from "./reviews/router.js";
import bookingsRouter from "./bookings/router.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/locations", locationsRouter);
router.use("/reviews", reviewsRouter);
router.use("/bookings", bookingsRouter);

export default router;
