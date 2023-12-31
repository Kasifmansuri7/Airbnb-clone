import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    address: { type: String, required: true },
    photos: { type: Array, required: true },
    desc: { type: String, required: true },
    perks: { type: Array },
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Place = mongoose.model("Place", placeSchema);

export default Place;
