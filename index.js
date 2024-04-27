import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./model/user.js";
import md5 from "js-md5";
dotenv.config();

const app = express();
app.use(express.json());

function connectDB() {
  const conn = mongoose.connect(process.env.MONGO_URI);
  if (conn) {
    console.log(`DB connected`);
  }
}
connectDB();

const PORT = process.env.PORT || 5000;

app.get("/health", (req, res) => {
  res.send({
    message: `Server is running`,
  });
});

app.post("/signup", async (req, res) => {
  const { name, email, mobile, password, city, address } = req.body;

  const user = new User({
    name: name,
    email: email,
    mobile: mobile,
    password: md5(password),
    city: city,
    address: address,
  });

  try {
    const savedUser = await user.save();

    res.json({
      success: true,
      data: savedUser,
      message: "Signed up successfully.",
    });
  } catch (error) {
    res.json({
        success: false,
        data: null,
        message: error.message
    })
  }
});

app.post("/login", async (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
