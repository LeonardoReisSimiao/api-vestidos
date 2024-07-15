import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import paginar from "../middleswares/paginar.js";

const routes = express.Router();

routes.get("/usuarios", UsuarioController.getListarUsuarios, paginar);
routes.get("/usuarios/:id", UsuarioController.getUsuarioById);
routes.post("/login", UsuarioController.postLogin);
routes.post("/usuarios", UsuarioController.postCreateUsuario);
routes.put("/usuarios/:id", UsuarioController.putUsuarioById);
routes.delete("/usuarios/:id", UsuarioController.deleteUsuarioById);

export default routes;
