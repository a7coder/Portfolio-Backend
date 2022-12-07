const express = require("express");
require("dotenv").config();
const app = express();
const contact = require("./routes/contact");
const project = require("./routes/project");
const helmet = require("helmet");
const cors=require('cors')
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
main().catch(err => console.log('Database Error',err));

async function main() {
  // console.log(p)
  await mongoose.connect(`mongodb+srv://a7coder:${process.env.pw}@portfolio.l6fr7hn.mongodb.net/Contact`);
  console.log('Database Connected')
}

app.use(cors())
app.use(helmet());
app.use(express.json());   
app.use(express.urlencoded({ extended: true }));

app.use("/contact", contact);
app.use("/projects", project);

app.use((err, req, res, next) => {
  // console.error("error");
  res.status(500).json(`${err}`);
});

app.get('/',(req,res)=>{
  res.send("it works")
})

app.listen(8000, () => {
  console.log("Listening on Port 8000");
});
