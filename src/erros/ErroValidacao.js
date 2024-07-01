import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
	constructor(error) {
		console.log(error);
		const mensagensErro = Object.values(error.errors)
			.map((error) => error.message)
			.join("; ");
		super(`Os seguintes erros foram encontrados: ${mensagensErro}`);
	}
}

export default ErroValidacao;
