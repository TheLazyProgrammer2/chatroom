const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const url = "https://cloud.mongodb.com/v2/5cdeb8e8f2a30b1dbe33f5a8#metrics/repl$"
const connect = mongoose.connect(url, { useNewUrlParser: true });
module.export = connect;
