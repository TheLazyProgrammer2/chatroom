const express = require("express");//heeft express module nodig
const app = express()//maak een nieuw express application
const http = require("http").Server(app)// heeft http module nodig
const io = require ("socket.io");//heeft socket.io module nodig
const port = 500;
const socket =io(http);
const bodyParser = require("body-parser");
const chatRouter = require("./route/chatrout");

//bodyparser middleware
app.use(bodyParser.json());

//routes
app.use("/chats", chatRouter);

//database connection
const Chat = require("./models/ChatSchema");
const  connect  = require("./dbconnect");

//setup event listener
socket.on("connection", socket  =>  {
    console.log("user connected");
    socket.on("disconnect", function() {
    console.log("user disconnected");
    });
    socket.on("chat message", function(msg) {
        console.log("message: "  +  msg);
        //broadcast message to everyone in port:5000 except yourself.
    socket.broadcast.emit("received", { message: msg  });

    //save chat to the database
    connect.then(db  =>  {
        console.log("connected correctly to the server");

        let  chatMessage  =  new Chat({ message: msg, sender: "Anonymous"});
        chatMessage.save();
        });
        });
    });
    //de server verbinden  om listen op port 500
    http.listen(port, () =>{
    console.log("conected to port: "+ port)
    });
    