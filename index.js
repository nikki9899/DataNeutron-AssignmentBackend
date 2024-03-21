const express = require('express');
const mongoose = require("mongoose");
const todoRouter = require("./routes/todo");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = 8000;

mongoose.connect(process.env.MONGODB_URI).then (()=>console.log("mongodb connected"));



app.use(cors({
    origin: 'http://localhost:3000' 
  }));
  
app.use(bodyParser.json());
app.use("/",todoRouter)


app.listen(PORT, ()=>console.log("server started"));