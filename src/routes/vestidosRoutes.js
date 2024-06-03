import express from "express";
import VestidoController from "../controllers/vestidoController.js";

const routes = express.Router();


routes.get("/vestidos", VestidoController.getListarVestidos);
routes.get("/vestidos/busca", VestidoController.getBuscarVestidos);
routes.get("/vestidos/:id", VestidoController.getVestidoById);
routes.post("/vestidos", VestidoController.postCreateVestido);
routes.put("/vestidos/:id", VestidoController.putVestidoById);
routes.delete("/vestidos/:id", VestidoController.deleteVestidoById);


export default routes;