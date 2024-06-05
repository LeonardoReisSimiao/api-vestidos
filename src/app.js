import express from "express";
import conectaNoBD from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middleswares/manipuladorDeErros.js";

const conexao = await conectaNoBD();

conexao.on("error", (erro) => {
	console.error("Erro de conexão: ", erro);
});

conexao.once("open", () => {
	console.log("Conectado ao banco de dados");
});
const app = express();
app.use(express.json());
routes(app);

app.use(manipuladorDeErros);

export default app;
