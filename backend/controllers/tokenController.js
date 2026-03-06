let queue = [];
let currentToken = null;
let tokenNumber = 1;

exports.createToken = (req, res) => {
    const token = tokenNumber++;
    queue.push(token);

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