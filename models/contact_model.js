const mongoose = require("mongoose");
const moment = require('moment-timezone');

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};



const contact_schema = mongoose.Schema({
  date: {
    type: Date,
    default: moment().tz('Asia/Kolkata').format(), // Set the default date to the current date and time in Indian time zone
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  email: {
    type: String,
    required: true,
    minLength: 4,
    validate: [validateEmail, "Please fill a valid email address"],
  },
  msg: {
    type: String,
    required: true,
    minLength: 10,
  },

});



contact_schema.pre('save',async function(next){

  try {
    
    const doc=await Contact.findOne({name:this.name,email:this.email,msg:this.msg})
    // console.log('doc',this.name)
    if (doc){
      throw new Error('Contact already present in the database')
    }
    next()
    
  } catch (error) {
  
    next(error)
    
  }
 

})
const Contact = mongoose.model("Contact", contact_schema);
module.exports = Contact;
