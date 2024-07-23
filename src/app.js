import express from "express";
import cors from "cors";
import conectaNoBD from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middleswares/manipuladorDeErros.js";
import manipulador404 from "./middleswares/manipulador404.js";
import { sanitizeMiddleware } from "./middleswares/sanitizador.js";

const conexao = await conectaNoBD();

conexao.on("error", (erro) => {
	console.error("Erro de conexão: ", erro);
});

conexao.once("open", () => {
	console.log("Conectado ao banco de dados");
});
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sanitizeMiddleware);

routes(app);

app.use(manipulador404);

app.use(manipuladorDeErros);

export default app;
