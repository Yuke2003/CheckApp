const mongoose = require("mongoose");

// Rent Schema
const RentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    regularPrice: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: String,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    hospitals: {
      type: Number,
      required: true,
    },
    colleges: {
      type: Number,
      required: true,
    },
    user: 
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        maxlength: 1,
      },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

RentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-__v",
  });
  next();
});

const RentDetails = mongoose.model("RentDetails", RentSchema);

module.exports = RentDetails;
