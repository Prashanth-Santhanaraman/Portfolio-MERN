const express = require("express");
const app = express();
const userModel = require("./models/userDetail");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to PRASHANTH portfolio backend");
});

app.get("/blogs", async (req, res) => {
  const userBlogs = await userModel.findOne({_id:`${process.env.MONGODBPROFILEID}`});
  console.log(userBlogs)
  if (userBlogs) {
    return res.status(200).json(userBlogs);
  } else {
    return res.status(400).json({ message: "Error" });
  }
});

app.post("/newBlog", async (req, res) => {
  const { title, shortdescription, description, imglink, password } = req.body;
  if (!title || !shortdescription || !description || !imglink || !password) {
    return res.status(404).json({ message: "Please fill all details !" });
  }
  if (!password) {
    return res.status(404).json({ message: "Password is missing !" });
  }

  try {
    const userDetail = await userModel
      .findOne({ _id: `${process.env.MONGODBPROFILEID}` })
      .select("+password");
    // console.log(userDetail._doc.password);
    // console.log("userDetail keys:", Object.keys(userDetail));
    const passwordCheck = await bcrypt.compare(
      password,
      userDetail._doc.password
    );
    if (!passwordCheck) {
      return res.status(400).json({ message: "Password is wrong !" });
    }

    const updatedBlog = await userModel.findByIdAndUpdate(
      `${process.env.MONGODBPROFILEID}`,
      { $push: { blogs: { title, shortdescription, description, imglink } } },
      { new: true }
    );

    return res
      .status(200)
      .json({
        updatedBlog: updatedBlog,
        message: "Successfully added the blog !",
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error in adding the new blog! Check the console" });
    console.log(error);
  }
});

app.post("/newProject", async (req, res) => {
  const {
    title,
    shortdescription,
    description,
    websitelink,
    imglink,
    password,
  } = req.body;

  if (!password) {
    return res.status(404).json({ message: "Password is missing !" });
  }

  try {
    const userDetail = await userModel
      .findOne({ _id: `${process.env.MONGODBPROFILEID}` })
      .select("+password");
    // console.log(userDetail._doc.password);
    // console.log("userDetail keys:", Object.keys(userDetail));
    const passwordCheck = await bcrypt.compare(
      password,
      userDetail._doc.password
    );
    if (!passwordCheck) {
      return res.status(400).json({ message: "Password is wrong !" });
    }
    const updatedProject = await userModel.findByIdAndUpdate(
      `${process.env.MONGODBPROFILEID}`,
      {
        $push: {
          projects: {
            title,
            shortdescription,
            description,
            websitelink,
            imglink,
          },
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({
        updatedProject: updatedProject,
        message: "Successfully added the project !",
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error in adding the project! check the console" });
    console.log(error);
  }
});

app.post("/newTop3Projects", async (req, res) => {
  const {
    title,
    shortdescription,
    description,
    websitelink,
    imglink,
    password,
  } = req.body;

  if (!password) {
    return res.status(404).json({ message: "Password is missing !" });
  }

  try {
    const userDetail = await userModel
      .findOne({ _id: `${process.env.MONGODBPROFILEID}` })
      .select("+password");
    // console.log(userDetail._doc.password);
    // console.log("userDetail keys:", Object.keys(userDetail));
    const passwordCheck = await bcrypt.compare(
      password,
      userDetail._doc.password
    );
    if (!passwordCheck) {
      return res.status(400).json({ message: "Password is wrong !" });
    }
    const updatedProject = await userModel.findByIdAndUpdate(
      `${process.env.MONGODBPROFILEID}`,
      {
        $push: {
          top3projects: {
            title,
            shortdescription,
            description,
            websitelink,
            imglink,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json(updatedProject);
  } catch (error) {
    res
      .status(400)
      .json({ message: "error in adding the project! check the console" });
    console.log(error);
  }
});

app.get("/blog/post/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findOne({ "blogs._id": id }, { "blogs.$": 1 });
    if (user) {
      res.status(200).json(user.blogs[0]);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

app.get("/project/post/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const user = await userModel.findOne({ "projects._id": id }, { "projects.$": 1 });
    if (user) {
      res.status(200).json(user.projects[0]);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

mongoose
  .connect(`${process.env.MONGODBURI}`)
  .then(() => {
    console.log("Connected to the db successfully");
    app.listen(port, (req, res) => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
