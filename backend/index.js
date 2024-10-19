const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const { User } = require('./models/User')
const { Note } = require('./models/Note')
require("dotenv").config();
const cors = require("cors");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




app.use(cors());
app.use(express.json());





    app.use("/notes", require("./Routes/noteRoute"));
    app.use("/", require("./Routes/userRoute"));
      
      app.use((error)=> {
console.log(error);

      })

mongoose.connect("mongodb+srv://abdalfatahaljuaidi:Mrerror2002@cluster0.b1gih.mongodb.net/ibrahem?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
  });
 })
 .catch((err) => {
   console.log(err);
 });