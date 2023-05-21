require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes/index.js');
const bodyParser = require("body-parser");
const log = require("./loger.js");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


const database = require("./db/connection.js");

app.listen(process.env.PORT, () => {
  
  routes(app, database);

  log('Успешно запущен http://localhost:' + process.env.PORT);
});