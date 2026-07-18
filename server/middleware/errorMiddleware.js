// 404 handler — catches any request that didn't match a route above it.
export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

// Generic error handler — catches anything thrown or passed to next(err)
// from a route/controller that didn't handle its own errors. Controllers
// can keep their existing try/catch + res.status(...).json(...) pattern;
// this is a safety net for anything that slips past that (e.g. malformed
// JSON bodies, unexpected thrown errors, Mongoose CastErrors).
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Mongoose "CastError" (e.g. an invalid ObjectId in a URL param) reads as
  // a client mistake, not a server failure.
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");

    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Duplicate key error (unique index violation)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    return res.status(400).json({
      success: false,
      message: field ? `${field} already in use` : "Duplicate value",
    });
  }

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
  });
};