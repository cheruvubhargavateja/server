import { Router } from "express";
import authorizer from "../../middleware/middleware.js";
import {
  addLocation,
  getAllLocations,
  getLocationById,
} from "../../controllers/locations/locations-controller.js";

const router = Router();

router.get("/", authorizer, getAllLocations);
router.post("/add-location", authorizer, addLocation);
router.get("/:locationName", authorizer, getLocationById);

export default router;
