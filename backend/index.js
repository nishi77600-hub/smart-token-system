const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

console.log("INDEX FILE RUNNING");

// middleware
app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const tokenRoutes = require("./routes/tokenRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/token", tokenRoutes);

// root route (ye server.js me tha)
app.get("/", (req, res) => {
    res.send("Smart Token System Running ✅");
});

// test route
app.get("/test", (req, res) => {
    console.log("TEST ROUTE HIT");
    res.send("Server working");
});

// create http server
const server = http.createServer(app);

// socket setup
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// middleware to access io in controllers
app.use((req, res, next) => {
    req.io = io;
    next();
});

// socket connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
});

// start server
server.listen(3000, () => {
    console.log("Server running on port 3000");
});