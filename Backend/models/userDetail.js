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
  blogDate: {
    type: Date,
    default: Date.now,
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
  top3projects: [projectSchema],
  password: {
    type: String,
  },
});

module.exports = mongoose.model("personal", userSchema);
