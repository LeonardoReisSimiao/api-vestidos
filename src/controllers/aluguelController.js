import { vestido } from "../models/Vestido.js";
import { empresa } from "../models/Empresa.js";
import { usuario } from "../models/Users.js";
import aluguel from "../models/Rental.js";
import { isVestidoAlugado } from "../utils/vestido.utils.js";

class AluguelController {
	static getListarAluguel = async (req, res, next) => {
		try {
			const rentals = await aluguel
				.find()
				.populate("user_id")
				.populate("vestido_id")
				.populate("location_id");
			res.status(200).json(rentals);
		} catch (error) {
			next(error);
		}
	};

	static getAluguelById = async (req, res, next) => {
		try {
			const rental = await aluguel
				.findById(req.params.id)
				.populate("user_id")
				.populate("vestido_id")
				.populate("location_id");

			if (!rental) {
				return res.status(404).json({ message: "Reserva não encontrada" });
			}

			res.status(200).json(rental);
		} catch (error) {
			next(error);
		}
	};

	static postCreateAluguel = async (req, res, next) => {
		const novoAluguel = req.body;

		if (
			await isVestidoAlugado(
				novoAluguel.vestido_id._id,
				novoAluguel.dataInicio,
				novoAluguel.dataFim,
			)
		) {
			return res
				.status(409)
				.json({ message: "Vestido já reservado na data escolhida" });
		}

		try {
			const userEncontrado = await usuario.findById(novoAluguel.user_id);
			const vestidoEncontrado = await vestido.findById(novoAluguel.vestido_id);
			const empresaEncontrada = await empresa.findById(novoAluguel.location_id);
			const aluguelCompleto = {
				...novoAluguel,
				user_id: { ...userEncontrado },
				vestido_id: { ...vestidoEncontrado },
				location_id: { ...empresaEncontrada },
			};
			const aluguelCriado = await aluguel.create(aluguelCompleto);
			res.status(201).json({
				message: "Reserva realizada com sucesso",
				reserva: aluguelCriado,
			});
		} catch (error) {
			next(error);
		}
	};

	static putAluguelById = async (req, res, next) => {
		try {
			const rental = await aluguel.findByIdAndUpdate(req.params.id, req.body);

			if (!rental) {
				return res.status(404).json({ message: "Reserva não encontrada" });
			}

			res.status(200).send("reserva atualizada com sucesso");
		} catch (error) {
			next(error);
		}
	};

	static deleteAluguelById = async (req, res, next) => {
		try {
			const rental = await aluguel.findByIdAndDelete(req.params.id);

			if (!rental) {
				return res.status(404).json({ message: "Reserva não encontrada" });
			}

			res.status(200).send("Aluguel cancelado com sucesso");
		} catch (error) {
			next(error);
		}
	};
}

export default AluguelController;
