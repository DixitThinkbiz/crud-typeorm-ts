export const constants = {
    response: {
      SUCCESS: {
        status: 200,
        message: "Request succeeded.",
      },
      USER_NOT_FOUND: {
        status: 404,
        message: "User not found.",
      },
      USER_ALREADY_EXISTS: {
        status: 409,
        message: "User already exists.",
      },
      USER_ADDED: {
        status: 201,
        message: "User added successfully.",
      },
      USER_UPDATED: {
        status: 200,
        message: "User updated successfully.", 
      },
      INVALID_INPUT: {
        status: 400,
        message: "Invalid input provided.",
      },
      SERVER_ERROR: {
        status: 500,
        message: "Internal server error.",
      },
      
      // Add more response codes as needed
    },
    // Add more constants as needed
  };
  