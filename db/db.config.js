const mongoose = require("mongoose");

const dotenv = require('dotenv').config();

// const db = process.env.DATABASE_URI



let dbName = 'crud'



const db = `mongodb+srv://theecode:<theecode@1>@cluster0.w7rfr.mongodb.net/${dbName}`;

mongoose

  .connect(db, {

    useNewUrlParser: true,

    useUnifiedTopology: true,

  })

  .then(() => console.log("mongoDB connected..."));