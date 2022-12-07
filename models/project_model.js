const mongoose = require("mongoose");

const project_schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
  },
  img_url: {
    type: String,
    required: true,
    minLength: 4,
  },
  desc: {
    type: String,
    required: true,
    minLength: 10,
  },
  repo_url: {
    type: String,
    required: true,
  },
});

project_schema.pre("save", async function (next) {
  try {
    const doc = await Project.findOne({
      title: this.title,
      img_url: this.img_url,
      desc: this.desc,
      repo_url: this.repo_url,
    });

    if (doc) {
      throw new Error("Project already present in the database");
    }
    next();
  } catch (error) {
    next(error);
  }
});
const Project = mongoose.model("Project", project_schema);
module.exports = Project;
