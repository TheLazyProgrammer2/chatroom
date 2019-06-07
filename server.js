// aanroepen nodige sub-programma's
var express = require("express") 
var mongoose = require("mongoose") 
var bodyParser = require("body-parser") 
 
var app = express() 
var http = require("http").Server(app) 
var io = require("socket.io")(http)

//connecteren met de datbase
var conString = "mongodb+srv://Admin:Admin123@cluster0-bocyg.azure.mongodb.net/chatroom_backbone?retryWrites=true&w=majority" 
 
app.use(express.static(__dirname)) 
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false })) 
 
mongoose.Promise = Promise 
 
//opmaak chat bericht
var Chats = mongoose.model("Chats", { 
    name: String, 
    chat: String 
}) 
 
//bevesteging verbinding met database
mongoose.connect(conString, { useMongoClient: true }, (err) => { 
    console.log("Database connection", err) 
}) 
 
//opslaan van het chatbericht op de database
app.post("/chats", async (req, res) => { 
    try { 
        var chat = new Chats(req.body) 
        await chat.save() 
        res.sendStatus(200) 
        //Emit the event 
        io.emit("chat", req.body) 
    } catch (error) { 
        res.sendStatus(500) 
        console.error(error) 
    } 
}) 
 
app.get("/chats", (req, res) => { 
    Chats.find({}, (error, chats) => { 
        res.send(chats) 
    }) 
}) 
 
//aangeven dat de socket.io is verbonden
io.on("connection", (socket) => { 
    console.log("Socket is connected...") 
}) 

//weergeven dat de host aan het luisteren is op poort 3020
var server = http.listen(3020, () => { 
    console.log("Well done, now I am listening on ", server.address().port) 
})