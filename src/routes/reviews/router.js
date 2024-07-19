import { Router } from "express";
import authorizer from "../../middleware/middleware.js";
import { addReview, getReviewsByLocationId } from "../../controllers/reviews/reviews-controller.js";

const router = Router();

router.post("/", authorizer, addReview);
router.get("/:locationId", authorizer, getReviewsByLocationId);

export default router;
