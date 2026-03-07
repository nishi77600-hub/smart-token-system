let queue = [];
let currentToken = null;
let tokenNumber = 1;


const Token = require("../models/token");

exports.createToken = async (req, res) => {

    const token = tokenNumber++;
    queue.push(token);

    const newToken = new Token({
        tokenNumber: token,
        status: "waiting"
    });

console.log("Saved to MongoDB:", newToken);

    res.json({
        message: "Token created",
        token
    });

};

exports.getCurrentToken = (req, res) => {
    res.json({ currentToken });
};

exports.getQueue = (req, res) => {
    res.json({ queue });
};

exports.nextToken = (req, res) => {

    if(queue.length === 0){
        return res.json({ message: "No tokens in queue"});
    }

    currentToken = queue.shift();

    // REAL TIME EVENT
    req.io.emit("tokenUpdate", currentToken);

    res.json({
        message: "Next token called",
        currentToken
    });
};