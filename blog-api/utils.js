const jwt = require("jsonwebtoken")

const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password
        },
        'secret',
        {
            expiresIn: '30d'
        }
    )
}

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization

    if(authorization) {
        const token = authorization.slice(7, authorization.length)
        jwt.verify(
            token,
            'secret',
            (err, decode) => {
                if(err) {
                    res.status(401).send({message: 'Invalid token'})
                } else {
                    req.user = decode
                    next()
                }
            }
        )
    } else {
        res.status(401).send({message: 'No Token'})
    }
}

exports.generateToken = generateToken
exports.isAuth = isAuth