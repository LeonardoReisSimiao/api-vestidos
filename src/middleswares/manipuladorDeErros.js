import mongoose from "mongoose";

function manipuladorDeErros(error, req, res, next) {
	if (error instanceof mongoose.Error.CastError) {
		res
			.status(400)
			.json({ message: "Um ou mais dados fornecidos estão incorretos." });
	} else if (error instanceof mongoose.Error.ValidationError) {
		const mensagensErro = Object.values(error.errors)
			.map((error) => error.message)
			.join("; ");

		res.status(400).json({
			message: `Os seguintes erros foram encontrados: ${mensagensErro}`,
		});
	} else {
		res.status(500).json({ message: "Erro interno de Servidor." });
		console.error("Erro no servidor: ", error.stack);
	}
}

export default manipuladorDeErros;
