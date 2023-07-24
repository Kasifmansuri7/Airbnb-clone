import express from "express";
const app = express();
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "./models/connect.js";
import * as dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
//models
import User from "./models/User.js";
import Place from "./models/Place.js";
import Booking from "./models/Booking.js";
const PORT = process.env.PORT || 3000;

//connect to DB
connectDB(process.env.MONGODB_URL);

//PASSWORD HASHING
const bcryptSalt = bcrypt.genSaltSync(10);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// SETUP
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

function getUserData(req) {
  const token = req.headers.authorization;
  return new Promise((resolve, rejects) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.use(
  "/uploads",
  express.static("./uploads") //D:\\Tutorial\\Projects\\airbnb\\api
);

app.get("/", (req, res) => {
  res.json("Broww it is working");
});

//REGISTER USER
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(422).json(err);
  }
});

//LOGIN USER
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      const passOk = bcrypt.compareSync(password, foundUser.password);
      if (passOk) {
        jwt.sign(
          {
            email: foundUser.email,
            id: foundUser._id,
          },
          process.env.JWT_SECRET_KEY,
          {},
          (err, token) => {
            if (err) throw err;
            res.status(200).json({ token, foundUser }); //.cookie("token", token)
          }
        );
      }
    }
  } catch (err) {
    res.status(400).json("Login Failed.");
  }
});

//LOGOUT USER
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

//PROFILE INFORMATION
app.get("/profile", (req, res) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email } = await User.findById(userData.id);
      res.status(200).json({ name, email });
    });
  } else {
    res.json(null);
  }
});

//UPLOAD BY LINK
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const result = await cloudinary.uploader.upload(link);
  res.json(result.secure_url);
});

// await download.image({
//   url: link,
//   dest: "D:\\Tutorial\\Projects\\airbnb\\api/uploads/" + newName,
// });

//UPLOAD FROM LOCALLY
const photosMiddleWare = multer({ dest: "uploads/" });

app.post("/upload", photosMiddleWare.array("photos", 100), async (req, res) => {
  const images = [];
  const uploadedFiles = [];
  //adding extention to images
  for (let i = 0; i < req.files.length; i++) {
    let { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    images.push("./" + newPath);
  }

  for (let image of images) {
    const result = await cloudinary.uploader.upload(image);
    uploadedFiles.push(result.secure_url);
  }
  res.json(uploadedFiles);
});

//GET ALL PLACES FOR HOME PAGE
app.get("/places", async (req, res) => {
  res.json(await Place.find({}));
});

//ADD NEW PLACE
app.post("/place", async (req, res) => {
  const token = req.headers.authorization;
  const {
    title,
    address,
    addedPhotos,
    desc,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      desc,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    res.json(placeDoc);
  });
});

//UPDATE PLACE DETAILS
app.put("/place", async (req, res) => {
  const token = req.headers.authorization;
  const {
    id,
    title,
    address,
    addedPhotos,
    desc,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        desc,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("Updated");
    }
  });
});

//FIND USER's PLACES
app.get("/user-places", (req, res) => {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, userData) => {
    if (err) throw err;
    const places = await Place.find({ owner: userData.id });
    res.json(places);
  });
});

//GET A PLACE
app.get("/place/:id", async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.json(place);
});

//DELETE PLACE
app.delete("/place/:id", async (req, res) => {
  const id = req.params.id;
  await Place.findByIdAndDelete(id);
  res.json("deleted");
});

//BOOK A PLACE
app.post("/booking", async (req, res) => {
  const { place, name, email, phone, checkIn, checkOut, guests, amount } =
    req.body;
  const userData = await getUserData(req);
  const bookingDoc = await Booking.create({
    user: userData.id,
    place,
    name,
    email,
    phone,
    checkIn,
    checkOut,
    guests,
    amount,
  });

  res.json(bookingDoc);
});

//BOOKINGS INFO
app.get("/bookings", async (req, res) => {
  const userData = await getUserData(req);
  const bookingDoc = await Booking.find({ user: userData.id }).populate(
    "place"
  );
  res.json(bookingDoc);
});

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
