import express from "express";
import vestidos from "./vestidosRoutes.js";

const routes = (app) => {
    app.route("/").get((req,res) => res.status(200).send("Curso Vestido"));

    app.use(express.json(), vestidos);
}

export default routes;