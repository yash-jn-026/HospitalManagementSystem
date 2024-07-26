const { object } = require("zod");

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

exports.errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "internal Server error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValues)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = "json token error";
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenExpired") {
    const message = "json token expired";
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "CastError") {
    const message = "Invalid " + err.path;
    err = new ErrorHandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join("")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};
module.exports = ErrorHandler;
