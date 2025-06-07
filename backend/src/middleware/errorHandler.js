
exports.errorHandler = (err, req, res, next) => {
  console.error(err); // Log for debugging
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({
    success: false,
    error: message,
  });
};
