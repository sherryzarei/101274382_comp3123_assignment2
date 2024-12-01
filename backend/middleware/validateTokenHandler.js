const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error('User is not authorized');
            }
            console.log(decoded);
            req.user = decoded.user; // Uncomment this line if you need the user info in the request
            next();
        });
    } else {
        res.status(401);
        throw new Error('Token not found');
    }
});

module.exports = validateToken;
