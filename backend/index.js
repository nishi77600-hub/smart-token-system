const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

console.log("INDEX FILE RUNNING");

app.use(express.json());

const tokenRoutes = require("./routes/tokenRoutes");
app.use("/api/token", tokenRoutes);

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*"
    }
});

app.use((req,res,next)=>{
    req.io = io;
    next();
});

io.on("connection",(socket)=>{
    console.log("User connected:",socket.id);
});

app.get("/test",(req,res)=>{
    res.send("Server working");
});

server.listen(3000,()=>{
    console.log("Server running on port 3000");
});