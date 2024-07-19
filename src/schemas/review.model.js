import { Schema, SchemaTypes, model } from "mongoose";

const reviewsSchema = new Schema({
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  user: {
    type: SchemaTypes.ObjectId,
    ref: "users",
    required: true
  },
  location: {
    type: SchemaTypes.ObjectId,
    ref: "locations",
  }
});

const Reviews = model("reviews", reviewsSchema);

export default Reviews;
