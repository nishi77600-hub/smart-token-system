const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;
    app.use(express.json());

    if (!authHeader) {
        return res.status(401).send("Access denied");
    }

    const token = authHeader.split(" ")[1]; 

    try {
        const verified = jwt.verify(token, "SECRETKEY");
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid token");
    }
};