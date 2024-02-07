const validateBody = require("./validateBody");
const authenticate = require("./autenticate");
const upload = require("./upload");
const passport = require("./google-authenticate")

module.exports = {
  validateBody,
  authenticate,
  upload,
  passport
};
