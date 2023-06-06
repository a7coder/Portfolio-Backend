const mongoose = require("mongoose");
const moment = require('moment-timezone');

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

moment.tz.add("Asia/Calcutta|HMT BURT IST IST|-5R.k -6u -5u -6u|01232|-18LFR.k 1unn.k HB0 7zX0");
moment.tz.link("Asia/Calcutta|Asia/Kolkata");

const timezone = moment.tz(Date.now(), "Asia/Calcutta|Asia/Kolkata");

const contact_schema = mongoose.Schema({
  date: { type: Date, default: timezone },
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
