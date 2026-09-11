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
  allowedTags: [ 
    'h1', 'h2', 'h3', 'p', 'strong', 'em', 'u', 'ol', 'ul', 'li', 
    'blockquote', 'pre', 'code', 'a', 'br',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'img', 's', 'del', 'sup', 'sub', 'hr'
  ],
  allowedAttributes: {
    'a': [ 'href', 'target', 'rel' ],
    'img': [ 'src', 'alt', 'width', 'height' ],
    'table': [ 'width', 'border', 'cellpadding', 'cellspacing' ],
    'td': [ 'colspan', 'rowspan', 'style' ],
    'th': [ 'colspan', 'rowspan', 'style' ],
    '*': [ 'style', 'class' ]
  }
};

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get("/", (req, res) => {
  res.send("Welcome to PRASHANTH portfolio backend");
});

// ── GET /blogs  (paginated) ─────────────────────────────────────────────────
app.get("/blogs", async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 6);

    const userData = await userModel.findOne({ _id: `${process.env.MONGODBPROFILEID}` });
    if (!userData) {
      return res.status(400).json({ message: "Error" });
    }

    const allBlogs   = userData.blogs || [];
    const total      = allBlogs.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const safePage   = Math.min(page, totalPages);
    const start      = (safePage - 1) * limit;
    const paginated  = allBlogs.slice(start, start + limit);

    return res.status(200).json({
      blogs: paginated,
      currentPage: safePage,
      totalPages,
      total,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// ── GET /projects  (paginated) ──────────────────────────────────────────────
app.get("/projects", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 6);

    const userData = await userModel.findOne({
      _id: `${process.env.MONGODBPROFILEID}`,
    });

    if (!userData) {
      return res.status(400).json({ message: "Error" });
    }

    const allProjects = userData.projects || [];

    const total = allProjects.length;

    const totalPages = Math.ceil(total / limit) || 1;

    const safePage = Math.min(page, totalPages);

    const start = (safePage - 1) * limit;

    const paginated = allProjects.slice(
      start,
      start + limit
    );

    // Get the LAST project from the COMPLETE projects array
    const featuredProject =
      allProjects.length > 0
        ? allProjects[allProjects.length - 1]
        : null;

    return res.status(200).json({
      projects: paginated,
      featuredProject,
      currentPage: safePage,
      totalPages,
      total,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});
app.get("/getAllProjects" , async (req, res) => {
  try {
    const userData = await userModel.findOne({
      _id: `${process.env.MONGODBPROFILEID}`,
    });

    if (!userData) {
      return res.status(400).json({ message: "Error" });
    }

    const allProjects = userData.projects || [];

    return res.status(200).json({
      projects: allProjects,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
})

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

app.get("/getTop3Projects", async (req, res) => {
  try {
    const userDetail = await userModel
      .findOne({ _id: `${process.env.MONGODBPROFILEID}` })
      .select("top3projects");

    if (!userDetail) {
      return res.status(404).json({
        message: "User profile not found!",
      });
    }

    return res.status(200).json({
      projects: userDetail.top3projects || [],
    });
  } catch (error) {
    console.error("Error fetching top 3 projects:", error);

    return res.status(500).json({
      message: "Error in fetching projects! Check the console.",
    });
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
  try {
    const { id } = req.params;
    let { title, shortdescription, description, websitelink, imglink, password } = req.body;

    // 1. Input Validations
    if (!password) {
      return res.status(400).json({ message: "Password is required !" });
    }
    if (!title || !description || !websitelink || !imglink) {
      return res.status(400).json({ message: "Please fill all required fields !" });
    }

    // 2. Sanitize Description
    if (description && typeof sanitizeHtml === "function") {
      description = sanitizeHtml(description, sanitizeOptions);
    }

    // 3. Verify MONGODBPROFILEID exists in environment variables
    const profileId = process.env.MONGODBPROFILEID;
    if (!profileId) {
      console.error("MONGODBPROFILEID is not defined in environment variables!");
      return res.status(500).json({ message: "Server environment variable configuration error." });
    }

    // 4. Fetch User Profile
    const userDetail = await userModel.findById(profileId).select("+password");
    if (!userDetail) {
      return res.status(440).json({ message: "User profile not found in database." });
    }

    // 5. Compare Password (access property directly, NOT via ._doc)
    const passwordCheck = await bcrypt.compare(password, userDetail.password);
    if (!passwordCheck) {
      return res.status(401).json({ message: "Password is wrong !" });
    }

    // 6. Update Project Subdocument
    const updated = await userModel.findOneAndUpdate(
      { _id: profileId, "projects._id": id },
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

    return res.status(200).json({
      message: "Project updated successfully !",
      updatedProjects: updated.projects,
    });

  } catch (error) {
    console.error("Error in /editProject/:id route:", error);
    return res.status(500).json({
      message: "Error updating project. Check the server logs.",
      error: error.message,
    });
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
