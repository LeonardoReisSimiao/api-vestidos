import express from "express";
import VestidoController from "../controllers/vestidoController.js";
import paginar from "../middleswares/paginar.js";

const routes = express.Router();

routes.get("/vestidos", VestidoController.getListarVestidos, paginar);
routes.get(
	"/vestidos/ativos",
	VestidoController.getListarVestidosAtivos,
	paginar,
);
routes.get(
	"/vestidos/desativados",
	VestidoController.getListarVestidosDesativados,
	paginar,
);
routes.get("/vestidos/busca", VestidoController.getBuscarVestidos, paginar);
routes.get("/vestidos/:id", VestidoController.getVestidoById);
routes.post("/vestidos", VestidoController.postCreateVestido);
routes.put("/vestidos/:id", VestidoController.putVestidoById);
routes.put("/vestidos/ativa/:id", VestidoController.putAtivaVestidoById);
routes.delete("/vestidos/desativa/:id", VestidoController.desativaVestidoById);
routes.delete("/vestidos/delete/:id", VestidoController.deleteVestidoById);

export default routes;
