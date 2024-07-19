import { Schema, model } from "mongoose";

const locationSchema = new Schema({
  name: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  heading: { type: String, required: true },
});

const Locations = model("locations", locationSchema);

export default Locations;
