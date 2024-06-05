import Aluguel from "../models/Rental.js";

export async function isVestidoAlugado(vestidoId, dataInicio, dataFim) {
	const alugueis = await Aluguel.find({
		vestido: vestidoId,
		dataInicio,
		dataFim,
	});

	return alugueis.length > 0;
}
