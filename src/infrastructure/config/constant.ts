export const constants = {
  SUCCESS_STATUS: {
    OK: 200,
    CREATED: 201,
   
    // Add more success status codes as needed
  },
  
  ERROR_STATUS: {
    NOT_FOUND: 404,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    // Add more error status codes as needed
  },

  ERROR_MESSAGE: {
    USER_NOT_FOUND: "User not found.",
    USER_ALREADY_EXISTS: "User already exists.",
    INVALID_INPUT: "Invalid input provided.",
    INTERNAL_SERVER_ERROR: "Internal server error.",
    // Add more error messages as needed
  },

  SUCCESS_MESSAGE: {
    REQUEST_SUCCEEDED: "Request succeeded.",
    USER_ADDED: "User added successfully.",
    USER_UPDATED: "User updated successfully.",
    // Add more success messages as needed
  },

  // Add more constants as needed
};
