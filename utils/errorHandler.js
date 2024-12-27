const handleError = (error) => {
  console.error("Error occurred:", error.message);
  return { message: "An unexpected error occurred", details: error.message };
};

module.exports = { handleError };
