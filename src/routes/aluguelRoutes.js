import { Router } from "express";
import AluguelController from "../controllers/aluguelController.js";
import paginar from "../middleswares/paginar.js";

const routes = Router();

routes.get("/aluguel", AluguelController.getListarAluguel, paginar);
routes.get(
	"/aluguel/ativos",
	AluguelController.getListarAluguelAtivos,
	paginar,
);
routes.get("/aluguel/:id", AluguelController.getAluguelById);
routes.post("/aluguel", AluguelController.postCreateAluguel);
routes.put("/aluguel/:id", AluguelController.putAluguelById);
routes.delete("/aluguel/desativa/:id", AluguelController.desativaAluguelById);
//routes.delete("/aluguel/delete/:id", AluguelController.deleteAluguelById);

export default routes;
