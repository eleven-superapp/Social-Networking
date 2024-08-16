const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies?.jwt
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, { user }) => {
            if (err) return res.status(403).json({ error: 'Invalid token' })
            req.user = user
            next()
        })
    } else {
        res.status(401).json({ message: 'It seems your credentials are having an identity crisis. Give them a reality check before trying again! (Frustated Devloper)' })
    }

}

module.exports = verifyToken