const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const bodyParser = require('body-parser')
const mainRoutes = require("./routes")
require("dotenv").config();
const upload = require('./middleware/upload');

const baseUrl = process.env.BASE_URL || 'http://localhost:4000';
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use('/uploads', express.static('uploads'));

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

app.locals.baseUrl = baseUrl;


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


