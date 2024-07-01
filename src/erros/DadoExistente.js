import ErroBase from "./ErroBase.js";

class DadoExistente extends ErroBase {
	constructor(mensagem = "Estes dados já estão cadastrados: ") {
		super(mensagem, 409);
	}
}

export default DadoExistente;
