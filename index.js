// index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Define a schema
const bookingSchema = new mongoose.Schema({
  from_name: String,
  from_email: String,
  form_countryCode: String,
  form_phone: String,
  from_timezone: String,
  form_time: String,
  form_date: String
});

// Create a model
const Booking = mongoose.model("Booking", bookingSchema);

// Route to handle form submissions
app.post("/submit-form", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(200).send("Booking saved successfully!");
  } catch (error) {
    res.status(500).send("Error saving booking: " + error);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
