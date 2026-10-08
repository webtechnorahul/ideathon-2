import { Router } from "express";
import { identifyUser } from "../middleware/auth.middleware.js";
import {
    createCareerRoadmap,
    getMyCareerRoadmaps
} from "../controller/ai.controller.js";

const routerAi = Router();

console.log("Ai Router.....")

// Create AI career roadmap
routerAi.post(
    '/create',
    identifyUser,
    createCareerRoadmap
);

routerAi.get('/roadmap', identifyUser, getMyCareerRoadmaps);

export default routerAi;