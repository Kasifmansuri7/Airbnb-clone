import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  address: { type: String, required: true },
  photos: { type: Array, required: true },
  description: { type: String, required: true },
  perks: { type: Array },
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
});

const Place = mongoose.model("place", placeSchema);

export default Place;
