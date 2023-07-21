import express from "express";
const app = express();
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "./models/connect.js";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import download from "image-downloader";
import multer from "multer";
import fs from "fs";
//models
import User from "./models/User.js";
import Place from "./models/Place.js";
dotenv.config();
//connect to DB
connectDB(process.env.MONGODB_URL);

//PASSWORD HASHING
const bcryptSalt = bcrypt.genSaltSync(10);

// SETUP
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(
  "/uploads",
  express.static("D:\\Tutorial\\Projects\\airbnb\\api/uploads")
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
            res.status(200).cookie("token", token).json(foundUser);
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
  const { token } = req.cookies;

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
  const newName = Date.now() + ".jpg";
  await download.image({
    url: link,
    dest: "D:\\Tutorial\\Projects\\airbnb\\api/uploads/" + newName,
  });
  res.json(newName);
});

//UPLOAD LOCALLY
const photosMiddleWare = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleWare.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  //adding extention to images
  for (let i = 0; i < req.files.length; i++) {
    let { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

//ADD NEW PLACE
app.post("/places", async (req, res) => {
  const { token } = req.cookies;
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
    });

    res.json(placeDoc);
  });
});

//FIND USER's PLACES
app.get("/places", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, userData) => {
    if (err) throw err;
    const places = await Place.find({ owner: userData.id });
    res.json(places);
  });
});

//GET A PLACE
app.get("/places/:id", async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.json(place);
});

//UPDATE PLACE DETAILS
app.put("/places/", async (req, res) => {
  const { token } = req.cookies;
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
      });
      await placeDoc.save();
      res.json("Updated");
    }
  });
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
