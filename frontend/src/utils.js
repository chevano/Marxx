// Returns the error message on the backend if it exist, otherwise will return
// the general error message from the error object like a 404 error message

export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
