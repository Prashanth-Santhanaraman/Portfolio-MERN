const express = require("express");
const app = express();
const userModel = require("./models/userDetail");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const sanitizeHtml = require("sanitize-html");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 3000;

const sanitizeOptions = {
  allowedTags: [ 'h1', 'h2', 'h3', 'p', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'blockquote', 'pre', 'code', 'a', 'br' ],
  allowedAttributes: {
    'a': [ 'href', 'target', 'rel' ]
  }
};

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("*", cors());

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
  let { title, shortdescription, description, imglink, password } = req.body;
  if (description) description = sanitizeHtml(description, sanitizeOptions);
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
  let {
    title,
    shortdescription,
    description,
    websitelink,
    imglink,
    password,
  } = req.body;
  
  if (description) description = sanitizeHtml(description, sanitizeOptions);

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
  let {
    title,
    shortdescription,
    description,
    websitelink,
    imglink,
    password,
  } = req.body;

  if (description) description = sanitizeHtml(description, sanitizeOptions);

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

app.put("/editTop3Project/:id", async (req, res) => {
  const { id } = req.params;
  let { title, shortdescription, description, websitelink, imglink, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required !" });
  }
  if (!title || !description || !websitelink || !imglink) {
    return res.status(400).json({ message: "Please fill all required fields !" });
  }

  if (description) description = sanitizeHtml(description, sanitizeOptions);

  try {
    const userDetail = await userModel
      .findOne({ _id: `${process.env.MONGODBPROFILEID}` })
      .select("+password");

    const passwordCheck = await bcrypt.compare(password, userDetail._doc.password);
    if (!passwordCheck) {
      return res.status(401).json({ message: "Password is wrong !" });
    }

    const updated = await userModel.findOneAndUpdate(
      { _id: `${process.env.MONGODBPROFILEID}`, "top3projects._id": id },
      {
        $set: {
          "top3projects.$.title": title,
          "top3projects.$.shortdescription": shortdescription,
          "top3projects.$.description": description,
          "top3projects.$.websitelink": websitelink,
          "top3projects.$.imglink": imglink,
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Top 3 Project not found !" });
    }

    return res.status(200).json({ message: "Top 3 Project updated successfully !", updatedProjects: updated.top3projects });
  } catch (error) {
    res.status(500).json({ message: "Error updating Top 3 Project. Check the console." });
    console.log(error);
  }
});

app.put("/editBlog/:id", async (req, res) => {
  const { id } = req.params;
  let { title, shortdescription, description, imglink, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required !" });
  }
  if (!title || !shortdescription || !description || !imglink) {
    return res.status(400).json({ message: "Please fill all fields !" });
  }

  if (description) description = sanitizeHtml(description, sanitizeOptions);

  try {
    const userDetail = await userModel
      .findOne({ _id: `${process.env.MONGODBPROFILEID}` })
      .select("+password");

    const passwordCheck = await bcrypt.compare(password, userDetail._doc.password);
    if (!passwordCheck) {
      return res.status(401).json({ message: "Password is wrong !" });
    }

    const updated = await userModel.findOneAndUpdate(
      { _id: `${process.env.MONGODBPROFILEID}`, "blogs._id": id },
      {
        $set: {
          "blogs.$.title": title,
          "blogs.$.shortdescription": shortdescription,
          "blogs.$.description": description,
          "blogs.$.imglink": imglink,
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Blog not found !" });
    }

    return res.status(200).json({ message: "Blog updated successfully !", updatedBlogs: updated.blogs });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog. Check the console." });
    console.log(error);
  }
});

app.delete("/deleteBlog/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required !" });
  }

  try {
    const userDetail = await userModel
      .findOne({ _id: `${process.env.MONGODBPROFILEID}` })
      .select("+password");

    const passwordCheck = await bcrypt.compare(password, userDetail._doc.password);
    if (!passwordCheck) {
      return res.status(401).json({ message: "Password is wrong !" });
    }

    const updated = await userModel.findByIdAndUpdate(
      `${process.env.MONGODBPROFILEID}`,
      { $pull: { blogs: { _id: id } } },
      { new: true }
    );

    return res.status(200).json({ message: "Blog deleted successfully !", updatedBlogs: updated.blogs });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog. Check the console." });
    console.log(error);
  }
});

app.put("/editProject/:id", async (req, res) => {
  const { id } = req.params;
  let { title, shortdescription, description, websitelink, imglink, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required !" });
  }
  if (!title || !description || !websitelink || !imglink) {
    return res.status(400).json({ message: "Please fill all required fields !" });
  }

  if (description) description = sanitizeHtml(description, sanitizeOptions);

  try {
    const userDetail = await userModel
      .findOne({ _id: `${process.env.MONGODBPROFILEID}` })
      .select("+password");

    const passwordCheck = await bcrypt.compare(password, userDetail._doc.password);
    if (!passwordCheck) {
      return res.status(401).json({ message: "Password is wrong !" });
    }

    const updated = await userModel.findOneAndUpdate(
      { _id: `${process.env.MONGODBPROFILEID}`, "projects._id": id },
      {
        $set: {
          "projects.$.title": title,
          "projects.$.shortdescription": shortdescription,
          "projects.$.description": description,
          "projects.$.websitelink": websitelink,
          "projects.$.imglink": imglink,
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Project not found !" });
    }

    return res.status(200).json({ message: "Project updated successfully !", updatedProjects: updated.projects });
  } catch (error) {
    res.status(500).json({ message: "Error updating project. Check the console." });
    console.log(error);
  }
});

app.delete("/deleteProject/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required !" });
  }

  try {
    const userDetail = await userModel
      .findOne({ _id: `${process.env.MONGODBPROFILEID}` })
      .select("+password");

    const passwordCheck = await bcrypt.compare(password, userDetail._doc.password);
    if (!passwordCheck) {
      return res.status(401).json({ message: "Password is wrong !" });
    }

    const updated = await userModel.findByIdAndUpdate(
      `${process.env.MONGODBPROFILEID}`,
      { $pull: { projects: { _id: id } } },
      { new: true }
    );

    return res.status(200).json({ message: "Project deleted successfully !", updatedProjects: updated.projects });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project. Check the console." });
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
