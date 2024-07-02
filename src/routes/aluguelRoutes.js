import express from "express";
import AluguelController from "../controllers/aluguelController.js";

const routes = express.Router();

routes.get("/aluguel", AluguelController.getListarAluguel);
routes.get("/aluguel/ativos", AluguelController.getListarAluguelAtivos);
routes.get("/aluguel/:id", AluguelController.getAluguelById);
routes.post("/aluguel", AluguelController.postCreateAluguel);
routes.put("/aluguel/:id", AluguelController.putAluguelById);
routes.delete("/aluguel/desativa/:id", AluguelController.desativaAluguelById);
//routes.delete("/aluguel/delete/:id", AluguelController.deleteAluguelById);

export default routes;
