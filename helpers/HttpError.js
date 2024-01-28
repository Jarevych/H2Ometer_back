const errorMessageList = {
  400: "Bad Request",
  401: "Unauthorizer",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const HttpError = (status, message) => {
  const errorMessage = message || errorMessageList[status] || "Unknown Error";
  const error = new Error(errorMessage);
  error.status = status;
  return error;
};

module.exports = HttpError;
