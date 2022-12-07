const express = require("express");
const router = express.Router();
const Project_Model = require("../models/project_model");

const auth = (req, res, next) => {
 
  if (req.headers.authorization) {
    const get_token = req.headers.authorization.split(" ")[1];
    if (get_token === process.env.token) {
 
      next();
    } else {
      res.status(500).send("You are not authenticated");
    }
  } else {
    res.status(500).send("You are not authenticated");
  }

};

router.route("/").get(auth, async (req, res, next) => {
 
  try {
    const contact = await Project_Model.find({ });
   
    res.json(contact);
  } catch (error) {
   
    next(`${error}`);
  }
});
module.exports = router;
