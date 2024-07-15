import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import DadoExistente from "../erros/DadoExistente.js";
import SemConteudo from "../erros/SemConteudo.js";

function manipuladorDeErros(error, req, res, next) {
	if (error instanceof mongoose.Error.CastError) {
		new RequisicaoIncorreta().enviarResposta(res);
	} else if (error instanceof mongoose.Error.ValidationError) {
		new ErroValidacao(error).enviarResposta(res);
	} else if (error instanceof ErroBase) {
		error.enviarResposta(res);
	} else {
		console.log(error);
		new ErroBase().enviarResposta(res);
	}
}

export default manipuladorDeErros;
