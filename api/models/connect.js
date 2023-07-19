import mongoose from "mongoose";

function connectDB(url) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("DB connection successful!");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default connectDB;
