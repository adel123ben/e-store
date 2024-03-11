const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const bodyParser = require('body-parser')
const mainRoutes = require("./routes")
require("dotenv").config();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_DEV_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch(err => {
  console.error("MongoDB connection error", err);
});

app.use('/api', mainRoutes(express))




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
} )