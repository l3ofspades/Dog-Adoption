import express from "express";
import {
    registerDog,
    adoptDog,
    removeDog,
    listAdoptedDogs
} from "../controllers/dogController.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

//Protected endpoints
router.post("/register", authenticateUser, registerDog);
router.post("/adopt/:id", authenticateUser, adoptDog);
router.delete("/remove/:id", authenticateUser, removeDog);
router.get("/adopted", authenticateUser, listAdoptedDogs);

export default router;