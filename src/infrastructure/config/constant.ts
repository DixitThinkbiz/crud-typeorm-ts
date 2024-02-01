export const constants = {
  TIME: {
    ACCESS_TOKEN_TIME: 3600,
    REFRESH_TOKEN_TIME: 36000,
    OTP_TIME:3600
  },
  SUCCESS_STATUS: {
    OK: 200,
    CREATED: 201,
  },

  ERROR_STATUS: {
    NOT_FOUND: 404,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    AUTHENTICATION_FAILED: 401,
    ACCESS_TOKEN_MISSING: 402,
    JWT_ERROR: 403,
    JWT_TOKEN_EXPIRED_ERROR: 406,
  },

  ERROR_MESSAGE: {
    USER_NOT_FOUND: "User not found.",
    USER_ALREADY_EXISTS: "User already exists.",
    INVALID_INPUT: "Invalid input provided.",
    INTERNAL_SERVER_ERROR: "Internal server error.",
    AUTHENTICATION_FAILED: "Authentication failed. Invalid credentials.",
    ACCESS_TOKEN_MISSING: "Access token is missing.",
    JWT_NOT_BEFORE_ERROR: "JWT not yet valid.",
    JWT_ERROR: "JWT error occurred.",
    JWT_TOKEN_EXPIRED_ERROR: "JWT token expired.",
    OTP_INVALID:'Invalid OTP. Please enter a valid OTP.'
  },

  SUCCESS_MESSAGE: {
    REQUEST_SUCCEEDED: "Request succeeded.",
    USER_ADDED: "User added successfully.",
    USER_UPDATED: "User updated successfully.",
    AUTHENTICATION_SUCCESSFUL: "Authentication successful.",
  },
};
