import { vestido } from "../models/Vestido.js";
import { empresa } from "../models/Empresa.js";
import { usuario } from "../models/Users.js";
import aluguel from "../models/Rental.js";
import { isVestidoAlugado } from "../utils/vestido.utils.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import DadoExistente from "../erros/DadoExistente.js";

class AluguelController {
	static getListarAluguel = async (req, res, next) => {
		//LISTA TODOS ALUGUEIS ATÉ OS DESATIVADOS
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

	static getListarAluguelAtivos = async (req, res, next) => {
		//LISTA ALUGUEIS QUE ESTÃO ATIVOS
		try {
			const rentals = await aluguel
				.find({ desativado: { $eq: false } })
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
				next(new NaoEncontrado("Reserva não encontrada"));
			} else {
				res.status(200).json(rental);
			}
		} catch (error) {
			next(error);
		}
	};

	static postCreateAluguel = async (req, res, next) => {
		try {
			const novoAluguel = req.body;

			if (
				(await isVestidoAlugado(
					novoAluguel.vestido_id._id,
					novoAluguel.dataInicio,
					novoAluguel.dataFim,
					next,
				)) === 1
			) {
				return; //return pois o erro já foi tratado no isVestidoAlugado
			} else {
				const userEncontrado = await usuario.findById(novoAluguel.user_id);
				const vestidoEncontrado = await vestido.findById(
					novoAluguel.vestido_id,
				);
				const empresaEncontrada = await empresa.findById(
					novoAluguel.location_id,
				);
				if (!userEncontrado || !vestidoEncontrado || !empresaEncontrada) {
					console.log(userEncontrado, vestidoEncontrado, empresaEncontrada);
					next(
						new NaoEncontrado("Usuário, Vestido ou Empresa não foi encontrada"),
					);
				} else {
					const aluguelCompleto = {
						...novoAluguel,
						user_id: { ...userEncontrado },
						vestido_id: { ...vestidoEncontrado },
						location_id: { ...empresaEncontrada },
					};
					await aluguel.create(aluguelCompleto);
					res.status(201).send("Reserva realizada com sucesso");
				}
			}
		} catch (error) {
			next(error);
		}
	};

	static putAluguelById = async (req, res, next) => {
		try {
			const atualizaAluguel = req.body;

			if (
				await isVestidoAlugado(
					req.params.id,
					atualizaAluguel.dataInicio,
					atualizaAluguel.dataFim,
				)
			) {
				next(new DadoExistente("Vestido já está reservado nesse período"));
			} else {
				const userEncontrado = await usuario.findById(atualizaAluguel.user_id);
				const vestidoEncontrado = await vestido.findById(
					atualizaAluguel.vestido_id,
				);
				const empresaEncontrada = await empresa.findById(
					atualizaAluguel.location_id,
				);
				if (!userEncontrado || !vestidoEncontrado || !empresaEncontrada) {
					next(
						new NaoEncontrado("Usuário, Vestido ou Empresa não foi encontrada"),
					);
				} else {
					const rental = await aluguel.findByIdAndUpdate(
						req.params.id,
						atualizaAluguel,
					);

					if (!rental) {
						next(new NaoEncontrado("Reserva não encontrada"));
					} else {
						res.status(200).send("Reserva atualizada com sucesso");
					}
				}
			}
		} catch (error) {
			next(error);
		}
	};

	static deleteAluguelById = async (req, res, next) => {
		try {
			const rental = await aluguel.findById(req.params.id);
			if (!rental) {
				next(new NaoEncontrado("Reserva não encontrada"));
			}

			/**
			const user = await usuario.findById(userId);
			if (!user || !user.hasPermission("desativar_aluguel")) {
				throw new Error("Permissões insuficientes");
			} */

			//verificar se existe o aluguel
			//verificar permissões do usuário (talvez implementar uma verificação global)
			//verificador de data antes de inserir (talvez implementar uma verificação global)
			// implementar SANITIZADOR GLOBAL - CSRF, XSS,SQL INJECTION
			//deixar o aluguel com Status "desativado" e não excluir para poder inserir no histórico
			//notificar o usuário?
			//futuramente implemetar schema separado para o schema histórico e copiar dados antes de excluir.
			else {
				rental.desativado = true;
				rental.desativadoEm = new Date();
				rental.motivoDesativacao = req.params.motivo;
				await rental.save();
				res.status(200).send("Aluguel cancelado com sucesso");
			}
		} catch (error) {
			next(error);
		}
	};
}

export default AluguelController;
