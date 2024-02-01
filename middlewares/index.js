const validateBody = require("./validateBody");
const authenticate = require("./autenticate");
const upload = require("./upload");
const verifyToken = require("./verifyToken");

module.exports = {
  validateBody,
  authenticate,
  upload,
  verifyToken,
};
