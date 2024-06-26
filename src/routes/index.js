import express from "express";
import vestidos from "./vestidosRoutes.js";
import usuarios from "./usuariosRoutes.js";
import empresas from "./empresasRoutes.js";
import aluguel from "./aluguelRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Curso Vestido"));

    app.use(express.json(), vestidos, usuarios, empresas, aluguel);
}

export default routes;