import express from "express";
import conectaNoBD from "./config/dbConnect.js";
import routes from "./routes/index.js";

const app = express();
routes(app);

const conexao = await conectaNoBD();

conexao.on("error", (erro) => {
  console.error("erro de conexão: ", erro);
});

conexao.once("open", () => {
  console.log("Conectado ao banco de dados");
});

export default app;
