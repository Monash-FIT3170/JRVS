const asyncHandler = require("express-async-handler");
const School = require("../models/schoolModel");

const getSchools = asyncHandler(async (req, res) => {
  // const response = await fetch("../SearchResults.json");
  // const data = await response.json();

  const schools = await School.find();
  if (!schools) {
    res.status(404).json({ message: "Schools not found" });
  }
  res.status(200).json(schools);
});

module.exports = {
  getSchools,
};
