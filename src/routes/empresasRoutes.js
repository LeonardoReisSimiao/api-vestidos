import express from "express";
import EmpresaController from "../controllers/empresaController.js";
import paginar from "../middleswares/paginar.js";

const routes = express.Router();

routes.get("/empresas", EmpresaController.getListarEmpresas, paginar);
routes.get("/empresas/:id", EmpresaController.getEmpresaById);
routes.post("/empresas", EmpresaController.postCreateEmpresa);
routes.put("/empresas/:id", EmpresaController.putEmpresaById);
routes.delete("/empresas/:id", EmpresaController.deleteEmpresaById);

export default routes;
