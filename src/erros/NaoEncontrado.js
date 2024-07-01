import ErroBase from "./ErroBase.js";

class NaoEncontrado extends ErroBase {
	constructor(mensagem = "Erro 404 - Página não encontrada") {
		super(mensagem, 404);
	}
}

export default NaoEncontrado;
