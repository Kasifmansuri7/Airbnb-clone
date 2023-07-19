import express from "express";
const app = express();
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "./models/connect.js";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
//models
import User from "./models/User.js";
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

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
