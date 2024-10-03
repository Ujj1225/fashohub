const asyncHandler = (fn) => (req, res, next) => {
  // resolves a promise and if it resolves, it calls next to call next middleware
  Promise.resolve(fn(req, res, next)).catch(next);
};
module.exports = asyncHandler;
