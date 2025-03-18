const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

   // // to backlist
   //     const blacklisted = await Blacklist.findOne({ token });
   //     if (blacklisted) return res.status(401).json({ message: 'Token has been blacklisted' });


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;
