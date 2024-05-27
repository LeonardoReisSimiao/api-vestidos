import express from "express";
import AluguelController from "../controllers/aluguelController.js";

const routes = express.Router();


routes.get("/aluguel", AluguelController.getListarAluguel);
routes.get("/aluguel/:id", AluguelController.getAluguelById);
routes.post("/aluguel", AluguelController.postCreateAluguel);
routes.put("/aluguel/:id", AluguelController.putAluguelById);
routes.delete("/aluguel/:id", AluguelController.deleteAluguelById);


export default routes;