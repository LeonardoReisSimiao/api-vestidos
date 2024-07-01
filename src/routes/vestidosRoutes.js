import express from "express";
import VestidoController from "../controllers/vestidoController.js";

const routes = express.Router();

routes.get("/vestidos", VestidoController.getListarVestidos);
routes.get("/vestidos/ativos", VestidoController.getBuscarVestidosAtivos);
routes.get(
	"/vestidos/desativados",
	VestidoController.getBuscarVestidosDesativados,
);
routes.get("/vestidos/busca", VestidoController.getBuscarVestidos);
routes.get("/vestidos/:id", VestidoController.getVestidoById);
routes.post("/vestidos", VestidoController.postCreateVestido);
routes.put("/vestidos/:id", VestidoController.putVestidoById);
routes.put("/vestidos/ativa/:id", VestidoController.putAtivaVestidoById);
routes.delete("/vestidos/desativa/:id", VestidoController.desativaVestidoById);
routes.delete("/vestidos/delete/:id", VestidoController.deleteVestidoById);

export default routes;
