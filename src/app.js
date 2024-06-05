import express from "express";
import conectaNoBD from "./config/dbConnect.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";

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

app.use((error, req, res, next) => {
  
  if(error instanceof mongoose.Error.CastError){
    res.status(400).json({ message: 'Um ou mais dados fornecidos estão incorretos.' });
  } 
  else{
    console.error("Erro no servidor: ", erro.stack);
  res
    .status(500)
    .json({ message: "Erro interno de Servidor." });
  }

});

export default app;
