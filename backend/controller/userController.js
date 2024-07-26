const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../middleware/errorMiddleware");
const User = require("../models/userSchema"); 


exports.patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form", 400));

  }
  let user = await User.findOne({email})
  if(user) {
    return next(new ErrorHandler("User Already Registered ", 400));
  }
  user = await User.create({ firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,});
    res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    data: user,
  });
  res.status(200).json({
    success:true, 
    message: "User Registered Successfully" })
});

