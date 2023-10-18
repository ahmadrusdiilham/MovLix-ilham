function errorHandler(err, req, res, next) {
  console.log(err);
  let status = 500;
  let message = "Internal server error";
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "email_is_required") {
    status = 400;
    message = "Email is required";
  } else if (err.name === "password_is_required") {
    status = 400;
    message = "Password is required";
  } else if (err.name === "invalid_email/password") {
    status = 401;
    message = "Invalid Email/Password";
  } else if (
    err.name === "unauthenticated" ||
    err.name === "JsonWebTokenError"
  ) {
    status = 401;
    message = "Invalid token";
  }

  res.status(status).json({ message });
}
module.exports = errorHandler;
