const express = require("express");
const router = express.Router();
const Contact_Model = require("../models/contact_model");

const auth = (req, res, next) => {
//   console.log(process.env.token)
if(req.headers.authorization){
    const get_token = req.headers.authorization.split(" ")[1];
    if (get_token === process.env.token) {
        // console.log('inside if')
      next();
    } else{
      res.status(500).json('You are not authenticated')}
  }
    else{
    res.status(500).json('You are not authenticated')}


//   console.log();
};

router.route("/").post(auth, async (req, res, next) => {
  const { name, email, msg } = req.body;
//   console.log(name, email, msg);
  try {
    const contact = await Contact_Model({ name: name, email: email, msg: msg });
    const result = await contact.save();
    // console.log(result)
    res.json("Details has been saved");
  } catch (error) {
    // console.log('Enter Correct Details')
    next(` ${error}`);
  }
});
module.exports = router;
