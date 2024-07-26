const { select } = require("@nextui-org/react");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name Must Contain At Least 3 Characters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name Must Contain At Least 3 Characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Provide a Valid Email Address"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, "Phone Must Be Exactly 11 Characters"],
    maxLength: [11, "Phone Must Be Exactly 11 Characters"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [10, "Nic Must Be Exactly 10 Characters"],
    maxLength: [10, "Phone Must Be Exactly 11 Characters"],
  },
  dob: {
    type: Date,
    required: [true, "Dob is required"],
  },
  gender: {
    type: String,
    required: [true],
    enum: ["male", "female"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, "Password Must Be Minimum 11 Characters"],
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDepartment: {
    type: String,
  },
  doctorAvatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function(next){
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async (enteredPassword) => {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = () => {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

module.exports = mongoose.model("User", userSchema);
