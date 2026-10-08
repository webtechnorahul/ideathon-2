import { Router } from "express";
import passport from "passport";
import { validateLoginUser, validateRegisterUser } from "../validator/auth.validator.js";
import { googleController, login, me, register } from "../controller/auth.controller.js";
import { identifyUser } from "../middleware/auth.middleware.js";
import { createCareerRoadmap } from "../controller/ai.controller.js";

const router = Router();

console.log("Auth Router....")

// Register User
router.post('/register', validateRegisterUser, register);
router.post('/login', validateLoginUser, login);
router.get('/me', identifyUser, me);


// Google Authentication routes
router.get("/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false
    })
);

router.get("/google/callback",
    passport.authenticate('google', { failureRedirect: '/', session: false }),
    googleController
)


export default router;