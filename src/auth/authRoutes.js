import express from "express";
import { authenticateToken } from "./authMiddleware.js";
import { login, logout } from "./login.js";

export const authRouter = express.Router();

authRouter.get("/auth", authenticateToken);
authRouter.post("/login", login);
authRouter.post("/logout", authenticateToken, logout);

export default (app) => {
	app.use(express.json(), authRouter);
};
