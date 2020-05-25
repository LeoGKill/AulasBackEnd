const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const { promisify } =  require('util')


module.exports = async (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ msg: "Token nao foi encontrado,entao N VAI ENTRAR NINGUEM"})
    }

    const [, token] = authHeader.split( " " );

    try {
        const decode = await promisify(jwt.verify)(token, authConfig.secret)

        req.userId = decode.id
        return next();
    } catch (error) {
        return res.status(401).json({ msg: "Token invalidao amigao, manda outro vacilaum"});
    }
};
