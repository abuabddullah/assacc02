const mongoose = require("mongoose");
const validator = require("validator");

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [100, "Name cannot exceed 100 characters"],
    minLength: [10, "Name should have more than 10 characters"],
    unique: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    required: [true, "Please Enter Your Price"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  totalViews: {
    type: Number,
    default: 0,
  },
});

const toursModel = mongoose.model("Tour", toursSchema);
module.exports = toursModel;
