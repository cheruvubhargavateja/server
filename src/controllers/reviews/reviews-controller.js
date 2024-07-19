import Reviews from "../../schemas/review.model.js";
import mongoose from "mongoose";

//Add locations api
//path: http://localhost:4000/api/reviews

export async function addReview(req, res) {
  const { rating, description, user, location } = req.body;

  if (!rating || !description || !user || !location) {
    return res.status(400).json({
      message: "rating, description, user and location cannot be empty",
      success: false,
    });
  }

  const reviews = new Reviews({
    rating,
    description,
    user,
    location,
  });

  try {
    await reviews.save();

    res.status(201).json({
      message: "Review added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Intrnal server error",
      error: error.message,
      success: false,
    });
  }
}

//Get all locations api
//path: http://localhost:4000/api/reviews/:locationId
export async function getReviewsByLocationId(req, res) {
  const locationId = req.params.locationId;
  try {
    // Ensure locationId is a valid ObjectId string
    if (!mongoose.Types.ObjectId.isValid(locationId)) {
      return res.status(400).json({
        message: "Invalid location ID",
        success: false,
      });
    }

    const reviews = await Reviews.find({ location: locationId })
      .populate("user")
      .populate("location");

    const result = await Reviews.aggregate([
      { $match: { location: new mongoose.Types.ObjectId(locationId) } },
      {
        $group: {
          _id: "$location",
          averageRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        message: "Reviews fetched successfully.",
        data: {
          reviews,
          rating: result[0].averageRating,
          totalReviews: result[0].reviewCount,
        },
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "No reviews found.",
        data: {
          reviews,
          rating: 0,
          totalReviews: 0,
        },
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
}
