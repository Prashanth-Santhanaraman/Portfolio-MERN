const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const userModel = require("./models/userDetail");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/Portfolio")
  .then(() => {
    console.log("Connected to the db successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to PRASHANTH portfolio backend");
});

app.get("/blogs", async (req, res) => {
  const userBlogs = await userModel.find();
  if (userBlogs) {
    return res.status(200).json(userBlogs);
  } else {
    return res.status(400).json({ message: "Error" });
  }
});

app.post("/newBlog", async (req, res) => {
  const { title, shortdescription, description, imglink } = req.body;

  try {
    const updatedBlog = await userModel.findByIdAndUpdate(
      "67a7626fb94f9ae0ba21b6cf",
      { $push: { blogs: { title, shortdescription, description, imglink } } },
      { new: true }
    );

    return res.status(200).json(updatedBlog);
  } catch (error) {
    res
      .status(400)
      .json({ message: "error in adding the new blog! Check the console" });
    console.log(error);
  }
});

app.post("/newProject", async (req, res) => {
  const { title, shortdescription, description, websitelink, imglink } =
    req.body;

  try {
    const updatedProject = await userModel.findByIdAndUpdate(
      "67a7626fb94f9ae0ba21b6cf",
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

    return res.status(200).json(updatedProject);
  } catch (error) {
    res
      .status(400)
      .json({ message: "error in adding the project! check the console" });
    console.log(error);
  }
});

app.post("/newTop3Projects", async (req, res) => {
  const { title, shortdescription, description, websitelink, imglink } =
    req.body;

  try {
    const updatedProject = await userModel.findByIdAndUpdate(
      "67a7626fb94f9ae0ba21b6cf",
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

app.listen(4000, (req, res) => {
  console.log(`Listening on port ${port}`);
});
