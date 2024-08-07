import { vestido, empresa, usuario, aluguel } from "../models/index.js";
import { isVestidoAlugado } from "../utils/vestido.utils.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import SemConteudo from "../erros/SemConteudo.js";

class AluguelController {
	static getListarAluguel = async (req, res, next) => {
		//LISTA TODOS ALUGUEIS ATÉ OS DESATIVADOS
		try {
			const resultadoAluguel = aluguel.find();

			req.resultado = resultadoAluguel;

			next();
		} catch (error) {
			next(error);
		}
	};

	static getListarAluguelAtivos = async (req, res, next) => {
		//LISTA ALUGUEIS QUE ESTÃO ATIVOS
		try {
			const resultadoAluguel = aluguel.find({
				desativado: { $eq: false },
			});

			req.resultado = resultadoAluguel;

			next();
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

			if (!rental || (Array.isArray(rental) && rental.length === 0)) {
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
					res.status(201).send("Reserva realizada com sucesso.");
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
					atualizaAluguel.vestido_id,
					atualizaAluguel.dataInicio,
					atualizaAluguel.dataFim,
					next,
					req.params.id,
				)
			) {
				return; //return pois o erro já foi tratado no isVestidoAlugado
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

					if (!rental || (Array.isArray(rental) && rental.length === 0)) {
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

	static desativaAluguelById = async (req, res, next) => {
		try {
			const rental = await aluguel.findById(req.params.id);
			if (!rental || (Array.isArray(rental) && rental.length === 0)) {
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
				rental.status = "Cancelado"; // futuramente mudar para receber do front o status se cancelado ou finalizado!
				rental.desativadoEm = new Date();
				rental.motivoDesativacao = req.params.motivo;
				await rental.save();
				res.status(200).send("Aluguel cancelado com sucesso");
			}
		} catch (error) {
			next(error);
		}
	};
	/** PARA IMPLEMENTAR NO FUTURO
	static deleteAluguelById = async (req, res, next) => {
		
			const user = await usuario.findById(userId);
			if (!user || !user.hasPermission("desativar_aluguel")) {
				throw new Error("Permissões insuficientes");
			} 

		//verificar se existe algum  aluguel antes de excluir o vestido
		//verificar se existe o vestido
		//verificar permissões do usuário (talvez implementar uma verificação global)
		//verificador de data antes de inserir (talvez implementar uma verificação global)
		// implementar SANITIZADOR GLOBAL - CSRF, XSS,SQL INJECTION
		//deixar o vestido com Status "desativado" e não excluir para poder inserir no histórico
		//futuramente implemetar schema separado para o schema histórico e copiar dados antes de excluir.
		try {
			// Verifica se existem aluguéis ativos para o vestido
			const aluguelAtivo = await aluguel.exists({
				vestido_id: req.params.id, // verificar pelo ID do vestido
				desativado: false,
			});

			if (aluguelAtivo) {
				// Se houver aluguéis ativos, retorna um erro
				return next(new NaoEncontrado("O vestido possui uma reserva ativa."));
			}

			// Exclui o vestido se não houver aluguéis ativos
			const vestidoExcluido = await vestido.findByIdAndDelete(req.params.id);

			if (!vestidoExcluido) {
				return next(new NaoEncontrado("Vestido não encontrado."));
			}

			res.status(200).send("Vestido excluído com sucesso");
		} catch (error) {
			// Captura erros e os passa para o próximo middleware de erro
			next(error);
		} 
	};*/
}

export default AluguelController;
