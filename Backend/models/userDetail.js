const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortdescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imglink: {
    type: String,
  },
});

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortdescription: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  websitelink: {
    type: String,
    required: true,
  },
  imglink: {
    type: String,
  },
});


const userSchema = mongoose.Schema({
  blogs: [blogSchema],
  projects: [projectSchema],
  top3projects: [projectSchema]
});

module.exports = mongoose.model("personal", userSchema);
