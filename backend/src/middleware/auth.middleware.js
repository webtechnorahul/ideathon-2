import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export function identifyUser(req, res, next) {
    const token = req.cookies.token;

    console.log("Cookies:", req.cookies);
    

    if (!token) {
        return res.status(401).json({
            message: ["Token is missing"]
        })
    }

    try {

        const decode = jwt.verify(token, config.JWT_SECRET);
        req.user = decode;

        next();
    } catch (error) {
        return res.status(401).json({
            message: ["Invalid Token"]
        })
    }

}