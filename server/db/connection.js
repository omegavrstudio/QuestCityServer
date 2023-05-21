const log = require("../loger.js");
const mongoose = require('mongoose');
mongoose.connect(process.env.ATLAS_URI);

mongoose.connection.on('connected', () => {
    log('Успешное подключение к базе данных ' + process.env.ATLAS_URI);
});

module.exports = mongoose;