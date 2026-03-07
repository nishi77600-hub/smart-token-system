const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{
    user:"aryansingh09378@gmail.com",
    pass:"rizi zxqe zitc ewcq"
  }
});
const authRoutes = require("./routes/authRoutes");
const tokenRoutes = require("./routes/tokenRoutes");

const app = express();
connectDB();

console.log("INDEX FILE RUNNING");

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/token", tokenRoutes);


let queues = {
  atm: [],
  dispensary: [],
  accounts: []
};

let currentServing = {
  atm: null,
  dispensary: null,
  accounts: null
};



const Counter = require("./models/counter");

async function createCounter() {
    const counter = new Counter({
        counterNumber: 1,
        currentToken: 0,
        status: "open"
    });

    await counter.save();
    console.log("Counter created");
}

createCounter();








const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*"
    }
});

app.get("/display",(req,res)=>{
res.sendFile(__dirname + "/public/display.html");
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
});``