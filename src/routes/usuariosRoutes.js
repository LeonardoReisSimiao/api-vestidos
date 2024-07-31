import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import paginar from "../middleswares/paginar.js";
import { verifyAndProcessImages } from "../middleswares/checaImagem.js";

const routes = express.Router();

routes.get("/usuarios", UsuarioController.getListarUsuarios, paginar);
routes.get("/usuarios/:id", UsuarioController.getUsuarioById);
//routes.post("/login", UsuarioController.postLogin);
routes.post(
	"/usuarios",
	verifyAndProcessImages,
	UsuarioController.postCreateUsuario,
);
routes.put(
	"/usuarios/:id",
	verifyAndProcessImages,
	UsuarioController.putUsuarioById,
);
routes.delete("/usuarios/:id", UsuarioController.deleteUsuarioById);

export default routes;
