const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const url = "mongodb+srv://Admin:Admin123@cluster0-bocyg.azure.mongodb.net/chatroom_backbone?retryWrites=true&w=majority"
const connect = mongoose.connect(url, { useNewUrlParser: true });
module.export = connect;
