import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { config } from "../config/config.js";



async function sendTokenResponse(user, res, message) {
    const token = jwt.sign({
        id: user._id,
    },
        config.JWT_SECRET,
        {
            expiresIn: "7d"
        }

    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,       // development
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(201).json({
        message,
        success: true,
        user: {
            id: user.id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname
        }
    });
}

export const register = async (req, res) => {
    const { email, password, fullname } = req.body;

    try {
        const existingUser = await userModel.findOne(
            { email }
        );

        if (existingUser) {
            return res.status(409).json({
                message: "User with this email or contact already exist"
            })
        }

        const user = await userModel.create({
            email,
            password,
            fullname
        });

        const token = sendTokenResponse(user, res, "User register successfully");


    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: "Server error"
        });

    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        const token = sendTokenResponse(user, res, "User logged in successfully");

    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const me = async (req, res) => {
    const userId = req.user.id;;

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        return res.status(200).json({
            message: "User found successfully!",
            user: user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const googleController = async (req, res) => {

    console.log(req.user);
    const { id, displayName, emails } = req.user;


    try {
        let user = await userModel.findOne({
            email: emails[0].value,
        });

        if (!user) {
            user = await userModel.create({
                fullname: displayName,
                email: emails[0].value,
                googleId: id,
            })
        }

        // Generate a JWT for the authenticated user
        const token = jwt.sign({ id: user._id}, config.JWT_SECRET, { expiresIn: '7h' });

        // Send the token to the client
        res.cookie("token", token);
        res.redirect('http://localhost:5173/');

    } catch (error) {
        console.log(error);
        res.redirect('http://localhost:5173/login');
    }
}