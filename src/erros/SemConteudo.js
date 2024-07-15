import ErroBase from "./ErroBase.js";

class SemConteudo extends ErroBase {
	constructor(
		mensagem = "A requisição foi bem-sucedida, mas o array está vazio.",
	) {
		super(mensagem, 200);
	}
}

export default SemConteudo;
