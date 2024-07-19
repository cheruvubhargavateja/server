import { Schema, SchemaTypes, model } from "mongoose";

const bookingSchema = new Schema({
  price: { type: Number, required: true },
  name: { type: String, required: true },
  phoneNo: { type: String, required: true },
  passengers: { type: Number, default: 1, required: true },
  startDate: { type: Date, required: true },
  totalDays: { type: Number, default: 1, required: true },
  note: { type: String },
  user: {
    type: SchemaTypes.ObjectId,
    ref: "users",
    required: true,
  },
  location: {
    type: SchemaTypes.ObjectId,
    ref: "locations",
  },
});

const Bookings = model("bookings", bookingSchema);

export default Bookings;
