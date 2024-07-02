import { vestido } from "../models/Vestido.js";
import { empresa } from "../models/Empresa.js";
import aluguel from "../models/Rental.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

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
		const busca = req.query;

		try {
			// Verifica se há um valor de busca fornecido
			if (!busca || Object.keys(busca).length === 0) {
				const vestidos = await vestido
					.find({ desativado: { $eq: false } })
					.populate({ path: "location_id", select: "nome" });
				res.status(200).json({
					message:
						"Não foram fornecidos critérios de busca, retornando todos os vestidos.",
					vestidos,
				});
			} else {
				const filtros = [];
				for (const chave in busca) {
					if (busca.hasOwnProperty(chave) && busca[chave]) {
						const valor = busca[chave];
						filtros.push({ [chave]: new RegExp(valor, "i") });
					}
				}

				const vestidos = await vestido
					.find({ $or: filtros })
					.populate({ path: "location_id", select: "nome" });

				if (vestidos.length === 0) {
					return res
						.status(200)
						.json({ message: "Não há vestidos para essa busca." });
				} else {
					res.status(200).json(vestidos);
				}
			}
		} catch (error) {
			next(error);
		}
	};

	static getBuscarVestidosAtivos = async (req, res, next) => {
		//BUSCA VESTIDOS ATIVOS
		try {
			const vestidos = await vestido
				.find({ desativado: { $eq: false } })
				.populate({ path: "location_id", select: "nome" });

			if (
				vestidos === null ||
				vestidos === "" ||
				(Array.isArray(vestidos) && vestidos.length === 0)
			) {
				res.status(204).json({ message: "Não há vestidos ativos." }); //Status para dizer que não há vestidos ativos
			} else {
				res.status(200).json(vestidos);
			}
		} catch (error) {
			next(error);
		}
	};

	static getBuscarVestidosDesativados = async (req, res, next) => {
		//BUSCA VESTIDOS DESATIVADOS
		try {
			const vestidos = await vestido
				.find({ desativado: { $eq: true } })
				.populate({ path: "location_id", select: "nome" });

			if (
				vestidos === null ||
				vestidos === "" ||
				(Array.isArray(vestidos) && vestidos.length === 0)
			) {
				res.status(204).json({ message: "Não há vestidos desativados." }); //Status para dizer que não há vestidos desativados
			} else {
				res.status(200).json(vestidos);
			}
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
				next(new NaoEncontrado("Vestido não encontrado."));
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
			if (!empresaEncontrada) {
				return next(new NaoEncontrado("Empresa não encontrada."));
			}
			const vestidoCompleto = {
				...novoVestido,
				location_id: { ...empresaEncontrada },
			};
			await vestido.create(vestidoCompleto);
			res.status(201).send("Vestido cadastrado com sucesso");
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
				next(new NaoEncontrado("Vestido não encontrado."));
			} else {
				res.status(200).send("Vestido atualizado com sucesso");
			}
		} catch (error) {
			next(error);
		}
	};

	static putAtivaVestidoById = async (req, res, next) => {
		try {
			// Busca o vestido pelo ID
			const vestidoId = await vestido.findById(req.params.id);

			if (!vestidoId) {
				return next(new NaoEncontrado("Vestido não encontrado."));
			}

			// Verifica se o vestido já está ativado
			if (!vestidoId.desativado) {
				return res.status(400).send("O vestido já está ativado.");
			}

			// Ativa o vestido
			vestidoId.desativado = false;
			vestidoId.desativadoEm = null; // Limpa a data de desativação
			vestidoId.motivoDesativacao = null; // Limpa o motivo de desativação
			await vestidoId.save();

			res.status(200).send("Vestido ativado com sucesso");
		} catch (error) {
			// Captura erros e os passa para o próximo middleware de erro
			next(error);
		}
	};

	static desativaVestidoById = async (req, res, next) => {
		/**
			const user = await usuario.findById(userId);
			if (!user || !user.hasPermission("desativar_aluguel")) {
				throw new Error("Permissões insuficientes");
			} */

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
			const vestidoExcluido = await vestido.findById(req.params.id);

			// Verifica se o vestido já está ativado
			if (vestidoExcluido.desativado) {
				return res.status(400).send("O vestido já está desativado.");
			}

			if (!vestidoExcluido) {
				return next(new NaoEncontrado("Vestido não encontrado."));
			} else {
				vestidoExcluido.desativado = true;
				vestidoExcluido.desativadoEm = new Date();
				vestidoExcluido.motivoDesativacao = req.params.motivo;
				await vestidoExcluido.save();
				res.status(200).send("Vestido desativado com sucesso");
			}
		} catch (error) {
			// Captura erros e os passa para o próximo middleware de erro
			next(error);
		}
	};
	static deleteVestidoById = async (req, res, next) => {
		/**
			const user = await usuario.findById(userId);
			if (!user || !user.hasPermission("desativar_aluguel")) {
				throw new Error("Permissões insuficientes");
			} */

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
	};
}

export default VestidoController;
