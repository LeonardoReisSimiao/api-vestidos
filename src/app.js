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


app.delete("/vestidos/:id", (req, res) => {
  const id = buscaVestido(req.params.id);
  vestidos.splice(id, 1);
  res.status(200).send("Vestido deletado com sucesso");
});

export default app;
