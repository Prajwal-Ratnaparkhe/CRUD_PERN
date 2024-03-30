const express = require("express");
const pool = require('./db/db');
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors()); 
app.use(cookieParser());
app.use(express.json()); 

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));



// Listen for 'connect' event to acknowledge successful database connection
pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("Error connecting to PostgreSQL database:", err.message);
});

// Check if the pool is connected
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Pool is connected");
  release(); // release the client back to the pool
});


const userActivity = require("./controllers/userActivity");
app.use("/api/activity", userActivity); 

const crud = require("./controllers/CRUD");
app.use("/api/crud", crud); 