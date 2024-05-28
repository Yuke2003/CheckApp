const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    confirmPassword: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      required: true,
      enum: ["seller", "buyer"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// userSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "rentDetails",
//     select: "-__v",
//   });
//   next();
// });

userSchema.virtual('rentDetails', {
  ref: 'RentDetails',
  foreignField: 'user',
  localField: '_id'
});

userSchema.pre("save", function (next) {
  if (this.password != this.confirmPassword) {
    res.status(400).json({ error: "pasword do not match" });
  }
  next();
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
