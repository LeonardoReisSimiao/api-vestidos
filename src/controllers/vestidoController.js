import { vestido } from "../models/Vestido.js";
import { empresa } from "../models/Empresa.js";

class VestidoController {
	static getListarVestidos = async (req, res, next) => {
		try {
			const vestidos = await vestido.find().populate("location_id").exec();

			res.status(200).json(vestidos);
		} catch (error) {
			next(error);
		}
	};

	static getBuscarVestidos = async (req, res, next) => {
		const busca = req.query.vestido;
		try {
			const response = await vestido
				.find({
					$or: [
						{ nome: new RegExp(busca, "i") },
						{ descricao: new RegExp(busca, "i") },
						{ cor: new RegExp(busca, "i") },
						{ tamanho: new RegExp(busca, "i") },
						{ tipoEvento: new RegExp(busca, "i") },
						{ modelo: new RegExp(busca, "i") },
						{ comprimento: new RegExp(busca, "i") },
						{ tecido: new RegExp(busca, "i") },
					],
				})
				.populate({ path: "location_id", select: "nome" });

			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	};

	static getVestidoById = async (req, res, next) => {
		try {
			const vestidoId = await vestido
				.findById(req.params.id)
				.populate("location_id");

			if (!vestidoId) {
				return res.status(404).send("Vestido não encontrado");
			}

			let locationIdString = "";
			if (
				vestidoId.location_id &&
				vestidoId.location_id.buffer &&
				vestidoId.location_id.buffer.data
			) {
				locationIdString = Buffer.from(
					vestidoId.location_id.buffer.data,
				).toString("hex");
			}

			const response = {
				...vestidoId._doc,
				location_id: {
					...vestidoId.location_id._doc,
					buffer: locationIdString,
				},
			};

			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	};

	static postCreateVestido = async (req, res, next) => {
		const novoVestido = req.body;
		try {
			const empresaEncontrada = await empresa.findById(novoVestido.location_id);
			const vestidoCompleto = {
				...novoVestido,
				location_id: { ...empresaEncontrada },
			};
			const vestidoCriado = await vestido.create(vestidoCompleto);
			res.status(201).json({
				message: "Vestido cadastrado com sucesso",
				vestido: vestidoCriado,
			});
		} catch (error) {
			next(error);
		}
	};

	static putVestidoById = async (req, res, next) => {
		try {
			const vestidoId = await vestido.findByIdAndUpdate(
				req.params.id,
				req.body,
			);

			if (!vestidoId) {
				return res.status(404).send("Vestido não encontrado");
			} else {
				res.status(200).send("Vestido atualizado com sucesso");
			}
		} catch (error) {
			next(error);
		}
	};

	static deleteVestidoById = async (req, res, next) => {
		try {
			const vestidoId = await vestido.findByIdAndDelete(req.params.id);
			if (!vestidoId) {
				return res.status(404).send("Vestido não encontrado");
			} else {
				res.status(200).send("Vestido excluído com sucesso");
			}
		} catch (error) {
			next(error);
		}
	};
}

export default VestidoController;
