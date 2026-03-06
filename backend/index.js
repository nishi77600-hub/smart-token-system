const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();

console.log("INDEX FILE RUNNING");

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/test", (req, res) => {
    console.log("TEST ROUTE HIT");
    res.send("Server working");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
const tokenRoutes = require("./routes/tokenRoutes");

app.use("/api/token", tokenRoutes);
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*"
    }
});

io.on("connection",(socket)=>{
    console.log("User connected:",socket.id);
});
app.use((req,res,next)=>{
    req.io = io;
    next();
});