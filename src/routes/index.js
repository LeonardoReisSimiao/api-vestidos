import express from "express";
import vestidos from "./vestidosRoutes.js";
import usuarios from "./usuariosRoutes.js";
import empresas from "./empresasRoutes.js";
import aluguel from "./aluguelRoutes.js";
import { authenticateToken } from "../auth/authMiddleware.js";

const routes = (app) => {
	app.use(authenticateToken);

	app.route("/").get((req, res) => res.status(200).send("Servidor Online"));

	app.use(vestidos, usuarios, empresas, aluguel);
};

export default routes;
