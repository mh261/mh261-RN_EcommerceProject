import {userLogin, userRegistration} from"../Controllers/UserController";
import express from "express";
const router = express.Router();

router.post("/loginUser", userLogin);

router.post("/registerUser", userRegistration);

export { router as UserRoute };