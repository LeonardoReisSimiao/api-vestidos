import Aluguel from "../models/Rental.js";
import DadoExistente from "../erros/DadoExistente.js";

export async function isVestidoAlugado(vestidoId, dataInicio, dataFim, next) {
	try {
		// Verifica se a data de início não é menor que a data atual
		const dataAtual = new Date();
		if (new Date(dataInicio) < dataAtual) {
			next(
				new DadoExistente(
					"A data de início não pode ser menor que a data atual.",
				),
			);
			return 1;
		}

		// Verifica se a data de fim não é menor que a data de início
		if (new Date(dataFim) < new Date(dataInicio)) {
			next(
				new DadoExistente(
					"A data de fim não pode ser menor que a data de início.",
				),
			);
			return 1;
		}

		const alugueis = await Aluguel.find({
			vestido: vestidoId,
			$and: [
				{ dataInicio: { $lte: dataFim } },
				{ dataFim: { $gte: dataInicio } },
			],
		});

		if (!alugueis.length) {
			return 0;
		} else {
			next(new DadoExistente("Vestido já está reservado nesse período"));
			return 1;
		}
	} catch (error) {
		next(error);
	}
}
