import SemConteudo from "../erros/SemConteudo.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
	try {
		let { limite = 6, pagina = 1, ordenacao = "_id: -1" } = req.query;

		let [campoOrdenacao, ordem] = ordenacao.split(":");

		limite = parseInt(limite);
		pagina = parseInt(pagina);
		ordem = parseInt(ordem);

		const resultado = req.resultado;

		if (limite > 0 && pagina > 0) {
			const resultadoPaginado = await resultado
				.find()
				.sort({ [campoOrdenacao]: ordem })
				.skip((pagina - 1) * limite)
				.limit(limite);

			if (
				!resultadoPaginado ||
				(Array.isArray(resultadoPaginado) && resultadoPaginado.length === 0)
			) {
				return next(new SemConteudo());
			} else {
				res.status(200).json({ message: req.message, resultadoPaginado });
			}
		} else {
			next(new RequisicaoIncorreta());
		}
	} catch (error) {
		next(error);
	}
}

export default paginar;
